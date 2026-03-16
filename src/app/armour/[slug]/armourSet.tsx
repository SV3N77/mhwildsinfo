"use server";

import { Badge } from "@/components/ui/badge";
import { calculateFullArmorSetCost } from "@/lib/utils/armourUtils";
import { notFound } from "next/navigation";
import { getArmourSetBySlug } from "@/lib/actions";
import Defense from "@/components/armour/defense";
import Resistances from "@/components/armour/resistances";
import SetBonusCard from "@/components/armour/setBonusCard";
import Pieces from "@/components/armour/pieces";
import TotalMaterialsCard from "@/components/armour/totalMaterialsCard";

export default async function ArmourSet({ slug }: { slug: string }) {
  const armourSet = await getArmourSetBySlug(slug);

  if (!armourSet) {
    notFound();
  }

  const totalCost = calculateFullArmorSetCost(armourSet);

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{armourSet.name}</h1>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1">
              {armourSet.pieces.length} Pieces
            </Badge>
            {armourSet.groupBonus && (
              <Badge variant="secondary" className="text-purple-400 border-purple-400/50 px-3 py-1">
                Set Bonus Available
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          <Defense armour={armourSet} variant="card" />
          <Resistances armour={armourSet} variant="card" />
        </div>

        <SetBonusCard armourSet={armourSet} />

        <Pieces pieces={armourSet.pieces} variant="card" />
        <TotalMaterialsCard totalCost={totalCost} />
      </div>
    </div>
  );
}
