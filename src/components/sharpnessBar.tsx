import { Sharpness } from "@/lib/types/weapon";
import { getSharpnessSegments, getTotalHits } from "@/lib/utils/weaponUtils";

interface SharpnessBarProps {
  sharpness: Sharpness | null;
  handicraft?: number[] | null;
}

export function SharpnessBarVisual({ sharpness }: { sharpness: Sharpness }) {
  const segments = getSharpnessSegments(sharpness);
  const totalHits = getTotalHits(sharpness);

  return (
    <div className="h-4  overflow-hidden flex ">
      {segments.map((segment, idx) => {
        const percentage = segment.value > 0 ? (segment.value / totalHits) * 100 : 0;
        if (percentage === 0) return null;
        return <div key={idx} className={`h-full ${segment.color}`} style={{ width: `${percentage}%` }} />;
      })}
    </div>
  );
}

export default function SharpnessBar({ sharpness, handicraft }: SharpnessBarProps) {
  if (!sharpness) return null;

  const totalHits = getTotalHits(sharpness);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold">Sharpness</h4>
          <span className="text-sm text-muted-foreground">Total Hits: {totalHits}</span>
        </div>
        <SharpnessBarVisual sharpness={sharpness} />
        <div className="flex gap-3 mt-2">
          {getSharpnessSegments(sharpness)
            .filter((seg) => seg.value > 0)
            .map((segment, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs">
                <div className={`w-3 h-3 rounded-sm ${segment.color}`} />
                <span className="font-semibold">{segment.value}</span>
              </div>
            ))}
        </div>
      </div>

      {handicraft && handicraft.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Handicraft Bonus</h4>
          <div className="space-y-2">
            {handicraft.map((bonus, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm py-1 px-3 bg-muted/50 rounded">
                <span className="text-muted-foreground">+{idx + 1} Handicraft</span>
                <span className="font-semibold text-green-600">+{bonus} hits</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
