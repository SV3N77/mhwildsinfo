import { ArmorSetData, DisplayStat } from "@/lib/types/armour";
import { getFormattedResistances } from "@/lib/utils/armourUtils";

interface ResistancesProps {
  armour: ArmorSetData;
}

export default function Resistances({ armour }: ResistancesProps) {
  const stats = getFormattedResistances(armour);
  const elementColors: Record<string, string> = {
    Fire: "text-orange-400",
    Water: "text-blue-400",
    Ice: "text-cyan-300",
    Thunder: "text-yellow-400",
    Dragon: "text-purple-400",
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-muted-foreground">Resistances</div>
      <div className="grid grid-cols-5 gap-1">
        {stats.map((stat: DisplayStat) => (
          <div key={stat.label} className="text-center">
            <div className={`text-xs font-bold ${elementColors[stat.label] || ""}`}>
              {stat.value > 0 ? `+${stat.value}` : stat.value}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {stat.label.slice(0, 3)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
