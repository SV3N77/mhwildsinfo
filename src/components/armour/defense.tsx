import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { ArmorSetData } from "@/lib/types/armour";
import { calculateTotalBaseDefense } from "@/lib/utils/armourUtils";

interface DefenseProps {
  armour: ArmorSetData;
  variant?: "card" | "list";
}

export default function Defense({ armour, variant }: DefenseProps) {
  const totalDefense = calculateTotalBaseDefense(armour);

  if (variant === "list") {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Defense</span>
        </div>
        <div className="flex items-center justify-between px-2 py-1.5 rounded-md bg-secondary/50">
          <span className="text-sm text-muted-foreground">Lv 1</span>
          <span className="text-lg font-bold text-foreground">{totalDefense}</span>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-2 py-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Shield className="h-4 w-4" />
          Defense
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-2">
        <div className="text-3xl font-bold">{totalDefense}</div>
        <p className="text-sm text-muted-foreground mt-1">Base Defense</p>
      </CardContent>
    </Card>
  );
}
