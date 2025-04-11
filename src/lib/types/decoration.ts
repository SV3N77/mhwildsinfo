interface DecorationSkillInfo {
  skill: {
    id: number;
    name: string;
  };
  level: number;
  description: string;
  id: number;
}

export interface DecorationData {
  id: number;
  name: string;
  description: string;
  value?: number;
  slot: number;
  rarity: number;
  kind: string;
  skills?: DecorationSkillInfo[];
  gameId: number;
}
