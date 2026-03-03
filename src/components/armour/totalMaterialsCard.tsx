import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import type { TotalArmorSetCost } from "@/lib/types/armour";

interface TotalMaterialsCardProps {
  totalCost: TotalArmorSetCost;
}

export default function TotalMaterialsCard({ totalCost }: TotalMaterialsCardProps) {
  if (totalCost.totalMaterials.length === 0) return null;

  return (
    <Card className="mt-4 border-2 py-3">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="h-4 w-4" />
          Total Materials Required
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {totalCost.totalMaterials.map((material) => (
            <Badge key={material.item.id} variant="outline" className="text-xs px-3 py-1">
              {material.item.name} ×{material.quantity}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
