import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface AppShellProps {
  children: ReactNode;
}

const navLinks = [
  { label: "Discover", active: true },
  { label: "Live search" },
  { label: "Menu detail" },
];

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const AppShell = ({ children }: AppShellProps) => (
  <div className="min-h-screen lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
    <motion.aside
      animate={{ x: 0, opacity: 1 }}
      className="sticky top-0 z-10 flex h-auto flex-col justify-between gap-6 bg-sidebar px-4 py-4 text-stone-50 lg:h-screen lg:px-5 lg:py-6"
      initial={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.45, ease: easeOutExpo }}
    >
      <Link className="flex items-center gap-3" to="/">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand font-mono text-[13px] text-white">
          CM
        </span>
        <div className="hidden lg:block">
          <strong className="block text-lg">CHOPMATE</strong>
          <p className="text-sm text-stone-300/80">Food discovery</p>
        </div>
      </Link>

      <nav aria-label="Primary" className="hidden gap-2 lg:grid">
        {navLinks.map((item) => (
          <div
            className={cn(
              "rounded-md px-3.5 py-3 text-sm text-stone-300 transition-colors",
              item.active && "bg-brand-muted/10 text-white",
            )}
            key={item.label}
          >
            {item.label}
          </div>
        ))}
      </nav>

      <div className="hidden lg:block">
        <p className="text-sm text-stone-200">Built for busy diners.</p>
        <span className="text-sm text-stone-300/80">Fast to scan. Calm to use.</span>
      </div>
    </motion.aside>

    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="min-w-0 p-4 md:p-6"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: 0.08, ease: easeOutExpo }}
    >
      <div className="mb-6 flex flex-col gap-4 rounded-lg border border-border/80 bg-white/80 px-6 py-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand">
            Live catalog
          </p>
          <h2 className="font-serif text-[28px] leading-none text-foreground">
            Browse restaurants and menus
          </h2>
        </div>
        <div className="grid gap-3 sm:flex sm:items-center">
          <Button asChild variant="outline">
            <Link to="/partners/login">Sign in</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/partners/register">List restaurant</Link>
          </Button>
          <Button type="button">Cart (0)</Button>
        </div>
      </div>
      <main className="grid gap-6">{children}</main>
    </motion.div>
  </div>
);
