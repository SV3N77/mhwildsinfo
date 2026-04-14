import {
  AggregatedMaterial,
  ArmorSetData,
  CraftingItemDetail,
  TotalArmorSetCost,
} from "../types/armour";

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

// todo add the total zenny cost and the total materials

export function calculateFullArmorSetCost(armorSet: ArmorSetData): TotalArmorSetCost {
  let totalZenny = 0;
  const materialMap = new Map<number, { itemDetail: CraftingItemDetail; quantity: number }>();

  // Iterate over each armor piece within the armorSet.pieces array
  if (armorSet && armorSet.pieces) {
    // Check if armorSet and pieces exist
    for (const piece of armorSet.pieces) {
      if (piece.crafting) {
        // Add Zenny cost
        totalZenny += piece.crafting.zennyCost || 0;

        // Aggregate materials
        if (piece.crafting.materials && piece.crafting.materials.length > 0) {
          for (const materialReq of piece.crafting.materials) {
            const itemId = materialReq.item.id;
            const currentMaterial = materialMap.get(itemId);

            if (currentMaterial) {
              currentMaterial.quantity += materialReq.quantity;
            } else {
              materialMap.set(itemId, {
                itemDetail: materialReq.item,
                quantity: materialReq.quantity,
              });
            }
          }
        }
      }
    }
  }

  const totalMaterials: AggregatedMaterial[] = [];
  for (const [_id, data] of materialMap) {
    totalMaterials.push({
      item: data.itemDetail,
      quantity: data.quantity,
    });
  }

  totalMaterials.sort((a, b) => a.item.id - b.item.id);

  return {
    totalZenny,
    totalMaterials,
  };
}
