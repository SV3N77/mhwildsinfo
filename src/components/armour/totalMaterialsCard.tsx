import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Coins } from "lucide-react";
import type { TotalArmorSetCost } from "@/lib/types/armour";

interface TotalMaterialsCardProps {
  totalCost: TotalArmorSetCost;
}

export default function TotalMaterialsCard({ totalCost }: TotalMaterialsCardProps) {
  return (
    <Card className="mt-4 border-2 py-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="h-4 w-4" />
          Total Materials Required
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 rounded-lg bg-linear-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Coins className="h-5 w-5 text-yellow-500" />
              Total Crafting Cost
            </div>
            <div className="text-3xl font-bold text-yellow-500">{totalCost.totalZenny.toLocaleString()}z</div>
          </div>
        </div>

        {totalCost.totalMaterials.length > 0 ? (
          <>
            <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wide font-semibold">
              Materials ({totalCost.totalMaterials.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {totalCost.totalMaterials.map((material) => (
                <Badge
                  key={material.item.id}
                  variant="outline"
                  className="text-sm px-3 py-1.5 bg-background hover:bg-secondary/80 transition-colors"
                >
                  {material.item.name}
                  <span className="ml-1 text-muted-foreground">×{material.quantity}</span>
                </Badge>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-muted-foreground text-sm">No crafting materials required</div>
        )}
      </CardContent>
    </Card>
  );
}
