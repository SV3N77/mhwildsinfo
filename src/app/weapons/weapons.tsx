"use server";

export default async function GetAllWeapons() {
  const res = await fetch("https://wilds.mhdb.io/en/weapons");
  const data = await res.json();
  return (
    <div>
      <h1 className="text-2xl font-bold">Items List</h1>
      <ul>
        {data.map((weapon: any) => (
          <li key={weapon.id} className="p-2 border-b">
            {weapon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
