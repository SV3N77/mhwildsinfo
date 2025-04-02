import { ArmourSetData, DisplayStat } from "@/lib/armour";
import { getFormattedResistances } from "@/lib/utils";
interface ResistancesProps {
  armour: ArmourSetData;
}

export default function Resistances({ armour }: ResistancesProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold">Resistances</div>
      {getFormattedResistances(armour).map((stat: DisplayStat) => (
        <div key={stat.label} className="flex gap-2 items-center justify-between">
          <div className="text-xs font-semibold">{stat.label}</div>
          <div>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
