export interface ItemData {
  rarity: number;
  name: string;
  description: string;
  value: number;
  carryLimit: number;
  recipes: Recipe[];
  id: number;
  gameId: number;
}

export interface Recipe {
  output: Output;
  amount: number;
  inputs: Input[];
  id: number;
}

export interface Input {
  name: string;
  id: number;
}

export interface Output {
  id: number;
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
