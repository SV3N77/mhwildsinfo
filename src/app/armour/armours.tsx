"use server";

import Defense from "@/components/armour/defense";
import Pieces from "@/components/armour/pieces";
import Resistances from "@/components/armour/resistances";
import { ArmorSetData } from "@/lib/types/armour";
import Link from "next/link";

export default async function GetAllArmour() {
  const res = await fetch("https://wilds.mhdb.io/en/armor/sets");
  const data = (await res.json()) as ArmorSetData[];
  // Sort the armour by name
  const sortedDataArmour = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
  /* TODO: add images when API updates with images*/
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-4xl font-bold mb-5">Armor List</h1>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {sortedDataArmour.map((armour: ArmorSetData) => (
          <div key={armour.id} className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col">
            <div className="text-2xl font-semibold mb-2">{armour.name}</div>
            <Defense armour={armour} />
            <Resistances armour={armour} />
            <Pieces pieces={armour.pieces} />
            <Link href={`/armour/${armour.id}`} className="ml-auto text-sm">
              View more information
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
