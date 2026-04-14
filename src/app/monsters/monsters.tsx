"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Monster } from "@/lib/types/monsters";
import { Input } from "@/components/ui/input";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";

interface GetAllMonstersProps {
  data: Monster[];
}

export default function GetAllMonsters({ data }: GetAllMonstersProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMonsters = useMemo(() => {
    if (!searchQuery || searchQuery.length < 3) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(
      (monster) => monster.name.toLowerCase().includes(query) || monster.description?.toLowerCase().includes(query),
    );
  }, [data, searchQuery]);

  const sortedMonsters = filteredMonsters.sort((a, b) => a.name.localeCompare(b.name));

  const getMonsterIconPath = (name: string): string => {
    const normalizedName = name.replace(/ /g, "_");
    const extension = ["Ceratonoth Female", "Question Mark"].includes(name) ? "png" : "webp";
    return `/images/monsters/${normalizedName}_Icon.${extension}`;
  };

  return (
    <div className="flex flex-col px-20 py-10">
      <FadeIn>
        <h1 className="text-2xl font-bold pb-4">Monsters List</h1>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="mb-6 ">
          <Input
            type="text"
            placeholder="Search monsters by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </FadeIn>
      <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4" key={searchQuery}>
        {sortedMonsters.map((monster) => (
          <StaggerItem key={monster.id}>
            <Link
              href={`/monsters/${monster.slug}`}
              className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col gap-3"
            >
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative w-16 h-16 shrink-0">
                    <Image
                      src={getMonsterIconPath(monster.name)}
                      alt={monster.name}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-xl font-bold">{monster.name}</h2>
                </div>
                <p className="text-muted-foreground">{monster.description}</p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
      {sortedMonsters.length === 0 && (
        <p className="text-center text-muted-foreground py-10">No monsters found matching your search.</p>
      )}
    </div>
  );
}
