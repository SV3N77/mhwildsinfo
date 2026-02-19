"use client";

import { ItemData, GroupedItems } from "@/lib/types/items";
import { groupItemsByCategory } from "@/lib/utils/itemsUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

const rarityColors: Record<number, string> = {
  1: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  2: "bg-green-500/10 text-green-500 border-green-500/20",
  3: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  4: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  5: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  6: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  7: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  8: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  9: "bg-red-500/10 text-red-500 border-red-500/20",
  10: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

interface ItemsListProps {
  items: ItemData[];
}

function ItemsList({ items }: ItemsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-default"
        >
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{item.name}</div>
            {item.description && (
              <div className="text-xs text-muted-foreground truncate mt-0.5">{item.description}</div>
            )}
          </div>
          {item.rarity && (
            <Badge
              variant="outline"
              className={`shrink-0 text-xs ${rarityColors[item.rarity] || rarityColors[10]}`}
            >
              {item.rarity}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}

export default function GetAllItems() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useState(() => {
    fetch("https://wilds.mhdb.io/en/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  });

  const sortedItems = useMemo(() => groupItemsByCategory(items), [items]);
  const categories = Object.keys(sortedItems) as (keyof GroupedItems)[];

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
      if (!categoryItems) return;

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
  }, [sortedItems, search, selectedCategory]);

  const categoryColors: Record<string, string> = {
    Ammo: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    TrapsSlinger: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Tool: "bg-green-500/10 text-green-500 border-green-500/20",
    Consumable: "bg-red-500/10 text-red-500 border-red-500/20",
    Ingredient: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    CookingIngredients: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    SpecialItem: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    Material: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    Unknown: "bg-slate-500/10 text-slate-500 border-slate-500/20",
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

  if (loading) {
    return (
      <div className="flex flex-col px-20 py-10">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-muted rounded animate-pulse" />
          <div className="h-12 w-96 bg-muted rounded animate-pulse" />
          <div className="grid grid-cols-4 gap-4 mt-6">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-20 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Items</h1>
        <p className="text-muted-foreground">Browse all items available in Monster Hunter Wilds</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items..."
          className="max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === "all" ? "default" : "outline"}
            className="cursor-pointer hover:bg-accent"
            onClick={() => setSelectedCategory("all")}
          >
            All Categories
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer hover:bg-accent ${
                selectedCategory === category ? "" : categoryColors[category] || ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {categoryNames[category] || category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(filteredItems).map(([category, items]) => {
          if (!items || items.length === 0) return null;
          return (
            <Card key={category} className="overflow-hidden">
              <CardHeader className="bg-muted/50 py-6">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl">{categoryNames[category] || category}</CardTitle>
                  <Badge variant="secondary" className="text-sm">
                    {items.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ItemsList items={items} />
              </CardContent>
            </Card>
          );
        })}
        {Object.keys(filteredItems).length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No items found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
