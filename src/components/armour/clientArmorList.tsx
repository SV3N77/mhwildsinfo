"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Shield, Search, ChevronRight } from "lucide-react";
import { ArmorSetData } from "@/lib/types/armour";
import Defense from "./defense";
import Resistances from "./resistances";
import Pieces from "./pieces";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientArmorList({ armourList }: { armourList: ArmorSetData[] }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length < 3) return;
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const filteredArmour = useMemo(() => {
    if (search.length < 3) return armourList;
    return armourList.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, armourList]);

  const isSearching = search.length > 2;
  const hasResults = filteredArmour.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search for an armour set..." 
          className="pl-9 h-11 bg-card/50 border-border/50"
        />
      </div>
      
      {loading ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-full overflow-hidden">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </section>
      ) : isSearching && !hasResults ? (
        <div className="col-span-full text-center py-12">
          <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <div className="text-muted-foreground">No armor sets found matching "{search}"</div>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredArmour.map((armour: ArmorSetData) => (
            <Link href={`/armour/${armour.id}`} key={armour.id} className="group h-full">
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 overflow-hidden border-border/50 flex flex-col">
                <CardHeader className="pt-5 pb-4 px-5 bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg leading-tight">{armour.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1">
                  <Defense armour={armour} />
                  <div className="h-px bg-border/50" />
                  <Resistances armour={armour} />
                  <div className="h-px bg-border/50" />
                  <Pieces pieces={armour.pieces} />
                </CardContent>
                <div className="px-6 pb-5 pt-4 mt-auto border-t border-border/50">
                  <div className="flex items-center justify-center text-sm text-primary font-medium group-hover:gap-2 gap-1 transition-all">
                    View details <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
