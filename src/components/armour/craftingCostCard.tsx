import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from "lucide-react";
import type { TotalArmorSetCost } from "@/lib/types/armour";

interface CraftingCostCardProps {
  totalCost: TotalArmorSetCost;
}

export default function CraftingCostCard({ totalCost }: CraftingCostCardProps) {
  return (
    <Card className="border-2 py-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Coins className="h-4 w-4" />
          Crafting Cost
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-2">
        <div className="text-3xl font-bold">{totalCost.totalZenny.toLocaleString()}</div>
        <p className="text-sm text-muted-foreground mt-1">Zenny</p>
      </CardContent>
    </Card>
  );
}
