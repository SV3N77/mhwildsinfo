import { type MonsterResistance } from "@/lib/types/monsters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonsterResistancesProps {
  resistances: MonsterResistance[];
}

export default function MonsterResistances({ resistances }: MonsterResistancesProps) {
  if (resistances.length === 0) return null;

  return (
    <Card className="py-6 h-full">
      <CardHeader>
        <CardTitle>Resistances</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resistances.map((resistance) => (
            <div key={resistance.id} className="border rounded-lg p-4">
              <span className="font-semibold capitalize">
                {resistance.kind === "element" && resistance.element}
                {resistance.kind === "status" && resistance.status}
                {resistance.kind === "effect" && resistance.effect}
              </span>
              {resistance.condition && (
                <p className="text-sm text-muted-foreground mt-2">{resistance.condition}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
