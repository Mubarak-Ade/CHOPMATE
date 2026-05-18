import type { Restaurant } from "../../../types/api";
import { RestaurantCard } from "./RestaurantCard";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export const RestaurantList = ({ restaurants }: RestaurantListProps) => (
  <section
    aria-label="Restaurant results"
    className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
  >
    {restaurants.map((restaurant) => (
      <RestaurantCard key={restaurant._id} restaurant={restaurant} />
    ))}
  </section>
);
