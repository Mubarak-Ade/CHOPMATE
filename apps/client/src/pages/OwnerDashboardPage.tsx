import { Link } from "react-router-dom";
import { BarChart3, Clock, Store, UtensilsCrossed } from "lucide-react";
import { Button } from "../components/ui/button";
import { useOnboardingState } from "../features/onboarding/hooks/useOnboarding";

export const OwnerDashboardPage = () => {
  const { data } = useOnboardingState();
  const restaurant = data?.restaurant;

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Link className="flex items-center gap-3 font-semibold" to="/">
            <span className="grid size-10 place-items-center rounded-md bg-brand text-white">CM</span>
            Chopmate
          </Link>
          <Button asChild variant="outline">
            <Link to="/marketplace">View marketplace</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">Owner dashboard</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            {restaurant?.name ?? "Your restaurant"} is ready to manage.
          </h1>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Status", value: restaurant?.status ?? "active", icon: Store },
            { label: "Menu items", value: String(data?.progress.menuItemCount ?? 0), icon: UtensilsCrossed },
            { label: "Prep time", value: `${restaurant?.delivery.prepTimeMinutes ?? 30} min`, icon: Clock },
            { label: "Rating", value: restaurant?.rating.toFixed(1) ?? "0.0", icon: BarChart3 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article className="rounded-lg border border-border bg-white p-5 shadow-sm" key={item.label}>
                <Icon className="mb-5 size-5 text-brand" />
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold capitalize">{item.value}</p>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};
