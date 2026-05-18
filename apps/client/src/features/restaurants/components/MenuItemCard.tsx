import type { MenuItem } from "../../../types/api";
import { StatusBadge } from "../../../components/common/StatusBadge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: MenuItemCardProps) => (
  <Card>
    <CardContent className="grid gap-5 p-5">
      <div className="grid gap-4 sm:flex sm:items-start sm:justify-between">
        <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
        <StatusBadge tone={item.isAvailable ? "success" : "warning"}>
          {item.isAvailable ? "Available" : "Unavailable"}
        </StatusBadge>
      </div>
      <p className="text-sm leading-6 text-muted-foreground">
        {item.description || "A balanced kitchen favorite designed for reliable service."}
      </p>

      <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
        <strong className="text-xl font-semibold text-foreground">
          {formatCurrency(item.price)}
        </strong>
        <Button disabled={!item.isAvailable} type="button">
        Add to cart
        </Button>
      </div>
    </CardContent>
  </Card>
);
