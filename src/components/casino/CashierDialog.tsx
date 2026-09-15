import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEPOSIT_PRESETS, PAYMENT_METHODS, type PaymentMethodId } from "@/lib/casino/catalog";
import { formatEuro, formatTime, parseEuroInput } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { Check, Landmark, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "form" | "processing" | "done";

export function CashierDialog() {
  const open = useCasino((s) => s.cashierOpen);
  const setOpen = useCasino((s) => s.setCashierOpen);
  const deposit = useCasino((s) => s.deposit);
  const withdraw = useCasino((s) => s.withdraw);
  const balance = useCasino((s) => s.balance);
  const txs = useCasino((s) => s.transactions);
  const soundOn = useCasino((s) => s.soundOn);

  const [tab, setTab] = useState("einzahlung");
  const [amount, setAmount] = useState(10000);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState<PaymentMethodId>("visa");
  const [cardName, setCardName] = useState("A. Müller");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("123");
  const [iban, setIban] = useState("DE89 3704 0044 0532 0130 00");
  const [bonus, setBonus] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState<string | null>(null);
  const [lastBonus, setLastBonus] = useState(0);
  const [lastAmount, setLastAmount] = useState(0);

  const selected = useMemo(() => {
    const parsed = parseEuroInput(custom);
    return parsed && parsed > 0 ? parsed : amount;
  }, [custom, amount]);

  function reset() {
    setStep("form");
    setError(null);
    setLastBonus(0);
  }

  function processDeposit() {
    unlockAudio();
    setError(null);
    if (selected < 1000) {
      setError("Mindesteinzahlung 10,00 €");
      return;
    }
    setStep("processing");
    window.setTimeout(() => {
      const res = deposit(selected, method, bonus);
      if (!res.ok) {
        setError(res.reason);
        setStep("form");
        return;
      }
      setLastAmount(selected);
      setLastBonus(res.bonus);
      if (soundOn) sfx.cash();
      setStep("done");
    }, 1400);
  }

  function processWithdraw() {
    unlockAudio();
    setError(null);
    setStep("processing");
    window.setTimeout(() => {
      const res = withdraw(selected);
      if (!res.ok) {
        setError(res.reason);
        setStep("form");
        return;
      }
      setLastAmount(selected);
      if (soundOn) sfx.cash();
      setStep("done");
    }, 1200);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kasse</DialogTitle>
          <DialogDescription>Spielgeld in Euro. Keine echte Zahlung wird ausgeführt.</DialogDescription>
        </DialogHeader>

        {step === "processing" ? (
          <div className="flex flex-col items-center gap-3 py-10 text-muted">
            <LoaderCircle className="size-8 animate-spin text-accent" />
            <p className="text-sm">{tab === "auszahlung" ? "Auszahlung wird vorbereitet…" : "Zahlung wird autorisiert…"}</p>
          </div>
        ) : step === "done" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-win/15 text-win">
              <Check className="size-5" />
            </span>
            <p className="font-display text-3xl tabular-nums text-fg">{formatEuro(lastAmount)}</p>
            <p className="text-sm text-muted">
              {tab === "auszahlung" ? "Auszahlung gutgeschrieben (Spielgeld)." : "Einzahlung gutgeschrieben."}
            </p>
            {lastBonus > 0 ? (
              <p className="text-sm text-win">Willkommensbonus {formatEuro(lastBonus)}</p>
            ) : null}
            <Button className="mt-4 w-full" onClick={() => setOpen(false)}>
              Weiter spielen
            </Button>
          </div>
        ) : (
          <Tabs
            value={tab}
            onValueChange={(v) => {
              setTab(v);
              setError(null);
            }}
          >
            <TabsList className="w-full">
              <TabsTrigger value="einzahlung" className="flex-1">
                Einzahlung
              </TabsTrigger>
              <TabsTrigger value="auszahlung" className="flex-1">
                Auszahlung
              </TabsTrigger>
              <TabsTrigger value="verlauf" className="flex-1">
                Verlauf
              </TabsTrigger>
            </TabsList>

            <TabsContent value="einzahlung">
              <p className="mb-2 text-xs uppercase tracking-wider text-subtle">Betrag</p>
              <div className="grid grid-cols-4 gap-2">
                {DEPOSIT_PRESETS.map((cents) => (
                  <button
                    key={cents}
                    type="button"
                    onClick={() => {
                      setAmount(cents);
                      setCustom("");
                      if (soundOn) sfx.click();
                    }}
                    className={cn(
                      "h-11 rounded-md border text-sm tabular-nums",
                      amount === cents && !custom
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-border bg-elevated text-fg hover:border-accent/40",
                    )}
                  >
                    {formatEuro(cents).replace(",00", "")}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <Input
                  inputMode="decimal"
                  placeholder="Eigener Betrag"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  aria-label="Eigener Betrag"
                />
              </div>

              <p className="mb-2 mt-5 text-xs uppercase tracking-wider text-subtle">Zahlungsart</p>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      "h-11 rounded-md border px-3 text-left text-sm",
                      method === m.id
                        ? "border-accent bg-elevated text-fg"
                        : "border-border bg-bg text-muted hover:text-fg",
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {PAYMENT_METHODS.find((m) => m.id === method)?.kind === "card" ? (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Input className="col-span-2" value={cardName} onChange={(e) => setCardName(e.target.value)} aria-label="Karteninhaber" />
                  <Input
                    className="col-span-2"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    aria-label="Kartennummer"
                    inputMode="numeric"
                  />
                  <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} aria-label="Ablauf" />
                  <Input value={cvv} onChange={(e) => setCvv(e.target.value)} aria-label="Prüfnummer" inputMode="numeric" />
                </div>
              ) : null}

              <div className="mt-4">
                <Input
                  placeholder="Bonuscode (WELCOME)"
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  aria-label="Bonuscode"
                />
              </div>

              {error ? <p className="mt-3 text-sm text-loss">{error}</p> : null}

              <Button className="mt-5 w-full" size="lg" onClick={processDeposit}>
                {formatEuro(selected)} einzahlen
              </Button>
              <p className="mt-3 text-center text-xs text-subtle">
                Guthaben: {formatEuro(balance)} · Demo, keine Bankbuchung
              </p>
            </TabsContent>

            <TabsContent value="auszahlung">
              <p className="mb-2 text-xs uppercase tracking-wider text-subtle">Betrag · Guthaben {formatEuro(balance)}</p>
              <div className="grid grid-cols-3 gap-2">
                {[2000, 5000, 10000, 25000, 50000, balance].filter((v, i, a) => v > 0 && a.indexOf(v) === i).map((cents) => (
                  <button
                    key={cents}
                    type="button"
                    onClick={() => {
                      setAmount(cents);
                      setCustom("");
                    }}
                    className={cn(
                      "h-11 rounded-md border text-sm tabular-nums",
                      amount === cents && !custom
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-border bg-elevated text-fg",
                    )}
                  >
                    {cents === balance ? "Alles" : formatEuro(cents).replace(",00", "")}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <Input
                  inputMode="decimal"
                  placeholder="Eigener Betrag"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-xs uppercase tracking-wider text-subtle">IBAN (Demo)</label>
                <div className="relative">
                  <Landmark className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
                  <Input className="pl-9" value={iban} onChange={(e) => setIban(e.target.value)} />
                </div>
              </div>
              {error ? <p className="mt-3 text-sm text-loss">{error}</p> : null}
              <Button className="mt-5 w-full" size="lg" variant="secondary" onClick={processWithdraw}>
                {formatEuro(selected)} auszahlen
              </Button>
            </TabsContent>

            <TabsContent value="verlauf">
              {txs.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted">Noch keine Bewegungen.</p>
              ) : (
                <ul className="max-h-72 space-y-2 overflow-y-auto">
                  {txs.slice(0, 30).map((tx) => (
                    <li key={tx.id} className="flex items-center justify-between rounded-md bg-elevated px-3 py-2">
                      <div>
                        <p className="text-sm text-fg">{tx.label}</p>
                        <p className="text-xs text-subtle">{formatTime(tx.at)}</p>
                      </div>
                      <p
                        className={cn(
                          "text-sm tabular-nums",
                          tx.kind === "bet" || tx.kind === "withdraw" ? "text-loss" : "text-win",
                        )}
                      >
                        {tx.kind === "bet" || tx.kind === "withdraw" ? "−" : "+"}
                        {formatEuro(tx.cents)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
