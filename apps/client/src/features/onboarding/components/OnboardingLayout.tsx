import { Link, NavLink, Outlet } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ONBOARDING_STEPS } from "../store/onboarding.store";
import { useOnboardingStore } from "../store/onboarding.store";

export const OnboardingLayout = () => {
  const currentStep = useOnboardingStore((state) => state.currentStep);

  return (
    <div className="min-h-screen bg-[#fbf7f3] text-foreground lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="flex flex-col bg-sidebar px-6 py-8 text-stone-50">
        <Link className="text-xl font-bold tracking-tight text-white" to="/">
          Chopmate
        </Link>
        <p className="mt-2 text-sm text-stone-300">Restaurant onboarding</p>

        <nav className="mt-10 space-y-2">
          {ONBOARDING_STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const stepIndex = ONBOARDING_STEPS.findIndex((item) => item.id === currentStep);
            const isComplete = ONBOARDING_STEPS.findIndex((item) => item.id === step.id) < stepIndex;

            return (
              <NavLink
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors",
                  isActive
                    ? "bg-brand text-white"
                    : isComplete
                      ? "bg-white/10 text-white"
                      : "text-stone-400",
                )}
                key={step.id}
                to={`/onboarding/${step.id}`}
              >
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-full text-xs font-semibold",
                    isActive ? "bg-white/20" : "bg-white/10",
                  )}
                >
                  {isComplete ? <Check className="size-4" /> : step.step}
                </span>
                {step.label}
              </NavLink>
            );
          })}
        </nav>

        <p className="mt-auto text-xs text-stone-400">
          Progress auto-saves as you complete each step.
        </p>
      </aside>

      <main className="px-5 py-8 md:px-10 md:py-12">
        <Outlet />
      </main>
    </div>
  );
};
