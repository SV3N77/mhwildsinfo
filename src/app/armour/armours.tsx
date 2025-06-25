"use server";

import ClientArmorList from "@/components/armour/clientArmorList";
import { ArmorSetData } from "@/lib/types/armour";

export default async function GetAllArmour() {
  const res = await fetch("https://wilds.mhdb.io/en/armor/sets");
  const data = (await res.json()) as ArmorSetData[];
  // Sort the armour by name
  const sortedDataArmour = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
  /* TODO: add images when API updates with images*/
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-4xl font-bold mb-5">Armor List</h1>
      <ClientArmorList armourList={sortedDataArmour} />
    </div>
  );
}
