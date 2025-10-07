"use server";

import { Monster } from "@/lib/types/monsters";

export default async function MonsterPage({ id }: { id: string }) {
  const monsterData = await fetch(`https://wilds.mhdb.io/en/monsters/${id}`);
  const monsterInfo = (await monsterData.json()) as Monster;
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-4xl font-bold mb-5">{monsterInfo.name}</h1>
    </div>
  );
}
