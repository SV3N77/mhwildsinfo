"use server";

export default async function GetAllDecorations() {
  const res = await fetch("https://wilds.mhdb.io/en/decorations");
  const data = await res.json();
  return (
    <div>
      <h1 className="text-2xl font-bold">Decorations List</h1>
      <ul>
        {data.map((decoration: any) => (
          <li key={decoration.id} className="p-2 border-b">
            {decoration.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
