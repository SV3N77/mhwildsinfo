import GetAllItems from "./items";
import { ItemData } from "@/lib/types/items";

export default async function ItemsPage() {
  const res = await fetch("https://wilds.mhdb.io/en/items", { next: { revalidate: 3600 } });
  const items: ItemData[] = await res.json();

  return <GetAllItems items={items} />;
}
