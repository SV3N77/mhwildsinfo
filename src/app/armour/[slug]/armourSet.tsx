"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Package, Coins, Layers } from "lucide-react";
import { calculateFullArmorSetCost } from "@/lib/utils/armourUtils";
import { notFound } from "next/navigation";
import { getArmourSetBySlug } from "@/lib/actions";
import { calculateTotalBaseDefense, calculateTotalResistances } from "@/lib/utils/armourUtils";
import { rarityColors } from "@/lib/utils/rarityColors";

export default async function ArmourSet({ slug }: { slug: string }) {
  const armourSet = await getArmourSetBySlug(slug);

  if (!armourSet) {
    notFound();
  }

  const totalCost = calculateFullArmorSetCost(armourSet);
  const totalDefense = calculateTotalBaseDefense(armourSet);
  const totalResistances = calculateTotalResistances(armourSet);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{armourSet.name}</h1>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1">
              {armourSet.pieces.length} Pieces
            </Badge>
            {armourSet.groupBonus && (
              <Badge variant="secondary" className="text-purple-400 border-purple-400/50 px-3 py-1">
                Set Bonus Available
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 py-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4" />
                Defense
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalDefense}</div>
              <p className="text-sm text-muted-foreground mt-1">Base Defense</p>
            </CardContent>
          </Card>

          <Card className="border-2 py-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4" />
                Resistances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: "Fire", value: totalResistances.fire, color: "text-orange-400" },
                  { label: "Water", value: totalResistances.water, color: "text-blue-400" },
                  { label: "Ice", value: totalResistances.ice, color: "text-cyan-300" },
                  { label: "Thunder", value: totalResistances.thunder, color: "text-yellow-400" },
                  { label: "Dragon", value: totalResistances.dragon, color: "text-purple-400" },
                ].map((res) => (
                  <div key={res.label} className="text-center">
                    <div className={`text-xl font-bold ${res.color}`}>
                      {res.value > 0 ? `+${res.value}` : res.value}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      {res.label.slice(0, 3)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 py-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Coins className="h-4 w-4" />
                Crafting Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCost.totalZenny.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">Zenny</p>
            </CardContent>
          </Card>
        </div>

        {armourSet.groupBonus && (
          <Card className="mb-8 border-purple-400/30 bg-purple-950/10 py-3">
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
        )}

        <Card className="border-2 py-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4" />
              Armour Pieces
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {armourSet.pieces.map((piece) => (
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

        {totalCost.totalMaterials.length > 0 && (
          <Card className="mt-8 border-2 py-3">
            <CardHeader className="">
              <CardTitle className="flex items-center gap-2 text-base">
                <Package className="h-4 w-4" />
                Total Materials Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {totalCost.totalMaterials.map((material) => (
                  <Badge key={material.item.id} variant="outline" className="text-xs px-3 py-1">
                    {material.item.name} ×{material.quantity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
