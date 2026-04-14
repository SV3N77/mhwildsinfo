interface IconInfo {
  id: number;
  kind: string;
  colorId: number;
  color: string;
}

export interface ItemData {
  id: number;
  gameId: number;
  name: string;
  description: string;
  rarity: number;
  carryLimit: number;
  value: number;
  recipes: Recipe[];
  icon: IconInfo;
}

interface Recipe {
  id: number;
  output: { id: number };
  amount: number;
  inputs: ItemData[];
}

export type ItemCategory =
  | "Consumable"
  | "Ingredient"
  | "CookingIngredients"
  | "Material"
  | "Ammo"
  | "SpecialItem"
  | "TrapsSlinger"
  | "Tool"
  | "Unknown"; // Fallback category

export type GroupedItems = {
  [key in ItemCategory]?: ItemData[];
};
