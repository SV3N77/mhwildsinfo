import { Monster } from "@/lib/types/monsters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonsterBasicInfoProps {
  monster: Monster;
}

export default function MonsterBasicInfo({ monster }: MonsterBasicInfoProps) {
  return (
    <Card className="border-2 py-6 h-full">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Kind</p>
            <p className="font-semibold capitalize">{monster.kind}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Species</p>
            <p className="font-semibold capitalize">{monster.species.replace(/-/g, " ")}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Base Health</p>
            <p className="font-semibold">{monster.baseHealth}</p>
          </div>
        </div>
        {monster.features && (
          <div>
            <p className="text-sm text-muted-foreground">Features</p>
            <p className="font-semibold">{monster.features}</p>
          </div>
        )}
        {monster.tips && (
          <div>
            <p className="text-sm text-muted-foreground">Tips</p>
            <p className="font-semibold">{monster.tips}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
