import { MonsterWeakness } from "@/lib/types/monsters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonsterWeaknessesProps {
  weaknesses: MonsterWeakness[];
}

export default function MonsterWeaknesses({ weaknesses }: MonsterWeaknessesProps) {
  if (weaknesses.length === 0) return null;

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Weaknesses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weaknesses.map((weakness) => (
            <div key={weakness.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold capitalize">
                  {weakness.kind === "element" && weakness.element}
                  {weakness.kind === "status" && weakness.status}
                  {weakness.kind === "effect" && weakness.effect}
                </span>
                <span className="font-bold text-lg">{weakness.level}</span>
              </div>
              {weakness.condition && (
                <p className="text-sm text-muted-foreground">{weakness.condition}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
