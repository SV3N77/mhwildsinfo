"use server";

import { ArmourSetData } from "@/lib/types/armour";

export default async function ArmourSet({ id }: { id: string }) {
  const armourSetData = await fetch(`https://wilds.mhdb.io/en/armor/sets/${id}`);
  const armourSet = (await armourSetData.json()) as ArmourSetData;
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-4xl font-bold mb-5">{armourSet.name}</h1>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-4"></div>
      </section>
    </div>
  );
}
