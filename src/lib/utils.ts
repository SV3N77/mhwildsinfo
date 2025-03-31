import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ArmourSetData } from "./armour";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTotalBaseDefense(armourSetData: ArmourSetData): number {
  // Input validation: Check if data exists and has pieces
  if (!armourSetData || !armourSetData.pieces || armourSetData.pieces.length === 0) {
    console.warn("calculateTotalBaseDefense: Input data is missing or has no pieces. Returning 0.");
    return 0;
  }

  // Use reduce to sum the base defense values
  const totalDefense = armourSetData.pieces.reduce((accumulator, currentPiece) => {
    // Optional chaining (?.) and nullish coalescing (??) for safety:
    // If currentPiece, currentPiece.defense, or currentPiece.defense.base is null/undefined,
    // treat the value as 0 for the sum.
    const pieceBaseDefense = currentPiece?.defense?.base ?? 0;
    return accumulator + pieceBaseDefense;
  }, 0); // Start sum at 0

  return totalDefense;
}
