"use server";

import { ItemsTable } from "@/components/items/items";
import { groupItemsByCategory } from "@/lib/utils/itemsUtils";

export default async function GetAllItems() {
  const res = await fetch("https://wilds.mhdb.io/en/items");
  const data = await res.json();
  // Sort the items by name
  const sortedItems = groupItemsByCategory(data);
  console.log(sortedItems);
  /* TODO: add images when API updates with images*/
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-2xl font-bold pb-4">Items List</h1>
      {/* <ItemsTable items={sortedItems} /> */}
      {/* ammo */}
      <div className="py-4">
        {sortedItems.Ammo?.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      {/* traps/slinger */}
      <div className="py-4">
        {sortedItems.TrapsSlinger?.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      {/* tool */}
      <div className="py-4">
        {sortedItems.Tool?.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      {/* consumable */}
      <div className="py-4">
        {sortedItems.Consumable?.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      {/* ingredient */}
      <div className="py-4">
        {sortedItems.Ingredient?.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      {/* special item */}
      <div className="py-4">
        {sortedItems.SpecialItem?.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      {/* material */}
      <div className="py-4">
        {sortedItems.Material?.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
    </div>
  );
}
