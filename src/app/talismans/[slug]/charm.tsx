"use client";

import Link from "next/link";
import { CharmData } from "@/lib/types/talismans";
import { rarityColors } from "@/lib/utils/rarityColors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scroll, ArrowRight, Coins, Package, ArrowLeft } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";

interface CharmPageProps {
  charm: CharmData;
}

export default function CharmPage({ charm }: CharmPageProps) {
  const charmName = charm.ranks[0]?.name.replace(/ I$| II$| III$| IV$| V$/, "") || "Charm";

  return (
    <div className="flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
      <FadeIn>
        <Link href="/talismans">
          <Button variant="ghost" className="gap-2 mb-6 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Charms
          </Button>
        </Link>
      </FadeIn>

      <FadeIn delay={0.05} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Scroll className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">{charmName}</h1>
        </div>
        <p className="text-muted-foreground">{charm.ranks[0]?.description || "A charm with various upgrade ranks"}</p>
      </FadeIn>

      <StaggerContainer className="space-y-6">
        {charm.ranks.map((rank, index) => (
          <StaggerItem key={rank.id}>
            <Card className="transition-all hover:border-primary/50 hover:shadow-lg py-5">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{rank.name}</CardTitle>
                    <Badge
                      variant="secondary"
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 bg-muted ${rarityColors[rank.rarity] || rarityColors[10]}`}
                    >
                      R{rank.rarity}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{rank.description}</p>
                </div>
                {index < charm.ranks.length - 1 && (
                  <div className="flex items-center justify-center text-primary">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {rank.skills && rank.skills.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Skills</h3>
                  <div className="space-y-2">
                    {rank.skills.map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <div>
                          <div className="font-medium">{skill.skill.name}</div>
                          <div className="text-sm text-muted-foreground">{skill.description}</div>
                        </div>
                        <Badge className="font-semibold">Lv. {skill.level}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rank.crafting && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-lg">Crafting</h3>
                    {rank.crafting.craftable !== undefined && (
                      <Badge variant={rank.crafting.craftable ? "default" : "secondary"}>
                        {rank.crafting.craftable ? "Craftable" : "Upgradable"}
                      </Badge>
                    )}
                  </div>

                  {rank.crafting.zennyCost !== undefined && rank.crafting.zennyCost > 0 && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 mb-3">
                      <Coins className="h-5 w-5 text-amber-500" />
                      <span className="font-medium">z{rank.crafting.zennyCost.toLocaleString()}</span>
                    </div>
                  )}

                  {rank.crafting.materials && rank.crafting.materials.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Materials</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {rank.crafting.materials.map((material) => (
                          <div key={material.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">{material.item?.name}</div>
                              <Badge variant="secondary" className="text-xs mt-1">
                                x{material.quantity}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!rank.crafting.craftable && rank.crafting.materials?.length === 0 && (
                    <p className="text-muted-foreground">This rank must be upgraded from the previous rank.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
