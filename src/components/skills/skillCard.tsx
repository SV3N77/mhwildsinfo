import Link from "next/link";
import { SkillData } from "@/lib/types/skills";
import { Card, CardContent } from "@/components/ui/card";

interface SkillCardProps {
  skill: SkillData;
}

export function SkillCard({ skill }: SkillCardProps) {
  const maxLevel = skill.ranks.length;

  return (
    <Link href={`/skills/${skill.slug}`}>
      <Card className="h-full hover:border-primary/50 transition-colors">
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-base leading-tight mb-2">{skill.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-muted-foreground">Max Level: {maxLevel}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground capitalize">{skill.kind}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{skill.description}</p>
          <div className="space-y-1 ">
            {skill.ranks.slice(0, 3).map((rank) => (
              <div key={rank.id} className="text-xs text-muted-foreground">
                <span className="font-medium">Lv {rank.level}:</span> {rank.description}
              </div>
            ))}
            {skill.ranks.length > 3 && (
              <div className="text-xs text-muted-foreground italic">+{skill.ranks.length - 3} more levels</div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
