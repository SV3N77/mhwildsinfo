export interface CharmSkill {
  skill: {
    id: number;
    name: string;
  };
  level: number;
  description: string;
  id: number;
}

export interface CharmRank {
  id: number;
  name: string;
  description: string;
  level: number;
  rarity: number;
  skills: CharmSkill[];
  craftable?: boolean;
  zennyCost?: number;
}

export interface CharmData {
  id: number;
  gameId: number;
  ranks: CharmRank[];
}
