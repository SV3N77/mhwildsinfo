import { ArmorSetData, DisplayStat, Resistances } from "../types/armour";
import { capitalizeFirstLetter } from "./utils";

/* Armour Utils */
export function calculateTotalBaseDefense(armourSetData: ArmorSetData): number {
  // Input validation: Check if data exists and has pieces
  if (!armourSetData || !armourSetData.pieces || armourSetData.pieces.length === 0) {
    // If data is missing or has no pieces, return 0 for the total defense
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

export function calculateTotalResistances(armorSetData: ArmorSetData): Resistances {
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
    // If data is missing or has no pieces, return the initialTotals object
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

export function getFormattedResistances(armourSetData: ArmorSetData): DisplayStat[] {
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

// todo add the total zenny cost and the total materials

// export function calculateFullArmorSetCost(armorSet: ArmorSet): TotalArmorSetCost {
//   let totalZenny = 0;
//   const materialMap = new Map<number, { itemDetail: CraftingItemDetail; quantity: number }>();

//   // Iterate over each armor piece within the armorSet.pieces array
//   if (armorSet && armorSet.pieces) {
//     // Check if armorSet and pieces exist
//     for (const piece of armorSet.pieces) {
//       if (piece.crafting) {
//         // Add Zenny cost
//         totalZenny += piece.crafting.zennyCost || 0;

//         // Aggregate materials
//         if (piece.crafting.materials && piece.crafting.materials.length > 0) {
//           for (const materialReq of piece.crafting.materials) {
//             const itemId = materialReq.item.id;
//             const currentMaterial = materialMap.get(itemId);

//             if (currentMaterial) {
//               currentMaterial.quantity += materialReq.quantity;
//             } else {
//               materialMap.set(itemId, {
//                 itemDetail: materialReq.item,
//                 quantity: materialReq.quantity,
//               });
//             }
//           }
//         }
//       }
//     }
//   }

//   const totalMaterials: AggregatedMaterial[] = [];
//   for (const [_id, data] of materialMap) {
//     totalMaterials.push({
//       item: data.itemDetail,
//       quantity: data.quantity,
//     });
//   }

//   totalMaterials.sort((a, b) => a.item.id - b.item.id);

//   return {
//     totalZenny,
//     totalMaterials,
//   };
// }
