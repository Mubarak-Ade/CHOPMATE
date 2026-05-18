import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

interface MarketingShellProps {
  children: ReactNode;
}

const navLinks = [
  { label: "Marketplace", to: "/marketplace" },
  { label: "Journal", to: "/" },
];

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const MarketingShell = ({ children }: MarketingShellProps) => (
  <div className="min-h-screen">
    <motion.header
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-20 border-b border-border/70 bg-white/90 backdrop-blur"
      initial={{ y: -18, opacity: 0 }}
      transition={{ duration: 0.45, ease: easeOutExpo }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:px-6">
        <Link className="shrink-0 font-sans text-2xl font-bold tracking-tight text-brand" to="/">
          Chopmate
        </Link>

        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-12 rounded-xl border-border bg-stone-50 pl-10 shadow-none"
            placeholder="Search restaurants, cuisines, or dishes..."
            readOnly
          />
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                cn(
                  "border-b border-transparent pb-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
                  isActive && "border-brand text-brand",
                )
              }
              key={link.label}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Button className="hidden md:inline-flex" type="button" variant="ghost">
            Sign In
          </Button>
          <Button type="button">Join Now</Button>
        </div>
      </div>
    </motion.header>

    <main>{children}</main>
  </div>
);
