export interface SkillIcon {
  id: number;
  kind: string;
}

export interface SkillRank {
  id: number;
  level: number;
  description: string;
  skill: {
    id: number;
  };
}

export interface SkillData {
  id: number;
  gameId: number;
  name: string;
  description: string;
  kind: string;
  icon: SkillIcon;
  ranks: SkillRank[];
}
