"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DecorationData } from "@/lib/types/decoration";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

interface DecorationsTableProps {
  decorations: DecorationData[];
  caption?: string;
}

export function DecorationsTable({ decorations }: DecorationsTableProps) {
  if (!decorations || decorations.length === 0) {
    return <div>No decorations data available.</div>;
  }
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Set loading to true briefly when search changes
  useEffect(() => {
    if (search !== debouncedSearch && search.length > 2) {
      setLoading(true);
    } else {
      setLoading(false); // Immediately turn off loading if search is empty or identical
    }

    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // adjust delay if needed

    return () => clearTimeout(timeout);
  }, [search, debouncedSearch]);

  const showSkeletons = loading && debouncedSearch.length > 0;

  const filteredDecorations = useMemo(() => {
    if (debouncedSearch === "") {
      return decorations;
    }
    return decorations.filter((item) => item.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [debouncedSearch, decorations]);

  const isCurrentlySearching = search.length > 0;
  const hasResults = filteredDecorations.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for decoration" />
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
          {showSkeletons ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="border px-4 py-2 font-medium">
                  <Skeleton className="h-4 w-[150px]" /> {/* Adjust width as needed */}
                </TableCell>
                <TableCell className="border px-4 py-2 text-center">
                  <Skeleton className="h-4 w-[50px] mx-auto" />
                </TableCell>
                <TableCell className="border px-4 py-2 text-center">
                  <Skeleton className="h-4 w-[30px] mx-auto" />
                </TableCell>
                <TableCell className="border px-4 py-2">
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell className="border px-4 py-2">
                  <Skeleton className="h-4 w-[300px]" />
                </TableCell>
              </TableRow>
            ))
          ) : isCurrentlySearching && !hasResults ? (
            <TableRow className="text-center py-8 text-muted-foreground">
              <TableCell colSpan={5}>
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No decorations found matching "{search}"
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {filteredDecorations.map((deco) => (
                <TableRow key={deco.id}>
                  <TableCell className="border px-4 py-2 font-medium">{deco.name}</TableCell>
                  <TableCell className="border px-4 py-2 text-center">{deco.rarity}</TableCell>
                  <TableCell className="border px-4 py-2 text-center">{deco.slot}</TableCell>
                  <TableCell className="border px-4 py-2">{deco.kind}</TableCell>
                  <TableCell className="border px-4 py-2">{deco.description}</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
