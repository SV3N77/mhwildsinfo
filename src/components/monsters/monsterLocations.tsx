import { Location } from "@/lib/types/monsters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonsterLocationsProps {
  locations: Location[];
}

export default function MonsterLocations({ locations }: MonsterLocationsProps) {
  if (locations.length === 0) return null;

  return (
    <Card className="lg:col-span-2 py-6">
      <CardHeader>
        <CardTitle>Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {locations.map((location) => (
            <div key={location.id} className="border rounded-lg p-3">
              <h3 className="font-semibold">{location.name}</h3>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
