"use client";

import { WeaponData } from "@/lib/types/weapon";
import { rarityColors } from "@/lib/utils/rarityColors";
import { elementColors, weaponIcons } from "../weapons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Flame, Droplets, Snowflake, Wind, Ghost, Star, Crown, ArrowRight, ArrowLeft } from "lucide-react";
import SharpnessBar from "@/components/sharpnessBar";
import { createWeaponSlug } from "@/lib/utils/weaponUtils";
import Link from "next/link";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";

interface WeaponPageProps {
  weapon: WeaponData | null;
}

const elementIcons: Record<string, React.ReactNode> = {
  fire: <Flame className="w-4 h-4" />,
  water: <Droplets className="w-4 h-4" />,
  thunder: <Zap className="w-4 h-4" />,
  ice: <Snowflake className="w-4 h-4" />,
  dragon: <Crown className="w-4 h-4" />,
  poison: <Ghost className="w-4 h-4" />,
  paralysis: <Wind className="w-4 h-4" />,
  sleep: <Star className="w-4 h-4" />,
  blast: <Star className="w-4 h-4" />,
  stun: <Wind className="w-4 h-4" />,
};

function SlotIcon({ slot }: { slot: number }) {
  return (
    <div className="w-5 h-5 bg-blue-700 border border-blue-900 text-white flex items-center justify-center rotate-45 relative">
      <span className="absolute -rotate-45 font-semibold text-xs">{slot}</span>
    </div>
  );
}

