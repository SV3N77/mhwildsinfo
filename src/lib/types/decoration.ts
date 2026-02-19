interface DecorationIcon {
  color: string;
  colorId: number;
}

interface DecorationSkillInfo {
  skill: {
    id: number;
    gameId: number;
    name: string;
  };
  level: number;
  description: string;
  id: number;
}

export interface DecorationData {
  id: number;
  gameId: number;
  name: string;
  description: string;
  value?: number;
  slot: number;
  rarity: number;
  kind: string;
  skills?: DecorationSkillInfo[];
  icon: DecorationIcon;
}
