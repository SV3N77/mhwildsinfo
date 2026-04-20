import { MonsterReward } from "@/lib/types/monsters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonsterRewardsProps {
  rewards: MonsterReward[];
}

export default function MonsterRewards({ rewards }: MonsterRewardsProps) {
  if (rewards.length === 0) return null;

  return (
    <Card className="py-6 h-full">
      <CardHeader>
        <CardTitle>Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">{reward.item.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{reward.item.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {reward.conditions.map((condition) => (
                  <div key={condition.id} className="text-sm bg-muted rounded p-2">
                    <p className="font-medium capitalize">
                      {condition.kind}
                      {condition.part && ` - ${condition.part}`}
                    </p>
                    <div className="flex justify-between text-muted-foreground mt-1">
                      <span>Rank: {condition.rank}</span>
                      <span>Qty: {condition.quantity}</span>
                      <span>{condition.chance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
