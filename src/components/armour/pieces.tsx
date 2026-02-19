import { ArmorPiece } from "@/lib/types/armour";

interface PiecesProps {
  pieces: ArmorPiece[];
}

const pieceIcons: Record<string, string> = {
  Head: "🪖",
  Chest: "👕",
  Arms: "🦾",
  Waist: "👖",
  Legs: "👢",
};

const rarityColors: Record<number, string> = {
  1: "text-[#969696]",
  2: "text-[#DEDEDE]",
  3: "text-[#A4C43B]",
  4: "text-[#47A33F]",
  5: "text-[#5CAEBB]",
  6: "text-[#575FD9]",
  7: "text-[#9272E3]",
  8: "text-[#C76D46]",
};

export default function Pieces({ pieces }: PiecesProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-muted-foreground">Pieces</div>
      <div className="space-y-1">
        {pieces.map((piece: ArmorPiece) => (
          <div key={piece.id} className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-secondary/50 transition-colors">
            <span className="text-muted-foreground flex items-center gap-2">
              <span className="w-5 text-center">{pieceIcons[piece.kind] || "•"}</span>
              {piece.kind}
            </span>
            <span className={`font-bold ${rarityColors[piece.rarity] || "text-foreground"}`}>
              {piece.rarity}★
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
