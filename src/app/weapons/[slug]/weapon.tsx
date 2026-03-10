import { WeaponData } from "@/lib/types/weapon";
import { rarityColors } from "@/lib/utils/rarityColors";
import { elementColors, weaponIcons } from "../weapons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Flame, Droplets, Snowflake, Wind, Ghost, Star, Crown, ArrowRight, ArrowLeft } from "lucide-react";
import SharpnessBar from "@/components/sharpnessBar";
import { createWeaponSlug } from "@/lib/utils/weaponUtils";
import Link from "next/link";

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

export default function WeaponPage({ weapon }: WeaponPageProps) {
  if (!weapon) {
    return (
      <div className="flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Weapon Not Found</h1>
        <p className="text-muted-foreground">The weapon you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <img src={weaponIcons[weapon.kind as keyof typeof weaponIcons]} alt={weapon.kind} className="w-12 h-12" />
          <h1 className="text-4xl font-bold">{weapon.name}</h1>
        </div>
        <p className="text-muted-foreground">{weapon.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="py-4">
            <CardHeader>
              <CardTitle>Base Statistics</CardTitle>
            </CardHeader>
            <CardContent className="-mt-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Attack</p>
                  <p className="text-2xl font-bold">{weapon.damage.display}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Affinity</p>
                  <p className={`text-2xl font-bold ${weapon.affinity >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {weapon.affinity > 0 ? "+" : ""}
                    {weapon.affinity}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Rarity</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-muted ${rarityColors[weapon.rarity] || rarityColors[10]}`}
                  >
                    R{weapon.rarity}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Type</p>
                  <p className="text-lg font-semibold capitalize">{weapon.kind.replace(/-/g, " ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {weapon.sharpness && (
            <Card>
              <CardContent className="py-6">
                <SharpnessBar sharpness={weapon.sharpness} handicraft={weapon.handicraft || undefined} />
              </CardContent>
            </Card>
          )}
          {weapon.specials && weapon.specials.length > 0 && (
            <Card className="py-3">
              <CardHeader>
                <CardTitle>Elemental & Status Effects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {weapon.specials.map((special, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {elementIcons[special.element]}
                      <span className={`capitalize font-medium ${elementColors[special.element] || "text-gray-600"}`}>
                        {special.element}
                      </span>
                      <span className="text-sm text-muted-foreground">({special.kind})</span>
                    </div>
                    <span className="font-bold">{special.damage.display}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {weapon.skills && weapon.skills.length > 0 && (
            <Card className="py-3">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weapon.skills.map((skillInfo, idx) => (
                  <div key={idx} className="p-5 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-base">{skillInfo.skill.name}</h4>
                      <span className="text-sm text-muted-foreground">Level {skillInfo.level}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{skillInfo.skill.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {weapon.crafting.craftable &&
            (weapon.crafting.craftingMaterials.length > 0 || weapon.crafting.upgradeMaterials.length > 0) && (
              <Card className="py-3">
                <CardHeader>
                  <CardTitle>Crafting Materials & Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  {weapon.crafting.craftingMaterials.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-3">Craft (From Scratch)</p>
                      <div className="space-y-3">
                        {weapon.crafting.craftingMaterials.map((material, idx) => (
                          <div key={idx} className="flex justify-between items-center py-2">
                            <span className="flex-1">{material.item.name}</span>
                            <span className="font-semibold">x{material.quantity}</span>
                          </div>
                        ))}
                      </div>
                      {weapon.crafting.craftingZennyCost && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Zenny Cost</span>
                            <span className="font-semibold text-lg">{weapon.crafting.craftingZennyCost}z</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {weapon.crafting.upgradeMaterials.length > 0 && weapon.crafting.previous && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">Upgrade (From Previous)</p>
                      <div className="space-y-3">
                        {weapon.crafting.upgradeMaterials.map((material, idx) => (
                          <div key={idx} className="flex justify-between items-center py-2">
                            <span className="flex-1">{material.item.name}</span>
                            <span className="font-semibold">x{material.quantity}</span>
                          </div>
                        ))}
                      </div>
                      {weapon.crafting.upgradeZennyCost && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Zenny Cost</span>
                            <span className="font-semibold text-lg">{weapon.crafting.upgradeZennyCost}z</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
        </div>

        <div className="space-y-6">
          {weapon.slots && weapon.slots.length > 0 && (
            <Card className="py-3">
              <CardHeader>
                <CardTitle>Decoration Slots</CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="flex flex-wrap gap-3">
                  {weapon.slots.map((slot, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 bg-blue-700 border border-blue-900 text-white flex items-center justify-center rotate-45 relative"
                    >
                      <span className="absolute -rotate-45 font-semibold">{slot}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="py-3">
            <CardHeader>
              <CardTitle>Upgrade Path</CardTitle>
            </CardHeader>
            <CardContent>
              {weapon.crafting.previous && (
                <div className="pb-4 border-b">
                  <p className="text-sm text-muted-foreground mb-2">Previous Weapon</p>

                  <Link
                    href={`/weapons/${createWeaponSlug(weapon.crafting.previous.name)}`}
                    className="font-medium text-primary hover:underline flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {weapon.crafting.previous.name}
                  </Link>
                </div>
              )}
              {weapon.crafting.branches.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3 pt-4">Branches To</p>
                  <div className="space-y-2">
                    {weapon.crafting.branches.map((branch, idx) => (
                      <Link
                        key={idx}
                        href={`/weapons/${createWeaponSlug(branch.name)}`}
                        className="font-medium text-primary hover:underline flex items-center gap-2 py-1"
                      >
                        {branch.name}
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {!weapon.crafting.previous && weapon.crafting.branches.length === 0 && (
                <p className="text-muted-foreground py-4">No upgrade path information available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
