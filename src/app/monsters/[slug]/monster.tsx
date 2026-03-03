"use client";

import { Monster } from "@/lib/types/monsters";
import MonsterHeader from "@/components/monsters/monsterHeader";
import MonsterBasicInfo from "@/components/monsters/monsterBasicInfo";
import MonsterSize from "@/components/monsters/monsterSize";
import MonsterLocations from "@/components/monsters/monsterLocations";
import MonsterWeaknesses from "@/components/monsters/monsterWeaknesses";
import MonsterResistances from "@/components/monsters/monsterResistances";
import MonsterParts from "@/components/monsters/monsterParts";
import MonsterRewards from "@/components/monsters/monsterRewards";

interface MonsterPageProps {
  monsterInfo: Monster;
}

export default function MonsterPage({ monsterInfo }: MonsterPageProps) {
  return (
    <div className="flex flex-col px-20 py-10 max-w-7xl mx-auto">
      <MonsterHeader name={monsterInfo.name} description={monsterInfo.description} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonsterBasicInfo monster={monsterInfo} />
        <MonsterSize size={monsterInfo.size} />
        <MonsterLocations locations={monsterInfo.locations} />
        <MonsterWeaknesses weaknesses={monsterInfo.weaknesses} />
        <MonsterResistances resistances={monsterInfo.resistances} />
        <MonsterParts parts={monsterInfo.parts} />
        <MonsterRewards rewards={monsterInfo.rewards} />
      </div>
    </div>
  );
}
