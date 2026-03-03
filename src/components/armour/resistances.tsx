import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { ArmorSetData, type Resistances } from "@/lib/types/armour";

interface ResistancesProps {
  armour: ArmorSetData;
  variant?: "card" | "list";
}

export default function Resistances({ armour, variant = "card" }: ResistancesProps) {
  const resistances: Resistances = {
    fire: armour.pieces.reduce((sum, p) => sum + (p.resistances?.fire ?? 0), 0),
    water: armour.pieces.reduce((sum, p) => sum + (p.resistances?.water ?? 0), 0),
    ice: armour.pieces.reduce((sum, p) => sum + (p.resistances?.ice ?? 0), 0),
    thunder: armour.pieces.reduce((sum, p) => sum + (p.resistances?.thunder ?? 0), 0),
    dragon: armour.pieces.reduce((sum, p) => sum + (p.resistances?.dragon ?? 0), 0),
  };

  const elements = [
    { label: "Fire", value: resistances.fire, color: "text-orange-400" },
    { label: "Water", value: resistances.water, color: "text-blue-400" },
    { label: "Ice", value: resistances.ice, color: "text-cyan-300" },
    { label: "Thunder", value: resistances.thunder, color: "text-yellow-400" },
    { label: "Dragon", value: resistances.dragon, color: "text-purple-400" },
  ];

  if (variant === "list") {
    return (
      <div className="space-y-2">
        <div className="text-sm font-semibold text-muted-foreground">Resistances</div>
        <div className="grid grid-cols-5 gap-1">
          {elements.map((el) => (
            <div key={el.label} className="text-center">
              <div className={`text-xs font-bold ${el.color}`}>
                {el.value > 0 ? `+${el.value}` : el.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                {el.label.slice(0, 3)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="border-2 py-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Zap className="h-4 w-4" />
          Resistances
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-2">
        <div className="grid grid-cols-5 gap-2">
          {elements.map((el) => (
            <div key={el.label} className="text-center">
              <div className={`text-xl font-bold ${el.color}`}>
                {el.value > 0 ? `+${el.value}` : el.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                {el.label.slice(0, 3)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
