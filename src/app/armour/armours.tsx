"use server";

import ClientArmorList from "@/components/armour/clientArmorList";
import { ArmorSetData } from "@/lib/types/armour";
import { Shield } from "lucide-react";

export default async function GetAllArmour() {
  const res = await fetch("https://wilds.mhdb.io/en/armor/sets", { cache: "no-store" });
  const data = (await res.json()) as ArmorSetData[];
  const sortedDataArmour = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">Armor Sets</h1>
        </div>
        <p className="text-muted-foreground">Browse all armor sets with their defense stats, resistances, and pieces</p>
      </div>
      <ClientArmorList armourList={sortedDataArmour} />
    </div>
  );
}
