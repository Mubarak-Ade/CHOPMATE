import type { ChangeEvent } from "react";
import type { RestaurantSearchParams } from "../../../types/api";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

interface FilterBarProps {
  filters: RestaurantSearchParams;
  onFilterChange: (nextFilters: RestaurantSearchParams) => void;
}

export const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  const update =
    (key: keyof RestaurantSearchParams) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      onFilterChange({
        ...filters,
        [key]: key === "rating" && value ? Number(value) : value || undefined,
      });
    };

  return (
    <Card>
      <CardContent className="grid gap-4 p-5 md:grid-cols-[2fr_1fr_1fr]">
        <label className="grid gap-2">
          <span className="text-xs text-muted-foreground">Search</span>
          <Input
          onChange={update("q")}
          placeholder="Find food or restaurant..."
          type="search"
          value={filters.q ?? ""}
        />
        </label>

        <label className="grid gap-2">
          <span className="text-xs text-muted-foreground">Cuisine</span>
          <Input
          onChange={update("cuisine")}
          placeholder="e.g. Grill"
          type="text"
          value={filters.cuisine ?? ""}
        />
        </label>

        <label className="grid gap-2">
          <span className="text-xs text-muted-foreground">Minimum rating</span>
          <select
            className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20"
            onChange={update("rating")}
            value={filters.rating?.toString() ?? ""}
          >
            <option value="">All ratings</option>
            <option value="4">4.0+</option>
            <option value="3">3.0+</option>
            <option value="2">2.0+</option>
          </select>
        </label>
      </CardContent>
    </Card>
  );
};
