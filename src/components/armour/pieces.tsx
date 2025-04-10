import { Piece } from "@/lib/types/armour";

interface PiecesProps {
  pieces: Piece[];
}

export default function Pieces({ pieces }: PiecesProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold">Pieces</div>
      {pieces.map((piece: Piece) => (
        <div key={piece.id} className="flex flex-col gap-1">
          <div className="flex flex-col">
            <div className="text-sm">{piece.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
