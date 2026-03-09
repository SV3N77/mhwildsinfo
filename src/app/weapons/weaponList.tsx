"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { weaponCategories, WeaponCategory, GroupedWeapons } from "@/lib/types/weapon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createWeaponSlug } from "@/lib/utils/weaponUtils";
import { SharpnessBarVisual } from "@/components/sharpnessBar";

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
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <img src={weaponIcons[category]} alt={weaponTypeNames[category]} className="w-8 h-8" />
                  <span>{weaponTypeNames[category]}</span>
                  <span className="text-sm text-muted-foreground font-normal">({weapons.length} weapons)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {weapons
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((weapon) => (
                      <Link href={`/weapons/${createWeaponSlug(weapon.name)}`} key={weapon.id}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <h3 className="font-semibold text-base leading-tight flex-1">{weapon.name}</h3>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 bg-muted ${rarityColors[weapon.rarity] || rarityColors[10]}`}
                              >
                                R{weapon.rarity}
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Attack</span>
                                <span className="font-semibold">{weapon.damage.display}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Affinity</span>
                                <span
                                  className={`font-semibold ${weapon.affinity >= 0 ? "text-green-600" : "text-red-500"}`}
                                >
                                  {weapon.affinity > 0 ? "+" : ""}
                                  {weapon.affinity}%
                                </span>
                              </div>
                              {weapon.defenseBonus > 0 && (
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">Defense</span>
                                  <span className="font-semibold text-blue-600">+{weapon.defenseBonus}</span>
                                </div>
                              )}
                              {weapon.slots && weapon.slots.length > 0 && (
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">Decoration Jewels</span>
                                  <div className="flex gap-1">
                                    {weapon.slots.map((slot, idx) => (
                                      <span
                                        key={idx}
                                        className="relative w-4 h-4 bg-blue-700 border border-blue-900 text-xs flex items-center justify-center rotate-45"
                                      >
                                        <span className="absolute -rotate-45">{slot}</span>
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {weapon.specials && weapon.specials.length > 0 && (
                                <div className="pt-2 border-t mt-2">
                                  {weapon.specials.map((special, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                      <span
                                        className={`capitalize font-medium ${elementColors[special.element] || "text-gray-600"}`}
                                      >
                                        {special.element}
                                      </span>
                                      <span className="text-muted-foreground">{special.damage.display}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {weapon.sharpness && (
                                <div className="pt-2 border-t mt-2">
                                  <SharpnessBarVisual sharpness={weapon.sharpness} />
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
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
