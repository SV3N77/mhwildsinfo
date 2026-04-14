interface CharmSkill {
  skill: {
    id: number;
    name: string;
  };
  level: number;
  description: string;
  id: number;
}

interface CharmCraftingMaterial {
  id: number;
  quantity: number;
  item: {
    id: number;
    gameId: number;
    rarity: number;
    name: string;
    description: string;
    value: number;
    carryLimit: number;
    recipes: any[];
  };
}

interface CharmRankCrafting {
  id: number;
  craftable: boolean;
  materials: CharmCraftingMaterial[];
  zennyCost: number;
}

interface CharmRank {
  id: number;
  name: string;
  description: string;
  level: number;
  rarity: number;
  skills: CharmSkill[];
  crafting?: CharmRankCrafting;
}

export interface CharmData {
  id: number;
  gameId: number;
  ranks: CharmRank[];
  slug?: string;
}
