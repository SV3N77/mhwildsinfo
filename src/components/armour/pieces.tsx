import { ArmorPiece } from "@/lib/types/armour";
import { rarityColors } from "@/lib/utils/rarityColors";

interface PiecesProps {
  pieces: ArmorPiece[];
}

export default function Pieces({ pieces }: PiecesProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-muted-foreground">Pieces</div>
      <div className="space-y-1">
        {pieces.map((piece: ArmorPiece) => (
          <div
            key={piece.id}
            className="flex items-center justify-between text-sm py-1 rounded hover:bg-secondary/50 transition-colors"
          >
            <span className="text-muted-foreground flex">{piece.name}</span>
            <span className={`font-bold ${rarityColors[piece.rarity] || "text-foreground"}`}>{piece.rarity}★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
