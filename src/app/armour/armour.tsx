"use server";

export default async function GetAllArmour() {
  const res = await fetch("https://wilds.mhdb.io/en/armor");
  const data = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold">Armor List</h1>
      <ul>
        {data.map((armor: any) => (
          <li key={armor.id} className="p-2 border-b">
            {armor.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
