import { Link } from "react-router-dom";
import type { Restaurant } from "../../../types/api";
import { StatusBadge } from "../../../components/common/StatusBadge";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const image = restaurant.images[0];

  return (
    <Card className="overflow-hidden">
      <div className="relative h-56 bg-[linear-gradient(135deg,rgba(232,93,38,0.82),rgba(17,17,17,0.74))]">
        {image ? (
          <img alt={restaurant.name} className="h-full w-full object-cover" src={image} />
        ) : (
          <div className="grid h-full w-full place-items-center font-serif text-[40px] text-orange-50">
            {getInitials(restaurant.name)}
          </div>
        )}
        <div className="absolute inset-x-4 bottom-4">
          <StatusBadge tone={restaurant.isOpen ? "success" : "danger"}>
            {restaurant.isOpen ? "Open now" : "Closed"}
          </StatusBadge>
        </div>
      </div>

      <CardContent className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{restaurant.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{restaurant.address}</p>
          </div>
          <div className="min-w-[68px] rounded-[10px] bg-brand-muted px-3 py-2 text-center">
            <span className="block text-lg font-bold text-foreground">
              {restaurant.rating.toFixed(1)}
            </span>
            <small className="text-xs text-muted-foreground">rating</small>
          </div>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          {restaurant.description || "Freshly prepared dishes from a kitchen built for speed."}
        </p>

        <div className="flex flex-wrap gap-2">
          {restaurant.cuisine.slice(0, 3).map((entry) => (
            <Badge className="rounded-full" key={entry} variant="brand">
              {entry}
            </Badge>
          ))}
        </div>

        <Button asChild variant="secondary">
          <Link to={`/restaurants/${restaurant._id}`}>View menu</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
