"use server";

import { DecorationsTable } from "@/components/decoration/decorationTable";

export default async function GetAllDecorations() {
  const res = await fetch("https://wilds.mhdb.io/en/decorations");
  const data = await res.json();
  // Sort the decorations by name
  const sortedDecoratiuons = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-2xl font-bold pb-4">Decorations List</h1>
      <DecorationsTable decorations={sortedDecoratiuons} />
    </div>
  );
}