export default function WeaponPage({ weapon }: WeaponPageProps) {
  if (!weapon) {
    return (
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <h1 className="text-2xl font-bold mb-4">Weapon Not Found</h1>
        <p className="text-muted-foreground">The weapon you're looking for doesn't exist.</p>
      </div>
    );
  }

  const hasSpecials = weapon.specials && weapon.specials.length > 0;
  const hasSkills = weapon.skills && weapon.skills.length > 0;

  return (
    <div className="bg-linear-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <FadeIn>
          <Link href="/weapons">
            <Button variant="ghost" className="gap-2 mb-6 pl-0">
              <ArrowLeft className="h-4 w-4" />
              Back to Weapons
            </Button>
          </Link>
        </FadeIn>

        <FadeIn delay={0.05} className="mb-8">
          <div className="flex items-start gap-4 mb-3">
            <img
              src={weaponIcons[weapon.kind as keyof typeof weaponIcons]}
              alt={weapon.kind}
              className="w-12 h-12 mt-0.5"
            />
            <div>
              <h1 className="text-3xl font-bold">{weapon.name}</h1>
              <p className="text-muted-foreground mt-1">{weapon.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg">
              <span className="text-sm text-muted-foreground">Attack</span>
              <span className="font-bold">{weapon.damage.display}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg">
              <span className="text-sm text-muted-foreground">Affinity</span>
              <span className={`font-bold ${weapon.affinity >= 0 ? "text-green-600" : "text-red-500"}`}>
                {weapon.affinity > 0 ? "+" : ""}
                {weapon.affinity}%
              </span>
            </div>
            <span
              className={`px-2.5 py-1.5 rounded-lg text-sm font-semibold bg-muted ${rarityColors[weapon.rarity] || rarityColors[10]}`}
            >
              R{weapon.rarity}
            </span>
            <span className="px-2.5 py-1.5 rounded-lg text-sm font-medium bg-muted capitalize">
              {weapon.kind.replace(/-/g, " ")}
            </span>
            {weapon.slots && weapon.slots.length > 0 && (
              <div className="flex items-center gap-1.5 ml-1">
                {weapon.slots.map((slot, idx) => (
                  <SlotIcon key={idx} slot={slot} />
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
          {weapon.sharpness && (
            <StaggerItem>
              <Card className="h-full gap-0 py-5">
                <CardHeader className="pb-0">
                  <CardTitle className="text-base">Sharpness</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-center">
                  <SharpnessBar sharpness={weapon.sharpness} handicraft={weapon.handicraft || undefined} />
                </CardContent>
              </Card>
            </StaggerItem>
          )}
          <StaggerItem>
            <Card className="h-full gap-3 py-5">
              <CardHeader className="pb-0">
                <CardTitle className="text-base">Crafting Materials</CardTitle>
              </CardHeader>
              <CardContent>
                {weapon.crafting.craftingMaterials && weapon.crafting.craftingMaterials.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Craft (From Scratch)</p>
                    <div className="space-y-1.5">
                      {weapon.crafting.craftingMaterials.map((material, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-sm">{material.item.name}</span>
                          <span className="text-sm font-semibold">x{material.quantity}</span>
                        </div>
                      ))}
                    </div>
                    {(weapon.crafting.craftingZennyCost ?? 0) > 0 && (
                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <span className="text-sm text-muted-foreground">Zenny Cost</span>
                        <span className="font-semibold">{weapon.crafting.craftingZennyCost}z</span>
                      </div>
                    )}
                  </div>
                )}
                {weapon.crafting.upgradeMaterials && weapon.crafting.upgradeMaterials.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                      Upgrade (From Previous)
                    </p>
                    <div className="space-y-1.5">
                      {weapon.crafting.upgradeMaterials.map((material, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-sm">{material.item.name}</span>
                          <span className="text-sm font-semibold">x{material.quantity}</span>
                        </div>
                      ))}
                    </div>
                    {(weapon.crafting.upgradeZennyCost ?? 0) > 0 && (
                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <span className="text-sm text-muted-foreground">Zenny Cost</span>
                        <span className="font-semibold">{weapon.crafting.upgradeZennyCost}z</span>
                      </div>
                    )}
                  </div>
                )}
                {(!weapon.crafting.craftingMaterials || weapon.crafting.craftingMaterials.length === 0) &&
                  (!weapon.crafting.upgradeMaterials || weapon.crafting.upgradeMaterials.length === 0) && (
                    <p className="text-sm text-muted-foreground">No crafting materials available</p>
                  )}
              </CardContent>
            </Card>
          </StaggerItem>

          {hasSpecials && (
            <StaggerItem>
              <Card className="h-full gap-3 py-5">
                <CardHeader className="pb-0">
                  <CardTitle className="text-base">Elemental & Status Effects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {weapon.specials!.map((special, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        {elementIcons[special.element]}
                        <span className={`capitalize font-medium ${elementColors[special.element] || "text-gray-600"}`}>
                          {special.element}
                        </span>
                        <span className="text-xs text-muted-foreground">({special.kind})</span>
                      </div>
                      <span className="font-bold">{special.damage.display}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </StaggerItem>
          )}

          <StaggerItem>
            <Card className="h-full gap-3 py-5">
              <CardHeader className="pb-0">
                <CardTitle className="text-base">Upgrade Path</CardTitle>
              </CardHeader>
              <CardContent>
                {weapon.crafting.previous && (
                  <div className="pb-3 border-b">
                    <Link
                      href={`/weapons/${createWeaponSlug(weapon.crafting.previous.name)}`}
                      className="text-sm font-medium text-primary hover:underline flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      {weapon.crafting.previous.name}
                    </Link>
                  </div>
                )}
                {weapon.crafting.branches.length > 0 && (
                  <div className={weapon.crafting.previous ? "pt-3" : ""}>
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Branches To</p>
                    <div className="space-y-1.5">
                      {weapon.crafting.branches.map((branch, idx) => (
                        <Link
                          key={idx}
                          href={`/weapons/${createWeaponSlug(branch.name)}`}
                          className="text-sm font-medium text-primary hover:underline flex items-center gap-1.5"
                        >
                          {branch.name}
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {!weapon.crafting.previous && weapon.crafting.branches.length === 0 && (
                  <p className="text-sm text-muted-foreground">No upgrade path available</p>
                )}
              </CardContent>
            </Card>
          </StaggerItem>

          {hasSkills && (
            <StaggerItem className={!hasSpecials ? "lg:col-span-2" : ""}>
              <Card className={hasSkills ? "h-full gap-3 py-5" : ""}>
                <CardHeader className="pb-0">
                  <CardTitle className="text-base">Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {weapon.skills!.map((skillInfo, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="font-medium">{skillInfo.skill.name}</span>
                      <span className="text-sm text-muted-foreground">Lv {skillInfo.level}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </div>
  );
}
