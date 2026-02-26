"use server";

import { Monster } from "@/lib/types/monsters";
import { getMonsterBySlug } from "@/lib/actions/monsters";

export default async function MonsterPage({ slug }: { slug: string }) {
  const monsterInfo = await getMonsterBySlug(slug);
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-4xl font-bold mb-5">{monsterInfo.name}</h1>
    </div>
  );
}
