import type { ItemData, ItemCategory, GroupedItems } from "../types/items";

export function categorizeItem(item: ItemData): ItemCategory {
  const name = item.name.toLowerCase();
  // const description = item.description.toLowerCase(); // Can be used for more complex rules

  // --- Tools ---
  if (
    name === "whetstone" ||
    name === "binoculars" ||
    name === "camping kit" ||
    name === "portable bbq grill" ||
    name === "fishing rod"
  ) {
    return "Tool";
  }

  // --- Specific Unique Items / Equipment-like ---
  if (
    name.includes(" charm") ||
    name.includes(" mantle") ||
    name.includes(" orb") ||
    name.includes(" aloe") ||
    name.includes(" treasure") ||
    name.includes(" voucher") ||
    name.includes(" coin") ||
    name === "Specklite" ||
    name === "Argecite" ||
    name.includes(" opal") ||
    name.includes(" pollen") ||
    name.includes(" sea pot") ||
    name.includes(" vase") ||
    name.includes(" Antimite ")
  )
    return "SpecialItem"; // e.g., Powercharm, Ghillie Mantle, Mystery Orb, Specklite, Argecite, etc.

  // --- Ammo ---
  if (name.includes(" ammo") || name.includes("coating") || name.includes("phial") || name === "cluster bomb") {
    return "Ammo";
  }

  // --- Traps / Slinger ---
  // Specific Traps/Bombs/Tools first
  if (
    name === "pitfall trap" ||
    name === "shock trap" ||
    name === "tranq bomb" ||
    name === "smoke bomb" ||
    name.includes("barrel bomb")
  ) {
    return "TrapsSlinger";
  }
  // Slinger Pods/Ammo/Knives
  if (name.includes(" pod") || name === "stone" || name === "capture net" || name.includes(" knife")) {
    // Added knife/blade
    return "TrapsSlinger";
  }

  // --- Consumables (Healing, Buffs, Cures, Food, Single-Use Items) ---
  // Specific Names First
  if (
    name.includes("potion") ||
    name.includes("ration") ||
    name.includes("steak") ||
    name.includes("drink") ||
    name.includes("pill") ||
    name === "antidote" ||
    name === "nulberry" ||
    name === "herbal medicine" ||
    name === "cleanser" || // Added cleanser
    name === "burnt meat" ||
    name === "wild jerky" || // Added burnt meat
    name === "lifepowder" ||
    name === "dust of life" ||
    name === "herbal powder" ||
    name === "demon powder" ||
    name === "hardshell powder" || // Added dust
    name === "dash juice" ||
    name === "demondrug" ||
    name === "mega demondrug" ||
    name === "armorskin" ||
    name === "mega armorskin" ||
    name === "immunizer" || // Added Mega Armorskin
    name === "farcaster" ||
    name === "first-aid med" ||
    name === "ez max potion" ||
    name === "ez lifepowder" ||
    name === "ez herbal powder" ||
    name === "ez demon powder" ||
    name === "ez hardshell powder" ||
    name === "ez dust of life" ||
    name === "ez tranq bomb" ||
    name === "ez sonic bomb" ||
    name === "ez farcaster"
  ) {
    // Catch all EZ items
    return "Consumable";
  }
  // Broader includes checks (less likely needed with specific names above)
  // if (name.includes(' jerky') || name.includes(' pill') || name.includes(' drug') ... ) etc.

  // --- Materials (Check Before Broad Ingredients) ---
  if (
    name.includes("scale") ||
    name.includes("hide") ||
    name.includes("pelt") ||
    name.includes("shell") ||
    name.includes("carapace") ||
    name.includes("claw") ||
    name.includes("horn") ||
    name.includes("fang") ||
    name.includes("tail") ||
    name.includes("wing") ||
    name.includes("plate") ||
    name.includes("gem") ||
    name.includes("marrow") ||
    name.includes("bone") ||
    name.includes("ore") ||
    name.includes("crystal") ||
    name.includes("shard") ||
    name.includes("spike") ||
    name.includes("ruby") ||
    name.includes("jaw") ||
    name.includes("crest") ||
    name.includes("fur") ||
    name.includes("skull") ||
    name.includes("webbing") ||
    name.includes("certificate") ||
    name.includes("sac") ||
    name.includes("feather") ||
    name.includes("ear") ||
    name.includes("tentacle") ||
    name.includes("beak") ||
    name.includes("fin") ||
    name.includes("symbol") ||
    name.includes("Drearisite") ||
    name.includes("bloodstone") ||
    name.includes("blood") ||
    name.includes("feeler") ||
    name === "sild cotton" ||
    name === "suja textiles" ||
    name === "azuz tanned leather"
  ) {
    return "Material";
  }

  // --- Ingredients --- (Check specific components then broad natural items)
  // Specific crafting components first
  if (
    name === "trap tool" ||
    name === "catalyst" ||
    name.includes(" extract") ||
    name === "gunpowder" ||
    name === "net" ||
    name.includes("arowana scale") ||
    name.includes(" barrel")
  ) {
    // Added barrel, arowana scale
    return "Ingredient";
  }
  // Broad natural ingredients
  if (
    name === "raw meat" ||
    name.includes(" herb") ||
    name === "honey" ||
    name.includes(" bug") ||
    name.includes(" mushroom") ||
    name.includes(" seed") ||
    name.includes(" nut") ||
    name.includes(" berry") ||
    name.includes(" fern") ||
    name === "ivy" ||
    name.includes(" moss") ||
    name.includes(" grass") ||
    name.includes(" flower") ||
    name.includes(" pepper") ||
    name === "dung" ||
    name === "rolled-up dung" ||
    name === "mandragora" ||
    name === "toadstool" ||
    name === "parashroom" ||
    name === "nitroshroom" ||
    name === "exciteshroom" ||
    name === "chillshroom" ||
    name === "devil's blight" ||
    name === "gloamgrass bud"
  ) {
    // Added specific names/types
    // Add specific exclusions if needed (e.g. a material named 'berry')
    // Check it wasn't caught by Consumable first (e.g. Nulberry check is higher)
    return "Ingredient";
  }

  // --- Fallback ---
  console.warn(`Rule-based fallback for item: ${item.name} (ID: ${item.id}) - categorizing as Unknown.`);
  return "Unknown";
}

export function groupItemsByCategory(items: ItemData[]): GroupedItems {
  const grouped: GroupedItems = {}; // Initialize empty object

  for (const item of items) {
    const category = categorizeItem(item); // Determine category

    // If the category array doesn't exist yet, create it
    if (!grouped[category]) {
      grouped[category] = [];
    }

    // Add the item to the correct category array
    grouped[category]?.push(item);
  }

  return grouped;
}
