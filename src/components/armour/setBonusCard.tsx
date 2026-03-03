import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";
import type { ArmorSetData } from "@/lib/types/armour";

interface SetBonusCardProps {
  armourSet: ArmorSetData;
}

export default function SetBonusCard({ armourSet }: SetBonusCardProps) {
  if (!armourSet.groupBonus) return null;

  return (
    <Card className="mb-5 border-purple-400/30 bg-purple-950/10 py-3">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-2 text-purple-400 text-base">
          <Layers className="h-4 w-4" />
          Set Bonus Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {armourSet.groupBonus.ranks.map((rank) => (
            <div key={rank.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-purple-400 border-purple-400/50 px-2 py-0.5 text-xs">
                  {rank.pieces} Pieces
                </Badge>
                <div>
                  <div className="text-sm font-semibold">{armourSet.groupBonus?.skill.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{rank.skill.description}</div>
                </div>
              </div>
              <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                Lv {rank.skill.level}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
