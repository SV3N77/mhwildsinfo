import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DecorationData } from "@/lib/types/decoration";

interface DecorationsTableProps {
  decorations: DecorationData[];
  caption?: string;
}

export function DecorationsTable({ decorations }: DecorationsTableProps) {
  if (!decorations || decorations.length === 0) {
    return <div>No decorations data available.</div>;
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="border px-4 py-2">Name</TableHead>
          <TableHead className="border px-4 py-2 text-center">Rarity</TableHead>
          <TableHead className="border px-4 py-2 text-center">Slot</TableHead>
          <TableHead className="border px-4 py-2">Kind</TableHead>
          <TableHead className="border px-4 py-2">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {decorations.map((deco) => (
          <TableRow key={deco.id}>
            <TableCell className="border px-4 py-2 font-medium">{deco.name}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{deco.rarity}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{deco.slot}</TableCell>
            <TableCell className="border px-4 py-2">{deco.kind}</TableCell>
            <TableCell className="border px-4 py-2">{deco.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
