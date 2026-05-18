import { useState } from "react";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { SkeletonCard } from "../components/common/SkeletonCard";
import { StatCard } from "../components/common/StatCard";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { FilterBar } from "../features/restaurants/components/FilterBar";
import { RestaurantList } from "../features/restaurants/components/RestaurantList";
import { useRestaurants } from "../features/restaurants/hooks/useRestaurants";
import type { RestaurantSearchParams } from "../types/api";

export const HomePage = () => {
  const [filters, setFilters] = useState<RestaurantSearchParams>({});
  const restaurantQuery = useRestaurants(filters);

  return (
    <div className="grid gap-6">
      <PageHeader
        action={
          <Button type="button">
            Browse featured
          </Button>
        }
        subtitle="Search live restaurant catalogs, scan cuisines quickly, and jump straight into available menus."
        title="Restaurant discovery"
      />

      <Card className="overflow-hidden bg-hero-wash">
        <CardContent className="grid gap-6 p-7">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">
              Calm confidence
            </p>
            <h2 className="font-serif text-4xl leading-none text-foreground">
              Find the right kitchen in a few seconds.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Built for speed under pressure with crisp hierarchy, clear status signals, and
            forgiving empty states.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              caption="Real-time search backed by your API"
              label="Catalog mode"
              value="Live"
            />
            <StatCard
              caption="Useful when staff or diners need fast scanning"
              label="Scan speed"
              value="High"
            />
            <StatCard
              caption="Open-state and rating surfaced immediately"
              label="Decision clarity"
              value="Strong"
            />
          </div>
        </CardContent>
      </Card>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      {restaurantQuery.isLoading ? (
        <section
          aria-label="Loading restaurants"
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </section>
      ) : null}

      {restaurantQuery.isError ? (
        <EmptyState
          description="The restaurant catalog could not be loaded from the API. Confirm the backend is running and the base URL is correct."
          title="Unable to load restaurants"
        />
      ) : null}

      {restaurantQuery.data && restaurantQuery.data.length > 0 ? (
        <RestaurantList restaurants={restaurantQuery.data} />
      ) : null}

      {restaurantQuery.data && restaurantQuery.data.length === 0 ? (
        <EmptyState
          description="Try a broader search term, remove the cuisine filter, or lower the minimum rating."
          title="No restaurants matched your filters"
        />
      ) : null}
    </div>
  );
};
