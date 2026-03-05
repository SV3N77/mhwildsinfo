"use client";

import { ItemData, GroupedItems } from "@/lib/types/items";
import { groupItemsByCategory } from "@/lib/utils/itemsUtils";
import { rarityColors } from "@/lib/utils/rarityColors";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Package, Droplet, Wrench, Zap, Gem, Flame, Utensils, Shield, HelpCircle } from "lucide-react";

interface ItemCardProps {
  item: ItemData;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-base leading-tight flex-1">{item.name}</h3>
          <Badge
            variant="secondary"
            className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 bg-muted ${rarityColors[item.rarity] || rarityColors[10]}`}
          >
            R{item.rarity}
          </Badge>
        </div>

        <div className="space-y-2 mb-3">
          {item.value > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Value</span>
              <span className="font-semibold">z{item.value.toLocaleString()}</span>
            </div>
          )}
          {item.carryLimit > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Carry Limit</span>
              <span className="font-semibold">{item.carryLimit}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
      </CardContent>
    </Card>
  );
}

interface GetAllItemsProps {
  items: ItemData[];
}

export default function GetAllItems({ items }: GetAllItemsProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const sortedItems = useMemo(() => groupItemsByCategory(items), [items]);
  const categories = (Object.keys(sortedItems) as Array<keyof GroupedItems>).filter(
    (cat) => sortedItems[cat] && sortedItems[cat]!.length > 0
  );

  const filteredItems = useMemo(() => {
    if (search === "" && selectedCategory === "all") {
      return sortedItems;
    }

    const result: GroupedItems = {};

    categories.forEach((category) => {
      if (selectedCategory !== "all" && category !== selectedCategory) {
        return;
      }

      const categoryItems = sortedItems[category];
      if (!categoryItems || categoryItems.length === 0) return;

      if (search === "") {
        result[category] = categoryItems;
        return;
      }

      const searchLower = search.toLowerCase();
      result[category] = categoryItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower)
      );
    });

    return result;
  }, [sortedItems, search, selectedCategory, categories]);

  const categoryIcons: Record<string, React.ReactNode> = {
    Ammo: <Zap className="h-4 w-4" />,
    TrapsSlinger: <Shield className="h-4 w-4" />,
    Tool: <Wrench className="h-4 w-4" />,
    Consumable: <Droplet className="h-4 w-4" />,
    Ingredient: <Flame className="h-4 w-4" />,
    CookingIngredients: <Utensils className="h-4 w-4" />,
    SpecialItem: <Gem className="h-4 w-4" />,
    Material: <Package className="h-4 w-4" />,
    Unknown: <HelpCircle className="h-4 w-4" />,
  };

  const categoryNames: Record<string, string> = {
    Ammo: "Ammo",
    TrapsSlinger: "Traps & Slingers",
    Tool: "Tools",
    Consumable: "Consumables",
    Ingredient: "Ingredients",
    CookingIngredients: "Cooking Ingredients",
    SpecialItem: "Special Items",
    Material: "Materials",
    Unknown: "Unknown",
  };

  return (
    <div className="flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Package className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">Items</h1>
        </div>
        <p className="text-muted-foreground">
          Browse all items available in Monster Hunter Wilds
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 rounded-lg bg-muted p-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <span>All</span>
            <span className="text-xs text-muted-foreground">({items.length})</span>
          </button>
          {categories.map((category) => {
            const categoryItems = sortedItems[category];
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                {categoryIcons[category]}
                <span className="truncate">{categoryNames[category] || category}</span>
                <span className="text-xs text-muted-foreground shrink-0">({categoryItems?.length || 0})</span>
              </button>
            );
          })}
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items by name, description..."
        />
      </div>

      <div className="space-y-6">
        {Object.entries(filteredItems).map(([category, categoryItems]) => {
          if (!categoryItems || categoryItems.length === 0) return null;
          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-muted">
                  {categoryIcons[category]}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{categoryNames[category] || category}</h2>
                  <p className="text-sm text-muted-foreground">{categoryItems.length} items</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryItems
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
              </div>
            </div>
          );
        })}
        {Object.keys(filteredItems).length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No items found matching "{search}"</p>
            <p className="text-sm mt-2">Try adjusting your search terms or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
