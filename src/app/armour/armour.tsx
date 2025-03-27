"use server";

import { ArmourSetData } from "@/lib/armour";

export default async function GetAllArmour() {
  const res = await fetch("https://wilds.mhdb.io/en/armor/sets");
  const data = (await res.json()) as ArmourSetData[];
  const sortedDataArmour = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));

  return (
    <div>
      <h1 className="text-2xl font-bold">Armor List</h1>
      <ul>
        {sortedDataArmour.map((armor: ArmourSetData) => (
          <li key={armor.id} className="p-2 border-b">
            {armor.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
