import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ConciergeBell,
  Rocket,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";

const registerSteps = [
  { label: "Business Identity", icon: Store, active: true },
  { label: "Operational Details", icon: ConciergeBell },
  { label: "Menu Setup", icon: UtensilsCrossed },
  { label: "Review & Launch", icon: Rocket },
];

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const PartnerRegisterPage = () => (
  <div className="min-h-screen bg-[#fbf7f3] text-[#1c1613]">
    <header className="border-b border-black/5">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-6 md:px-10">
        <Link className="text-2xl font-bold tracking-[-0.04em] text-[#4b4644]" to="/">
          Editorial Hospitality
        </Link>

        <nav className="hidden items-center gap-10 text-[15px] text-[#6e625c] md:flex">
          <a href="#destinations">Destinations</a>
          <a href="#experience">Experience</a>
          <Link className="font-semibold text-[#f26422]" to="/partners/register">
            Sign In
          </Link>
        </nav>
      </div>
    </header>

    <main className="mx-auto grid min-h-[calc(100vh-161px)] max-w-[1500px] lg:grid-cols-[520px_minmax(0,1fr)]">
      <aside className="border-r border-black/6 px-5 py-8 md:px-10 md:py-14">
        <div className="flex h-full flex-col">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.03em] text-[#f26422]">
              Partner Onboarding
            </p>
            <p className="mt-3 max-w-xs text-[18px] leading-9 text-[#4c3c34]">
              Follow these steps to set up your editorial presence.
            </p>
          </div>

          <div className="mt-14 grid gap-6">
            {registerSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-6 py-5 text-[18px] transition-colors",
                    step.active
                      ? "border border-[#f3b89d] bg-[#fdf0e8] text-[#f26422]"
                      : "text-[#9f8f87]",
                  )}
                  key={step.label}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-5 w-5" />
                    <span className={cn(step.active ? "font-semibold" : "font-medium")}>
                      {step.label}
                    </span>
                  </div>
                  {step.active ? <ArrowRight className="h-5 w-5" /> : null}
                </div>
              );
            })}
          </div>

          <div className="mt-auto rounded-[22px] border border-[#f3c9b5] bg-[#fff4ee] p-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f26422]">
              Need Help?
            </p>
            <p className="mt-5 max-w-xs text-[18px] leading-9 text-[#4c3c34]">
              Our partner success team is available 24/7 to guide you through the integration
              process.
            </p>
          </div>
        </div>
      </aside>

      <section className="px-5 py-10 md:px-12 md:py-16">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 22 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-[-0.05em] text-[#151210] md:text-6xl">
              Business Identity
            </h1>
            <p className="text-[18px] leading-8 text-[#5b4a40]">
              Start by setting up your basic account information.
            </p>
          </div>

          <div className="mt-16 space-y-7">
            <label className="block">
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#8b776d]">
                Email Address
              </span>
              <Input
                className="h-16 rounded-2xl border-[#efe5df] bg-white px-6 text-lg shadow-none placeholder:text-[#c7bbb4]"
                placeholder="name@company.com"
                type="email"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#8b776d]">
                Password
              </span>
              <Input
                className="h-16 rounded-2xl border-[#efe5df] bg-white px-6 text-lg shadow-none placeholder:text-[#c7bbb4]"
                placeholder="••••••••"
                type="password"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#8b776d]">
                Confirm Password
              </span>
              <Input
                className="h-16 rounded-2xl border-[#efe5df] bg-white px-6 text-lg shadow-none placeholder:text-[#c7bbb4]"
                placeholder="••••••••"
                type="password"
              />
            </label>
          </div>

          <div className="mt-8">
            <Button
              asChild
              className="h-16 w-full rounded-2xl bg-[#f26422] text-xl font-semibold shadow-[0_20px_40px_rgba(242,100,34,0.22)] hover:bg-[#de581a]"
              size="lg"
            >
              <Link to="/partners/onboarding">Create Account</Link>
            </Button>
          </div>

          <div className="my-12 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-[#ab9990]">
            <div className="h-px flex-1 bg-[#eadfd9]" />
            <span className="bg-[#fbf7f3] px-2">Or Continue With</span>
            <div className="h-px flex-1 bg-[#eadfd9]" />
          </div>

          <div className="space-y-4">
            <button
              className="flex h-16 w-full items-center justify-center gap-4 rounded-2xl border border-[#efe5df] bg-white text-xl font-semibold text-[#191412] shadow-sm transition-colors hover:bg-[#fffaf7]"
              type="button"
            >
              <span className="text-2xl">G</span>
              Continue with Google
            </button>

            <button
              className="flex h-16 w-full items-center justify-center gap-4 rounded-2xl border border-[#efe5df] bg-[#f6f1ed] text-xl font-semibold text-[#d7cbc5]"
              disabled
              type="button"
            >
              <Building2 className="h-5 w-5" />
              Continue with Apple
            </button>
          </div>

          <div className="mt-14 text-center text-sm leading-7 text-[#8f7c72]">
            <p>
              By creating an account, you agree to our{" "}
              <a className="font-medium text-[#f26422]" href="#terms">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="font-medium text-[#f26422]" href="#privacy">
                Privacy Policy
              </a>
            </p>
            <p className="mt-8 text-[18px] text-[#2a221d]">
              Already have an account?{" "}
              <Link className="font-semibold text-[#f26422]" to="/partners/register">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </main>

    <footer className="border-t border-black/5">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-5 py-7 text-[15px] text-[#655850] md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2024 Editorial Hospitality. All rights reserved.</p>
        <div className="flex flex-wrap gap-8">
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#contact">Contact Us</a>
        </div>
      </div>
    </footer>
  </div>
);
