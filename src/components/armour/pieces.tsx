import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { rarityColors } from "@/lib/utils/rarityColors";
import type { ArmorPiece, ArmorSetData } from "@/lib/types/armour";

interface PiecesProps {
  pieces: ArmorPiece[];
  armourSet?: ArmorSetData;
  variant?: "card" | "list";
}

export default function Pieces({ pieces, variant }: PiecesProps) {
  if (variant === "list") {
    return (
      <div className="space-y-2">
        <div className="text-sm font-semibold text-muted-foreground">Pieces</div>
        <div className="space-y-1">
          {pieces.map((piece: ArmorPiece) => (
            <div
              key={piece.id}
              className="flex items-center justify-between text-sm py-1 rounded hover:bg-secondary/50 transition-colors"
            >
              <span className="text-muted-foreground flex">{piece.name}</span>
              <span className={`font-bold ${rarityColors[piece.rarity] || "text-foreground"}`}>{piece.rarity}★</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="border-2 py-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="h-4 w-4" />
          Armour Pieces
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pieces.map((piece) => (
            <div key={piece.id} className="p-4 rounded-lg border bg-card hover:bg-card/80 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{piece.name}</h3>
                  <p className="text-sm text-muted-foreground">{piece.description}</p>
                </div>
                <Badge variant="nobg" className={`text-base font-semibold ${rarityColors[piece.rarity]}`}>
                  {piece.rarity}★
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Defense</div>
                  <div className="text-sm font-semibold">
                    {piece.defense.base} / {piece.defense.max}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Slots</div>
                  <div className="text-sm font-semibold">
                    {piece.slots.length > 0 ? piece.slots.map((s) => `Lvl ${s}`).join(", ") : "None"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Type</div>
                  <div className="text-sm font-semibold capitalize">{piece.kind}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Rank</div>
                  <div className="text-sm font-semibold capitalize">{piece.rank}</div>
                </div>
              </div>

              {piece.skills && piece.skills.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {piece.skills.map((skill) => (
                      <Badge key={skill.id} variant="secondary" className="px-2 py-0.5 text-xs">
                        {skill.skill.name} Lv {skill.level}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {piece.crafting && piece.crafting.materials && piece.crafting.materials.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                    Materials ({piece.crafting.zennyCost.toLocaleString()}z)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {piece.crafting.materials.map((material) => (
                      <Badge key={material.id} variant="outline" className="text-xs px-2 py-0.5">
                        {material.item.name} ×{material.quantity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
