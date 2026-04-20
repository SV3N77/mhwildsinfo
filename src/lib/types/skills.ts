interface SkillIcon {
  id: number;
  kind: string;
}

interface SkillRank {
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
  slug: string;
  description: string;
  kind: string;
  icon: SkillIcon;
  ranks: SkillRank[];
}
