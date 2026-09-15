let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let unlocked = false;
let rumble: { src: AudioBufferSourceNode; gain: GainNode; filter: BiquadFilterNode } | null = null;
let noiseBuf: AudioBuffer | null = null;
let bed: { oscs: OscillatorNode[]; gain: GainNode } | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC({ latencyHint: "interactive" });
      master = ctx.createGain();
      master.gain.value = 0.3;
      master.connect(ctx.destination);
    }
    return ctx;
  } catch {
    ctx = null;
    master = null;
    return null;
  }
}

export function unlockAudio(): void {
  try {
    const c = getCtx();
    if (!c) return;
    if (c.state === "suspended") void c.resume();
    unlocked = true;
  } catch {
    /* preview iframes / autoplay policies must never block UI */
  }
}

export function isAudioUnlocked(): boolean {
  return unlocked;
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType,
  gain = 0.18,
  slide?: number,
  delay = 0,
): void {
  try {
    const c = getCtx();
    if (!c || !master || c.state !== "running") return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slide), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
    osc.onended = () => {
      osc.disconnect();
      g.disconnect();
    };
  } catch {
    /* ignore */
  }
}

function thud(freq: number, dur: number, gain = 0.16): void {
  try {
    const c = getCtx();
    if (!c || !master || c.state !== "running") return;
    const osc = c.createOscillator();
    const g = c.createGain();
    const f = c.createBiquadFilter();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.45), c.currentTime + dur);
    f.type = "lowpass";
    f.frequency.setValueAtTime(900, c.currentTime);
    g.gain.setValueAtTime(gain, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    osc.connect(f);
    f.connect(g);
    g.connect(master);
    osc.start();
    osc.stop(c.currentTime + dur + 0.02);
    osc.onended = () => {
      osc.disconnect();
      f.disconnect();
      g.disconnect();
    };
  } catch {
    /* ignore */
  }
}

function getNoise(): AudioBuffer | null {
  const c = getCtx();
  if (!c) return null;
  if (noiseBuf) return noiseBuf;
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * 0.35), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  noiseBuf = buf;
  return buf;
}

export function startRumble(): void {
  stopRumble();
  try {
    const c = getCtx();
    const buf = getNoise();
    if (!c || !master || !buf || c.state !== "running") return;
    const src = c.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 180;
    filter.Q.value = 0.7;
    const gain = c.createGain();
    gain.gain.value = 0.0001;
    gain.gain.exponentialRampToValueAtTime(0.045, c.currentTime + 0.08);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.start();
    rumble = { src, gain, filter };
  } catch {
    rumble = null;
  }
}

export function stopRumble(): void {
  try {
    if (!rumble) return;
    const c = getCtx();
    if (c) rumble.gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.06);
    const node = rumble;
    rumble = null;
    window.setTimeout(() => {
      try {
        node.src.stop();
        node.src.disconnect();
        node.filter.disconnect();
        node.gain.disconnect();
      } catch {
        /* ignore */
      }
    }, 80);
  } catch {
    rumble = null;
  }
}

export function startBed(freq = 110): void {
  stopBed();
  try {
    const c = getCtx();
    if (!c || !master || c.state !== "running") return;
    const gain = c.createGain();
    gain.gain.value = 0.0001;
    gain.gain.exponentialRampToValueAtTime(0.028, c.currentTime + 0.4);
    const oscs: OscillatorNode[] = [];
    [freq, freq * 1.505, freq * 2.02].forEach((f, i) => {
      const o = c.createOscillator();
      o.type = i === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      o.connect(gain);
      o.start();
      oscs.push(o);
    });
    gain.connect(master);
    bed = { oscs, gain };
  } catch {
    bed = null;
  }
}

export function stopBed(): void {
  try {
    if (!bed) return;
    const c = getCtx();
    const node = bed;
    bed = null;
    if (c) node.gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.25);
    window.setTimeout(() => {
      node.oscs.forEach((o) => {
        try {
          o.stop();
          o.disconnect();
        } catch {
          /* ignore */
        }
      });
      try {
        node.gain.disconnect();
      } catch {
        /* ignore */
      }
    }, 280);
  } catch {
    bed = null;
  }
}

