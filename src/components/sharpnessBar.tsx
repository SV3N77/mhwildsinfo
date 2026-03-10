import { Sharpness } from "@/lib/types/weapon";

interface SharpnessBarProps {
  sharpness: Sharpness | null;
  handicraft?: number[] | null;
}

export function SharpnessBarVisual({ sharpness }: { sharpness: Sharpness }) {
  const segments = [
    { value: sharpness.red, color: "bg-red-500" },
    { value: sharpness.orange, color: "bg-orange-500" },
    { value: sharpness.yellow, color: "bg-yellow-500" },
    { value: sharpness.green, color: "bg-green-500" },
    { value: sharpness.blue, color: "bg-blue-500" },
    { value: sharpness.white, color: "bg-white" },
    { value: sharpness.purple, color: "bg-purple-500" },
  ];

  const totalHits = segments.reduce((sum, seg) => sum + (seg.value || 0), 0);

  const hasSharpness = segments.some((seg) => seg.value && seg.value > 0);

  if (!hasSharpness) {
    return (
      <div className="h-4 rounded-sm bg-gray-300 flex items-center justify-center border border-gray-400">
        <span className="text-xs text-gray-600">No sharpness data</span>
      </div>
    );
  }

  return (
    <>
      <div className="h-4 overflow-hidden flex">
        {segments.map((segment, idx) => {
          const percentage = segment.value > 0 ? (segment.value / totalHits) * 100 : 0;
          if (percentage === 0) return null;
          return <div key={idx} className={`h-full ${segment.color}`} style={{ width: `${percentage}%` }} />;
        })}
      </div>
    </>
  );
}

export default function SharpnessBar({ sharpness, handicraft }: SharpnessBarProps) {
  if (!sharpness) return null;

  const segments = [
    { value: sharpness.red, color: "bg-red-500" },
    { value: sharpness.orange, color: "bg-orange-500" },
    { value: sharpness.yellow, color: "bg-yellow-500" },
    { value: sharpness.green, color: "bg-green-500" },
    { value: sharpness.blue, color: "bg-blue-500" },
    { value: sharpness.white, color: "bg-white" },
    { value: sharpness.purple, color: "bg-purple-500" },
  ];

  const totalHits = segments.reduce((sum, seg) => sum + (seg.value || 0), 0);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold">Sharpness</h4>
          <span className="text-sm text-muted-foreground">Total Hits: {totalHits}</span>
        </div>
        <SharpnessBarVisual sharpness={sharpness} />
        <div className="flex gap-3 mt-2">
          {segments
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
