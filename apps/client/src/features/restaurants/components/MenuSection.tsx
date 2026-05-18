import type { Category, MenuItem } from "../../../types/api";
import { Button } from "../../../components/ui/button";
import { MenuItemCard } from "./MenuItemCard";

interface MenuSectionProps {
  categories: Category[];
  items: MenuItem[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const MenuSection = ({
  categories,
  items,
  activeCategory,
  onCategoryChange,
}: MenuSectionProps) => {
  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => {
          const categoryId =
            typeof item.category === "string" ? item.category : item.category._id;
          return categoryId === activeCategory;
        });

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        <Button
          className="rounded-full"
          onClick={() => onCategoryChange("all")}
          type="button"
          variant={activeCategory === "all" ? "default" : "outline"}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            className="rounded-full"
            key={category._id}
            onClick={() => onCategoryChange(category._id)}
            type="button"
            variant={activeCategory === category._id ? "default" : "outline"}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <MenuItemCard item={item} key={item._id} />
        ))}
      </div>
    </section>
  );
};
