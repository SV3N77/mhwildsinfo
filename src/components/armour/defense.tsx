import { ArmourSetData } from "@/lib/types/armour";
import { calculateTotalBaseDefense } from "@/lib/utils/armourUtils";

interface DefenseProps {
  armour: ArmourSetData;
}

export default function Defense({ armour }: DefenseProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold">Defense</div>
      <div className="flex justify-between items-center">
        <div>Lv 1</div>
        <div>{calculateTotalBaseDefense(armour)}</div>
      </div>
    </div>
  );
}
