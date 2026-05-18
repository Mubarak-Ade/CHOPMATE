import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
  className?: string;
}

export const PageHeader = ({ title, subtitle, action, className }: PageHeaderProps) => (
  <header
    className={cn(
      "flex flex-col gap-4 rounded-lg border border-border bg-surface p-7 shadow-sm md:flex-row md:items-end md:justify-between",
      className,
    )}
  >
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">
        Customer discovery
      </p>
      <h1 className="font-serif text-[clamp(28px,4vw,36px)] leading-none text-foreground">
        {title}
      </h1>
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{subtitle}</p>
    </div>
    {action ? <div>{action}</div> : null}
  </header>
);
