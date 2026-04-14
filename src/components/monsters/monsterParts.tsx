import { MonsterPart } from "@/lib/types/monsters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonsterPartsProps {
  parts: MonsterPart[];
}

export default function MonsterParts({ parts }: MonsterPartsProps) {
  const filteredParts = parts.filter((part) => part.health > 0);

  if (filteredParts.length === 0) return null;

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Monster Parts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredParts.map((part) => (
            <div key={part.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">{part.kind}</h3>
                <p className="text-sm text-muted-foreground">Health: {part.health}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Slash</p>
                  <p className="font-medium">{part.multipliers.slash}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Blunt</p>
                  <p className="font-medium">{part.multipliers.blunt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pierce</p>
                  <p className="font-medium">{part.multipliers.pierce}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Stun</p>
                  <p className="font-medium">{part.multipliers.stun}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fire</p>
                  <p className="font-medium">{part.multipliers.fire}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Water</p>
                  <p className="font-medium">{part.multipliers.water}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Thunder</p>
                  <p className="font-medium">{part.multipliers.thunder}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ice</p>
                  <p className="font-medium">{part.multipliers.ice}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dragon</p>
                  <p className="font-medium">{part.multipliers.dragon}</p>
                </div>
              </div>
              {part.kinsectEssence && (
                <p className="text-sm text-muted-foreground mt-2">
                  Kinsect Essence: {part.kinsectEssence}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
