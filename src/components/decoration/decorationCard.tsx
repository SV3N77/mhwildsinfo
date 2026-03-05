"use client";

import { DecorationData } from "@/lib/types/decoration";
import { Card, CardContent } from "@/components/ui/card";
import { rarityColors } from "@/lib/utils/rarityColors";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";

interface DecorationCardProps {
  decoration: DecorationData;
}

export function DecorationCard({ decoration }: DecorationCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-base leading-tight mb-1">{decoration.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{capitalizeFirstLetter(decoration.kind)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="relative inline-block w-3 h-3">
                  <span className="absolute inset-0 bg-blue-700 border border-blue-900 rotate-45"></span>
                  <span className="absolute inset-0 text-[10px] flex items-center justify-center -rotate-45">
                    {decoration.slot}
                  </span>
                </span>
                <span>Slot</span>
              </span>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 bg-muted ${rarityColors[decoration.rarity] || rarityColors[10]}`}
          >
            R{decoration.rarity}
          </Badge>
        </div>

        {decoration.skills && decoration.skills.length > 0 && (
          <div className="mb-3 space-y-1">
            {decoration.skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between text-sm">
                <span className="font-medium">{skill.skill.name}</span>
                <Badge variant="outline" className="text-xs">
                  Lv.{skill.level}
                </Badge>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground line-clamp-2">{decoration.description}</p>
      </CardContent>
    </Card>
  );
}