export const sfx = {
  click() {
    tone(420, 0.05, "square", 0.07);
  },
  chip() {
    tone(880, 0.07, "triangle", 0.1);
    tone(1320, 0.05, "sine", 0.05, undefined, 0.03);
  },
  deal() {
    tone(240, 0.08, "triangle", 0.08, 180);
  },
  tick() {
    tone(700 + Math.random() * 80, 0.03, "square", 0.04);
  },
  coin() {
    tone(1240 + Math.random() * 180, 0.05, "square", 0.05);
    tone(1860, 0.07, "sine", 0.04, undefined, 0.02);
  },
  stop(reel = 2) {
    const f = 190 + reel * 28;
    thud(f, 0.11, 0.14);
    tone(f * 2.2, 0.05, "square", 0.04);
  },
  win(big = false) {
    if (big) {
      tone(523, 0.18, "triangle", 0.14);
      tone(659, 0.18, "triangle", 0.14, undefined, 0.09);
      tone(784, 0.32, "triangle", 0.16, undefined, 0.18);
      tone(1046, 0.4, "sine", 0.12, undefined, 0.28);
    } else {
      tone(660, 0.12, "triangle", 0.12);
      tone(880, 0.18, "sine", 0.1, undefined, 0.07);
    }
  },
  fanfare(tier: "nice" | "big" | "mega" | "epic") {
    if (tier === "nice") {
      this.win(false);
      return;
    }
    const notes =
      tier === "epic"
        ? [392, 523, 659, 784, 1046, 1318]
        : tier === "mega"
          ? [392, 523, 659, 784, 988]
          : [440, 554, 659, 880];
    notes.forEach((n, i) => {
      tone(n, 0.22 + i * 0.04, i % 2 ? "sine" : "triangle", 0.11 + i * 0.01, undefined, i * 0.11);
    });
    thud(90, 0.28, 0.12);
  },
  lose() {
    tone(220, 0.2, "sawtooth", 0.06, 110);
  },
  spin() {
    tone(180, 0.12, "square", 0.06, 90);
    thud(140, 0.14, 0.08);
  },
  cash() {
    tone(988, 0.1, "sine", 0.1);
    tone(1318, 0.16, "sine", 0.12, undefined, 0.08);
  },
  scatter() {
    tone(740, 0.12, "triangle", 0.12);
    tone(988, 0.16, "sine", 0.1, undefined, 0.06);
    tone(1174, 0.2, "sine", 0.08, undefined, 0.12);
  },
  anticipate() {
    tone(320, 1.15, "sawtooth", 0.045, 920);
    tone(160, 1.15, "triangle", 0.04, 480);
  },
  tumble() {
    tone(240, 0.1, "square", 0.07, 90);
    thud(110, 0.12, 0.1);
  },
  explode() {
    thud(80, 0.16, 0.14);
    tone(640, 0.08, "square", 0.05, 180);
  },
  bonus() {
    tone(392, 0.16, "triangle", 0.12);
    tone(523, 0.16, "triangle", 0.12, undefined, 0.1);
    tone(659, 0.22, "sine", 0.14, undefined, 0.2);
    tone(784, 0.36, "sine", 0.12, undefined, 0.32);
    thud(70, 0.3, 0.14);
  },
  wheel() {
    tone(220, 1.8, "sawtooth", 0.05, 880);
  },
  gambleWin() {
    tone(880, 0.1, "square", 0.1);
    tone(1320, 0.16, "triangle", 0.12, undefined, 0.08);
    thud(140, 0.12, 0.1);
  },
  gambleLose() {
    tone(180, 0.28, "sawtooth", 0.08, 70);
  },
  leiterHi() {
    tone(980, 0.07, "square", 0.07);
    tone(1480, 0.05, "sine", 0.04, undefined, 0.02);
  },
  leiterZero() {
    thud(90, 0.09, 0.12);
    tone(210, 0.08, "square", 0.05);
  },
  expand() {
    tone(180, 0.22, "sawtooth", 0.07, 520);
    tone(420, 0.28, "triangle", 0.1, 880, 0.08);
    thud(70, 0.22, 0.12);
  },
};
