"use server";

export default async function GetAllItems() {
  const res = await fetch("https://wilds.mhdb.io/en/items");
  const data = await res.json();
  // Sort the items by name
  const sortedItems = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));

  return (
    <div>
      <h1 className="text-2xl font-bold">Items List</h1>
      <ul>
        {sortedItems.map((item: any) => (
          <li key={item.id} className="p-2 border-b">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
