import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

interface MarketplaceShellProps {
  children: ReactNode;
}

const navLinks = [
  { label: "Discover", to: "/marketplace" },
  { label: "Orders", to: "/" },
];

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const MarketplaceShell = ({ children }: MarketplaceShellProps) => (
  <div className="min-h-screen bg-[#fbf7f3] text-foreground">
    <motion.header
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 border-b border-black/5 bg-[#fbf7f3]/95 backdrop-blur"
      initial={{ y: -18, opacity: 0 }}
      transition={{ duration: 0.45, ease: easeOutExpo }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 md:px-6">
        <Link
          className="shrink-0 text-lg font-bold tracking-[-0.03em] text-[#c53b12] sm:text-2xl"
          to="/"
        >
          Editorial Hospitality
        </Link>

        <div className="relative hidden flex-1 xl:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            className="h-12 rounded-2xl border-transparent bg-white/80 pl-10 shadow-none placeholder:text-stone-400 focus-visible:ring-[#e85d26]/20"
            placeholder="Find food or restaurant..."
            readOnly
          />
        </div>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                cn(
                  "border-b border-transparent pb-1 text-sm font-medium text-stone-600 transition-colors hover:text-[#c53b12]",
                  isActive && "border-[#c53b12] text-[#c53b12]",
                )
              }
              key={link.label}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          aria-label="Open cart"
          className="relative hidden h-11 w-11 place-items-center rounded-full text-[#2f211b] transition-colors hover:bg-white md:grid"
          type="button"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#c53b12] px-1 text-[10px] font-bold text-white">
            2
          </span>
        </button>

        <Button className="rounded-xl bg-[#c53b12] px-6 hover:bg-[#ab3310]" type="button">
          Login
        </Button>
      </div>
    </motion.header>

    <main>{children}</main>
  </div>
);
