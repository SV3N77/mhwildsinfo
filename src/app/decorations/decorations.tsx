"use server";

import { DecorationsTable } from "@/components/decoration/decorationTable";
import { getAllDecorations } from "@/lib/actions";

export default async function GetAllDecorations() {
  const data = await getAllDecorations();
  // Sort the decorations by name
  const sortedDecorations = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
  /* TODO: add images when API updates with images*/
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-2xl font-bold pb-4">Decorations List</h1>
      <DecorationsTable decorations={sortedDecorations} />
    </div>
  );
}
