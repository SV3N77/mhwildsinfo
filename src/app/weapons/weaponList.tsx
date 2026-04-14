"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { weaponCategories, WeaponCategory, GroupedWeapons } from "@/lib/types/weapon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createWeaponSlug } from "@/lib/utils/weaponUtils";
import { SharpnessBarVisual } from "@/components/sharpnessBar";
import { StaggerContainer, StaggerItem } from "@/components/animations";

interface WeaponListProps {
  groupedWeapons: GroupedWeapons;
  weaponTypeNames: Record<WeaponCategory, string>;
  weaponIcons: Record<WeaponCategory, string>;
  elementColors: Record<string, string>;
  rarityColors: Record<number, string>;
  weaponCategories: readonly WeaponCategory[];
}

export default function WeaponList({
  groupedWeapons,
  weaponTypeNames,
  weaponIcons,
  elementColors,
  rarityColors,
}: WeaponListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWeapons = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return groupedWeapons;

    const query = searchQuery.toLowerCase();
    const result: GroupedWeapons = {} as GroupedWeapons;

    for (const category of weaponCategories) {
      const weapons = groupedWeapons[category];
      if (!weapons) continue;

      const filtered = weapons.filter(
        (weapon) => weapon.name.toLowerCase().includes(query) || weapon.description?.toLowerCase().includes(query),
      );

      if (filtered.length > 0) {
        result[category] = filtered;
      }
    }

    return result;
  }, [groupedWeapons, searchQuery]);

  const totalFilteredWeapons = Object.values(filteredWeapons).reduce((acc, weapons) => acc + weapons.length, 0);

  return (
    <>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search weapons by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <Accordion type="multiple" defaultValue={[...weaponCategories]}>
        {weaponCategories.map((category) => {
          const weapons = filteredWeapons[category];
          if (!weapons || weapons.length === 0) return null;

          return (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="text-lg font-semibold hover:no-underline border border-border bg-card px-6 py-4 rounded-lg shadow-sm hover:shadow-md hover:bg-accent/50 transition-all">
                <div className="flex items-center gap-3">
                  <img src={weaponIcons[category]} alt={weaponTypeNames[category]} className="w-8 h-8" />
                  <span>{weaponTypeNames[category]}</span>
                  <span className="text-sm text-muted-foreground font-normal">({weapons.length} weapons)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {weapons
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((weapon) => (
                      <StaggerItem key={weapon.id}>
                        <Link href={`/weapons/${createWeaponSlug(weapon.name)}`}>
                          <div className="group relative overflow-hidden rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-lg hover:border-primary/30">
                          <div className="mb-4">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-lg leading-tight flex-1 group-hover:text-primary transition-colors">{weapon.name}</h3>
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${rarityColors[weapon.rarity] || rarityColors[10]}`}
                              >
                                R{weapon.rarity}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Attack</p>
                              <p className="font-bold text-base">{weapon.damage.display}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Affinity</p>
                              <p className={`font-bold text-base ${weapon.affinity >= 0 ? "text-green-600" : "text-red-500"}`}>
                                {weapon.affinity > 0 ? "+" : ""}
                                {weapon.affinity}%
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t space-y-2">
                            {weapon.sharpness && (
                              <div className="mb-3">
                                <p className="text-xs text-muted-foreground mb-2">Sharpness</p>
                                <SharpnessBarVisual sharpness={weapon.sharpness} />
                              </div>
                            )}

                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                              {weapon.specials && weapon.specials.length > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <span className={`font-medium ${elementColors[weapon.specials[0].element] || "text-gray-600"}`}>
                                    {weapon.specials[0].element}
                                  </span>
                                  <span className="text-muted-foreground">{weapon.specials[0].damage.display}</span>
                                </div>
                              )}

                              {weapon.defenseBonus > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <span className="font-medium text-blue-600">Defense</span>
                                  <span className="text-muted-foreground">+{weapon.defenseBonus}</span>
                                </div>
                              )}

                              {weapon.slots && weapon.slots.length > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <span className="font-medium text-muted-foreground">Slots</span>
                                  <div className="flex gap-0.5">
                                    {weapon.slots.map((slot, idx) => (
                                      <div
                                        key={idx}
                                        className="w-4 h-4 rounded-full bg-blue-700 border border-blue-900 text-white text-xs flex items-center justify-center"
                                      >
                                        {slot}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                         </div>
                       </Link>
                     </StaggerItem>
                   ))}
                 </StaggerContainer>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {totalFilteredWeapons === 0 && searchQuery.length >= 2 && (
        <p className="text-center text-muted-foreground py-10">No weapons found matching your search.</p>
      )}
    </>
  );
}
