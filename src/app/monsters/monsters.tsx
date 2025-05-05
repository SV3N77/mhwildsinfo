"use server";

export default async function GetAllMonsters() {
  const res = await fetch("https://wilds.mhdb.io/en/monsters");
  const data = await res.json();
  // Sort the monsters by name
  const sortedMonsters = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
  /* TODO: add images when API updates with images*/
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-2xl font-bold pb-4">Monsters List</h1>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {sortedMonsters.map((monster: any) => (
          <div key={monster.id} className="border border-gray-300 rounded-lg shadow-md">
            <div className="p-4">
              <h2 className="text-xl font-bold">{monster.name}</h2>
              <p className="text-muted-foreground">{monster.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
