"use server";

import { Monster } from "@/lib/types/monsters";
import { getMonsterById } from "@/lib/actions";

export default async function MonsterPage({ id }: { id: string }) {
  const monsterInfo = await getMonsterById(id);
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-4xl font-bold mb-5">{monsterInfo.name}</h1>
    </div>
  );
}
