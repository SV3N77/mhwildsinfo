"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArmorSetData } from "@/lib/types/armour";
import Defense from "./defense";
import Resistances from "./resistances";
import Pieces from "./pieces";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientArmorList({ armourList }: { armourList: ArmorSetData[] }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Set loading to true briefly when search changes
  useEffect(() => {
    if (search.length < 3) return; // Skip loading if not searching
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300); // adjust delay if needed

    return () => clearTimeout(timeout);
  }, [search]);

  const filteredArmour = useMemo(() => {
    if (search.length < 3) return armourList;
    return armourList.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, armourList]);

  const isSearching = search.length > 2;
  const hasResults = filteredArmour.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for an armour set" />
      {loading ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col gap-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3 mt-auto" />
            </div>
          ))}
        </section>
      ) : isSearching && !hasResults ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No armor sets found matching "{search}"
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredArmour.map((armour: ArmorSetData) => (
            <div key={armour.id} className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col">
              <div className="text-2xl font-semibold mb-2">{armour.name}</div>
              <Defense armour={armour} />
              <Resistances armour={armour} />
              <Pieces pieces={armour.pieces} />
              <Link href={`/armour/${armour.id}`} className="ml-auto text-sm mt-auto">
                View more information
              </Link>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
