import { ArmorSetData } from "@/lib/types/armour";
import { calculateTotalBaseDefense } from "@/lib/utils/armourUtils";
import { Shield } from "lucide-react";

interface DefenseProps {
  armour: ArmorSetData;
}

export default function Defense({ armour }: DefenseProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>Defense</span>
      </div>
      <div className="flex items-center justify-between px-2 py-1.5 rounded-md bg-secondary/50">
        <span className="text-sm text-muted-foreground">Lv 1</span>
        <span className="text-lg font-bold text-foreground">{calculateTotalBaseDefense(armour)}</span>
      </div>
    </div>
  );
}
