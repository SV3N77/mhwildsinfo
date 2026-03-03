import { type MonsterSize } from "@/lib/types/monsters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonsterSizeProps {
  size: MonsterSize;
}

export default function MonsterSize({ size }: MonsterSizeProps) {
  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Monster Size</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Base</p>
            <p className="font-semibold">{size.base}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Mini</p>
            <p className="font-semibold">{size.mini}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Silver</p>
            <p className="font-semibold">{size.silver}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Gold</p>
            <p className="font-semibold">{size.gold}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
