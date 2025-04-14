import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ItemData } from "@/lib/types/items";

interface ItemsTableProps {
  items: ItemData[];
}

export function ItemsTable({ items }: ItemsTableProps) {
  if (!items || items.length === 0) {
    return <div>No items data available.</div>;
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="border px-4 py-2">Name</TableHead>
          <TableHead className="border px-4 py-2 text-center">Rarity</TableHead>
          <TableHead className="border px-4 py-2">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="border px-4 py-2 font-medium">{item.name}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{item.rarity}</TableCell>
            <TableCell className="border px-4 py-2">{item.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
