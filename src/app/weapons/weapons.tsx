"use server";

import { weaponCategories, WeaponCategory } from "@/lib/types/weapon";
import { groupWeaponsByType } from "@/lib/utils/weaponUtils";
import { rarityColors } from "@/lib/utils/rarityColors";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Swords } from "lucide-react";

const weaponTypeNames: Record<WeaponCategory, string> = {
  "great-sword": "Great Sword",
  "sword-shield": "Sword and Shield",
  hammer: "Hammer",
  "long-sword": "Long Sword",
  lance: "Lance",
  gunlance: "Gunlance",
  "dual-blades": "Dual Blades",
  "switch-axe": "Switch Axe",
  "charge-blade": "Charge Blade",
  "insect-glaive": "Insect Glaive",
  "hunting-horn": "Hunting Horn",
  bow: "Bow",
  "light-bowgun": "Light Bowgun",
  "heavy-bowgun": "Heavy Bowgun",
};

const elementColors: Record<string, string> = {
  fire: "text-red-500",
  water: "text-blue-500",
  thunder: "text-yellow-500",
  ice: "text-cyan-400",
  dragon: "text-purple-500",
  poison: "text-green-600",
  paralysis: "text-yellow-300",
  sleep: "text-indigo-400",
  blast: "text-orange-400",
  stun: "text-yellow-200",
};

export default async function GetAllWeapons() {
  const res = await fetch("https://wilds.mhdb.io/en/weapons");
  const data = await res.json();
  const groupedWeapons = groupWeaponsByType(data);

  return (
    <div className="flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Swords className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">Weapons</h1>
        </div>
        <p className="text-muted-foreground">
          Browse all weapons with their attack, affinity, rarity, and special properties
        </p>
      </div>

      <section>
        <Accordion type="multiple" defaultValue={[...weaponCategories]}>
          {weaponCategories.map((category) => {
            const weapons = groupedWeapons[category];
            if (!weapons || weapons.length === 0) return null;

            return (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span>{weaponTypeNames[category]}</span>
                    <span className="text-sm text-muted-foreground font-normal">({weapons.length} weapons)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {weapons
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((weapon) => (
                        <Card key={weapon.id}>
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
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </div>
  );
}
