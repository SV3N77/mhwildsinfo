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
  id: number; // Use for React key
  name: string;
  description: string;
  value?: number; // Optional based on example
  slot: number; // Column needed
  rarity: number; // Column needed
  kind: string; // Column needed
  skills?: DecorationSkillInfo[]; // Optional, not displayed in this table
  gameId?: number; // Optional
}
