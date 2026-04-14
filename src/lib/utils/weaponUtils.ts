import { Sharpness } from "../types/weapon";

export function createWeaponSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

const SHARPNESS_COLORS = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-white", "bg-purple-500"] as const;

const SHARPNESS_KEYS: (keyof Sharpness)[] = ["red", "orange", "yellow", "green", "blue", "white", "purple"];

export function getSharpnessSegments(sharpness: Sharpness) {
  return SHARPNESS_KEYS.map((key, idx) => ({
    value: sharpness[key],
    color: SHARPNESS_COLORS[idx],
  }));
}

export function getTotalHits(sharpness: Sharpness) {
  return SHARPNESS_KEYS.reduce((sum, key) => sum + (sharpness[key] || 0), 0);
}
