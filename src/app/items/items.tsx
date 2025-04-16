"use server";

import { ItemData } from "@/lib/types/items";
import { groupItemsByCategory } from "@/lib/utils/itemsUtils";

export default async function GetAllItems() {
  const res = await fetch("https://wilds.mhdb.io/en/items");
  const data = await res.json();
  // Sort the items by name
  const sortedItems = groupItemsByCategory(data);
  /* TODO: add images when API updates with images*/
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-2xl font-bold pb-4">Items List</h1>
      {/* <ItemsTable items={sortedItems} /> */}
      {/* ammo */}
      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-bold">Ammo</h2>
        <div className="">
          {sortedItems.Ammo?.map((item: ItemData) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </div>
      </div>
      {/* traps/slinger */}
      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-bold">Traps and Slingers</h2>
        <div className="">
          {sortedItems.TrapsSlinger?.map((item: ItemData) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </div>
      </div>
      {/* tool */}
      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-bold">Tools</h2>
        <div className="">
          {sortedItems.Tool?.map((item: ItemData) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </div>
      </div>
      {/* consumable */}
      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-bold">Consumable</h2>
        <div className="">
          {sortedItems.Consumable?.map((item: ItemData) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </div>
      </div>
      {/* ingredient */}
      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-bold">Ingredients</h2>
        <div className="">
          {sortedItems.Ingredient?.map((item: ItemData) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </div>
      </div>
      {/* cooking ingredient */}
      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-bold">Cooking Ingredients</h2>
        <div className="">
          {sortedItems.CookingIngredients?.map((item: ItemData) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </div>
      </div>
      {/* special item */}
      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-bold">Special Items</h2>
        <div className="">
          {sortedItems.SpecialItem?.map((item: ItemData) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </div>
      </div>
      {/* material */}
      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-bold">Materials</h2>
        <div className="">
          {sortedItems.Material?.map((item: ItemData) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </div>
      </div>

      {/* <div className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-bold">Unknown</h2>
        <div className="">
          {sortedItems.Unknown?.map((item: ItemData) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </div>
      </div> */}
    </div>
  );
}
