import { weaponCategories, WeaponCategory } from "@/lib/types/weapon";
import { rarityColors } from "@/lib/utils/rarityColors";
import { Swords } from "lucide-react";
import { getAllWeapons } from "@/lib/actions";
import WeaponList from "./weaponList";

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

export const weaponIcons: Record<WeaponCategory, string> = {
  "great-sword": "/images/weapons/Great_Sword_Icon.webp",
  "sword-shield": "/images/weapons/Sword_and_Shield_Icon.webp",
  hammer: "/images/weapons/Hammer_Icon.webp",
  "long-sword": "/images/weapons/Long_Sword_Icon.webp",
  lance: "/images/weapons/Lance_Icon.webp",
  gunlance: "/images/weapons/Gunlance_Icon.webp",
  "dual-blades": "/images/weapons/Dual_Blades_Icon.webp",
  "switch-axe": "/images/weapons/Switch_Axe_Icon.webp",
  "charge-blade": "/images/weapons/Charge_Blade_Icon.webp",
  "insect-glaive": "/images/weapons/Insect_Glaive_Icon.webp",
  "hunting-horn": "/images/weapons/Hunting_Horn_Icon.webp",
  bow: "/images/weapons/Bow_Icon.webp",
  "light-bowgun": "/images/weapons/Light_Bowgun_Icon.webp",
  "heavy-bowgun": "/images/weapons/Heavy_Bowgun_Icon.webp",
};

export const elementColors: Record<string, string> = {
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
  const groupedWeapons = await getAllWeapons();

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
        <WeaponList
          groupedWeapons={groupedWeapons}
          weaponTypeNames={weaponTypeNames}
          weaponIcons={weaponIcons}
          elementColors={elementColors}
          rarityColors={rarityColors}
          weaponCategories={weaponCategories}
        />
      </section>
    </div>
  );
}
