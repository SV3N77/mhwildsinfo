import GetAllItems from "./items";
import { ItemData } from "@/lib/types/items";
import { getAllItems } from "@/lib/actions";

export default async function ItemsPage() {
  const items: ItemData[] = await getAllItems();

  return <GetAllItems items={items} />;
}
