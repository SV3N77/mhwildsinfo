import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ArmourSetData, DisplayStat, Resistances } from "./armour";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
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

export function calculateTotalResistances(armorSetData: ArmourSetData): Resistances {
  // Define the initial state for the resistance sums
  const initialTotals: Resistances = {
    fire: 0,
    water: 0,
    ice: 0,
    thunder: 0,
    dragon: 0,
  };

  // Input validation: Check if data exists and has pieces
  if (!armorSetData || !armorSetData.pieces || armorSetData.pieces.length === 0) {
    console.warn("calculateTotalResistances: Input data is missing or has no pieces. Returning zero resistances.");
    return initialTotals;
  }

  // Use reduce to iterate through pieces and accumulate resistance values
  const totalResistances = armorSetData.pieces.reduce((accumulator, currentPiece) => {
    // Safely access the resistances object of the current piece
    const pieceResistances = currentPiece?.resistances;

    // Create a new accumulator object for the next iteration (good practice for immutability)
    const nextAccumulator: Resistances = {
      fire: accumulator.fire + (pieceResistances?.fire ?? 0),
      water: accumulator.water + (pieceResistances?.water ?? 0),
      ice: accumulator.ice + (pieceResistances?.ice ?? 0),
      thunder: accumulator.thunder + (pieceResistances?.thunder ?? 0),
      dragon: accumulator.dragon + (pieceResistances?.dragon ?? 0),
    };

    return nextAccumulator;
  }, initialTotals); // Start the reduction with the initial zeroed-out totals

  return totalResistances;
}

export function getFormattedResistances(armourSetData: ArmourSetData): DisplayStat[] {
  const totalResistances = calculateTotalResistances(armourSetData);
  const formattedResistances: DisplayStat[] = [];

  // Iterate over the key-value pairs of the totalResistances object
  for (const [key, value] of Object.entries(totalResistances)) {
    // Format the label nicely (e.g., "fire" -> "Fire Resistance")
    const resistanceLabel = `${capitalizeFirstLetter(key)} Resistance`;

    formattedResistances.push({
      label: resistanceLabel,
      value: value,
    });
  }
  return formattedResistances;
}
