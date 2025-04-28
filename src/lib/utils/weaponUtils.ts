import { GroupedWeapons, weaponCategories, WeaponCategory, WeaponData } from "../types/weapon";

function mapKindToCategory(kind: string): WeaponCategory | undefined {
  switch (kind) {
    case "great-sword":
      return "GreatSword";
    case "sword-shield":
      return "SwordandShield";
    case "hammer":
      return "Hammer";
    case "long-sword":
      return "LongSword";
    case "lance":
      return "Lance";
    case "gunlance":
      return "Gunlance";
    case "dual-blades":
      return "DualBlades";
    case "switch-axe":
      return "SwitchAxe";
    case "charge-blade":
      return "ChargeBlade";
    case "insect-glaive":
      return "InsectGlaive";
    case "hunting-horn":
      return "HuntingHorn";
    case "bow":
      return "Bow";
    case "light-bowgun":
      return "LightBowgun";
    case "heavy-bowgun":
      return "HeavyBowgun";
    default:
      // Optional: Log a warning if an unexpected 'kind' is found
      console.warn(`Unknown weapon kind encountered in data: ${kind}`);
      return undefined; // Return undefined for unknown kinds
  }
}

export function groupWeaponsByType(weapons: WeaponData[]): GroupedWeapons {
  // 1. Initialize the result object with empty arrays for all categories
  // This ensures every category key exists in the final object.
  const grouped: GroupedWeapons = {} as GroupedWeapons; // Use type assertion or initialize below
  for (const category of weaponCategories) {
    grouped[category] = [];
  }

  // 2. Iterate through the input weapons
  for (const weapon of weapons) {
    // 3. Map the weapon's 'kind' to the desired category name
    const category = mapKindToCategory(weapon.kind);

    // 4. If a matching category was found, add the weapon to that array
    if (category) {
      grouped[category].push(weapon);
    }
    // Optional: else { handle weapons with unknown 'kind' values, e.g., add to an 'Unknown' category }
  }

  // 5. Return the populated grouped object
  return grouped;
}
