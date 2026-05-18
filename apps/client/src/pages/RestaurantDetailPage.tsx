import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { SkeletonCard } from "../components/common/SkeletonCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { MenuSection } from "../features/restaurants/components/MenuSection";
import {
  useRestaurant,
  useRestaurantCategories,
  useRestaurantMenu,
} from "../features/restaurants/hooks/useRestaurant";
import { formatAddress } from "../types/api";

export const RestaurantDetailPage = () => {
  const { restaurantId = "" } = useParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const restaurantQuery = useRestaurant(restaurantId);
  const categoriesQuery = useRestaurantCategories(restaurantId);
  const menuQuery = useRestaurantMenu(restaurantId);

  const heroImage = restaurantQuery.data?.images[0];
  const itemCount = menuQuery.data?.items.length ?? 0;

  const detailStatus = useMemo(() => {
    if (restaurantQuery.isLoading || categoriesQuery.isLoading || menuQuery.isLoading) {
      return "loading";
    }

    if (restaurantQuery.isError || categoriesQuery.isError || menuQuery.isError) {
      return "error";
    }

    return "ready";
  }, [
    categoriesQuery.isError,
    categoriesQuery.isLoading,
    menuQuery.isError,
    menuQuery.isLoading,
    restaurantQuery.isError,
    restaurantQuery.isLoading,
  ]);

  if (detailStatus === "loading") {
    return (
      <section className="grid gap-6">
        <div className="h-[380px] animate-pulse rounded-lg border border-border bg-muted" />
        <div className="grid gap-5 md:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    );
  }

  if (detailStatus === "error" || !restaurantQuery.data || !categoriesQuery.data || !menuQuery.data) {
    return (
      <EmptyState
        description="We could not load the restaurant, categories, or menu from the API. Check the endpoint data and try again."
        title="Restaurant details are unavailable"
      />
    );
  }

  return (
    <div className="grid gap-6">
      <Button asChild className="w-fit" variant="ghost">
        <Link to="/">Back to discovery</Link>
      </Button>

      <Card className="relative min-h-[380px] overflow-hidden">
        {heroImage ? (
          <img
            alt={restaurantQuery.data.name}
            className="absolute inset-0 h-full w-full object-cover"
            src={heroImage}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(232,93,38,0.68),rgba(26,26,26,0.94))]" />
        )}
        <div className="absolute inset-0 bg-detail-overlay" />
        <div className="relative z-[1] grid gap-5 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-orange-200">
            Restaurant detail
          </p>
          <div className="grid gap-4 md:flex md:items-start md:justify-between">
            <div>
              <h1 className="font-serif text-[clamp(32px,5vw,44px)] leading-none">
                {restaurantQuery.data.name}
              </h1>
              <p className="mt-2 text-sm text-white/80">{formatAddress(restaurantQuery.data.address)}</p>
            </div>
            <StatusBadge tone={restaurantQuery.data.isOpen ? "success" : "danger"}>
              {restaurantQuery.data.isOpen ? "Open now" : "Closed"}
            </StatusBadge>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-white/80">
            {restaurantQuery.data.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {restaurantQuery.data.cuisine.map((entry) => (
              <Badge className="rounded-full bg-white/10 text-white backdrop-blur" key={entry}>
                {entry}
              </Badge>
            ))}
            <Badge className="rounded-full bg-white/10 text-white backdrop-blur">
              Rating {restaurantQuery.data.rating.toFixed(1)}
            </Badge>
            <Badge className="rounded-full bg-white/10 text-white backdrop-blur">
              {itemCount} menu items
            </Badge>
          </div>
        </div>
      </Card>

      <MenuSection
        activeCategory={activeCategory}
        categories={categoriesQuery.data}
        items={menuQuery.data.items}
        onCategoryChange={setActiveCategory}
      />

      {menuQuery.data.items.length === 0 ? (
        <EmptyState
          description="This restaurant has been created, but no menu items have been added yet."
          title="No menu items yet"
        />
      ) : null}
    </div>
  );
};
