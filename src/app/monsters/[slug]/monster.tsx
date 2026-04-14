"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Monster } from "@/lib/types/monsters";
import MonsterHeader from "@/components/monsters/monsterHeader";
import MonsterBasicInfo from "@/components/monsters/monsterBasicInfo";
import MonsterSize from "@/components/monsters/monsterSize";
import MonsterLocations from "@/components/monsters/monsterLocations";
import MonsterWeaknesses from "@/components/monsters/monsterWeaknesses";
import MonsterResistances from "@/components/monsters/monsterResistances";
import MonsterParts from "@/components/monsters/monsterParts";
import MonsterRewards from "@/components/monsters/monsterRewards";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";

interface MonsterPageProps {
  monsterInfo: Monster;
}

export default function MonsterPage({ monsterInfo }: MonsterPageProps) {
  return (
    <div className="flex flex-col px-20 py-10 max-w-7xl mx-auto">
      <FadeIn>
        <Link href="/monsters">
          <Button variant="ghost" className="gap-2 mb-6 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Monsters
          </Button>
        </Link>
      </FadeIn>

      <FadeIn delay={0.05}>
        <MonsterHeader name={monsterInfo.name} description={monsterInfo.description} />
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StaggerItem><MonsterBasicInfo monster={monsterInfo} /></StaggerItem>
        <StaggerItem><MonsterSize size={monsterInfo.size} /></StaggerItem>
        <StaggerItem className="lg:col-span-2"><MonsterLocations locations={monsterInfo.locations} /></StaggerItem>
        <StaggerItem className="lg:col-span-2"><MonsterWeaknesses weaknesses={monsterInfo.weaknesses} /></StaggerItem>
        <StaggerItem className="lg:col-span-2"><MonsterResistances resistances={monsterInfo.resistances} /></StaggerItem>
        <StaggerItem className="lg:col-span-2"><MonsterParts parts={monsterInfo.parts} /></StaggerItem>
        <StaggerItem className="lg:col-span-2"><MonsterRewards rewards={monsterInfo.rewards} /></StaggerItem>
      </StaggerContainer>
    </div>
  );
}
