import { DecorationsTable } from "@/components/decoration/decorationTable";
import { getAllDecorations } from "@/lib/actions";
import { Gem } from "lucide-react";

export default async function DecorationsPage() {
  const data = await getAllDecorations();
  const sortedDecorations = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Gem className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">Decorations</h1>
        </div>
        <p className="text-muted-foreground">
          Browse all decorations with their skills, slots, and rarity levels
        </p>
      </div>
      <DecorationsTable decorations={sortedDecorations} />
    </div>
  );
}
