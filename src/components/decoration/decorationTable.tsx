"use client";

import type { DecorationData } from "@/lib/types/decoration";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { DecorationCard } from "./decorationCard";
import { Swords, Shield } from "lucide-react";

interface DecorationsTableProps {
  decorations: DecorationData[];
  caption?: string;
}

export function DecorationsTable({ decorations }: DecorationsTableProps) {
  if (!decorations || decorations.length === 0) {
    return <div>No decorations data available.</div>;
  }
  const [search, setSearch] = useState("");
  const [selectedKind, setSelectedKind] = useState<"all" | "weapon" | "armor">("all");

  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DecorationData | null;
    direction: "ascending" | "descending";
  }>({
    key: "name",
    direction: "ascending",
  });

  useEffect(() => {
    if (search.length > 2) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
    }
  }, [search]);

  const filteredDecorations = useMemo(() => {
    let filtered = decorations;

    if (selectedKind !== "all") {
      filtered = filtered.filter((item) => item.kind === selectedKind);
    }

    if (search === "") {
      return filtered;
    }
    if (search.length < 3) {
      return filtered;
    }
    return filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.rarity.toString().includes(search.toLowerCase()) ||
        item.slot.toString().includes(search.toLowerCase()) ||
        item.kind.toLowerCase().includes(search.toLowerCase()) ||
        (item.skills?.some((skill) => skill.skill.name.toLowerCase().includes(search.toLowerCase())) ?? false)
    );
  }, [search, decorations, selectedKind]);

  const sortedDecorations = useMemo(() => {
    let sortableItems = [...filteredDecorations];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue! < bValue!) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue! > bValue!) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredDecorations, sortConfig]);

  const requestSort = (key: keyof DecorationData) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const isSearching = search.length > 0;
  const hasResults = filteredDecorations.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 rounded-lg bg-muted p-1">
          <button
            onClick={() => setSelectedKind("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedKind === "all"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <span>All</span>
            <span className="text-xs text-muted-foreground">({decorations.length})</span>
          </button>
          <button
            onClick={() => setSelectedKind("weapon")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedKind === "weapon"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <Swords className="h-4 w-4" />
            <span>Weapon</span>
            <span className="text-xs text-muted-foreground">({decorations.filter((d) => d.kind === "weapon").length})</span>
          </button>
          <button
            onClick={() => setSelectedKind("armor")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedKind === "armor"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <Shield className="h-4 w-4" />
            <span>Armor</span>
            <span className="text-xs text-muted-foreground">({decorations.filter((d) => d.kind === "armor").length})</span>
          </button>
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, skill, rarity, slot..."
          className="flex-1"
        />
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border rounded-xl p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      ) : isSearching && !hasResults ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No decorations found matching "{search}"</p>
          <p className="text-sm mt-2">Try adjusting your search terms or filter</p>
        </div>
      ) : sortedDecorations.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No decorations found</p>
          <p className="text-sm mt-2">Try selecting a different filter category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedDecorations.map((deco) => (
            <DecorationCard key={deco.id} decoration={deco} />
          ))}
        </div>
      )}
    </div>
  );
}
