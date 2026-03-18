"use client";

import Link from "next/link";
import { CharmData } from "@/lib/types/talismans";
import { rarityColors } from "@/lib/utils/rarityColors";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Scroll, ChevronRight, Sparkles } from "lucide-react";

interface CharmCardProps {
  charm: CharmData;
}

function CharmCard({ charm }: CharmCardProps) {
  const maxRarity = Math.max(...charm.ranks.map((r) => r.rarity));
  const charmName = charm.ranks[0]?.name.replace(/ I$| II$| III$| IV$| V$/, "") || "Charm";

  return (
    <Link href={`/talismans/${charm.id}`}>
      <Card className="transition-all hover:border-primary/50 hover:shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base leading-tight mb-1">{charmName}</h3>
              <p className="text-xs text-muted-foreground">
                {charm.ranks.length} rank{charm.ranks.length > 1 ? "s" : ""}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </div>

          {charm.ranks.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-muted-foreground">Max Rarity</span>
                <Badge
                  variant="secondary"
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 bg-muted ${rarityColors[maxRarity] || rarityColors[10]}`}
                >
                  R{maxRarity}
                </Badge>
              </div>

              {charm.ranks[0]?.skills && charm.ranks[0].skills.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  {charm.ranks[0].skills.map((skill, idx) => (
                    <span key={skill.id}>
                      {idx > 0 && ", "}
                      {skill.skill.name} (Lv. {skill.level})
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

interface GetAllTalismansProps {
  talismans: CharmData[];
}

export default function GetAllTalismans({ talismans }: GetAllTalismansProps) {
  const [search, setSearch] = useState("");

  const isRandomCharm = (charm: CharmData): boolean => {
    const charmName = charm.ranks[0]?.name.toLowerCase() || "";
    return (
      charmName.includes("golden") ||
      charmName.includes("secret") ||
      charmName.includes("historical") ||
      charmName.includes("unknown")
    );
  };

  const filteredTalismans = useMemo(() => {
    if (search === "") {
      return talismans;
    }

    const searchLower = search.toLowerCase();
    return talismans.filter((charm) =>
      charm.ranks.some(
        (rank) =>
          rank.name.toLowerCase().includes(searchLower) ||
          rank.skills?.some((skill) => skill.skill.name.toLowerCase().includes(searchLower)),
      ),
    );
  }, [talismans, search]);

  const sortedTalismans = useMemo(() => {
    return [...filteredTalismans].sort((a, b) => {
      const aMaxRarity = Math.max(...a.ranks.map((r) => r.rarity));
      const bMaxRarity = Math.max(...b.ranks.map((r) => r.rarity));
      const rarityDiff = bMaxRarity - aMaxRarity;
      if (rarityDiff !== 0) return rarityDiff;
      return a.ranks[0]?.name.localeCompare(b.ranks[0]?.name || "") || 0;
    });
  }, [filteredTalismans]);

  const regularCharms = useMemo(
    () => sortedTalismans.filter((charm) => !isRandomCharm(charm)),
    [sortedTalismans],
  );

  const randomCharms = useMemo(
    () => sortedTalismans.filter((charm) => isRandomCharm(charm)),
    [sortedTalismans],
  );

  return (
    <div className="flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Scroll className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">Charms</h1>
        </div>
        <p className="text-muted-foreground">Browse all charms with their skills and upgrade paths</p>
      </div>

      <div className="mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search charms by name or skill..."
        />
      </div>

      {regularCharms.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Charms</h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {regularCharms.map((talisman) => (
              <CharmCard key={talisman.id} charm={talisman} />
            ))}
          </div>
        </div>
      )}

      {randomCharms.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            Random Charms
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Golden, Secret, Historical, and Unknown charms with random skill combinations
          </p>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {randomCharms.map((talisman) => (
              <CharmCard key={talisman.id} charm={talisman} />
            ))}
          </div>
        </div>
      )}

      {sortedTalismans.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No charms found matching "{search}"</p>
          <p className="text-sm mt-2">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
