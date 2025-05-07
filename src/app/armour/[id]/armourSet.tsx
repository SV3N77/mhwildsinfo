"use server";

import { ArmourSetData } from "@/lib/types/armour";

export default async function ArmourSet({ id }: { id: string }) {
  const armourSetData = await fetch(`https://wilds.mhdb.io/en/armor/sets/${id}`);
  const data = (await armourSetData.json()) as ArmourSetData;
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-4xl font-bold mb-5">{data.name}</h1>
    </div>
  );
}
