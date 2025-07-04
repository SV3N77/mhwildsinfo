"use server";

import Defense from "@/components/armour/defense";
import Pieces from "@/components/armour/pieces";
import Resistances from "@/components/armour/resistances";
import { ArmorSetData } from "@/lib/types/armour";
import { calculateFullArmorSetCost } from "@/lib/utils/armourUtils";

export default async function ArmourSet({ id }: { id: string }) {
  const armourSetData = await fetch(`https://wilds.mhdb.io/en/armor/sets/${id}`);
  const armourSet = (await armourSetData.json()) as ArmorSetData;
  const totalCost = calculateFullArmorSetCost(armourSet);

  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-4xl font-bold mb-5">{armourSet.name}</h1>
      <section className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">Total Cost: {totalCost.totalZenny}</div>
          <div className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col gap-3">
            <Defense armour={armourSet} />
            <Resistances armour={armourSet} />
            <Pieces pieces={armourSet.pieces} />
          </div>
        </div>
      </section>
    </div>
  );
}
