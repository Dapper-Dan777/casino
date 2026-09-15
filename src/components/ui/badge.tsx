import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-elevated px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
