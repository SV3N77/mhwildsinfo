"use client";

import { CharmData } from "@/lib/types/talismans";
import { rarityColors } from "@/lib/utils/rarityColors";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Scroll, ChevronDown, ChevronUp } from "lucide-react";

interface CharmCardProps {
  charm: CharmData;
  isExpanded: boolean;
  onToggle: () => void;
}

function CharmCard({ charm, isExpanded, onToggle }: CharmCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <button onClick={onToggle} className="w-full text-left">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base leading-tight mb-1">
                {charm.ranks[0]?.name.replace(/ I$| II$| III$| IV$| V$/, '') || 'Charm'}
              </h3>
              <p className="text-xs text-muted-foreground">{charm.ranks.length} rank{charm.ranks.length > 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </div>
        </button>

        {isExpanded && (
          <div className="space-y-3 mt-3 pt-3 border-t border-border/50">
            {charm.ranks.map((rank) => (
              <div key={rank.id} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-medium text-sm">{rank.name}</h4>
                  <Badge
                    variant="secondary"
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 bg-muted ${rarityColors[rank.rarity] || rarityColors[10]}`}
                  >
                    R{rank.rarity}
                  </Badge>
                </div>

                {rank.skills && rank.skills.length > 0 && (
                  <div className="space-y-1">
                    {rank.skills.map((skill, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">{skill.skill.name}</span>
                        <span className="font-semibold">Lv. {skill.level}</span>
                      </div>
                    ))}
                  </div>
                )}

                {rank.craftable !== undefined && (
                  <div className="text-xs text-muted-foreground">
                    {rank.craftable ? 'Craftable' : 'Upgradable'} for z{rank.zennyCost?.toLocaleString() || 0}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface GetAllTalismansProps {
  talismans: CharmData[];
}

export default function GetAllTalismans({ talismans }: GetAllTalismansProps) {
  const [search, setSearch] = useState("");
  const [expandedCharms, setExpandedCharms] = useState<Set<number>>(new Set());

  const filteredTalismans = useMemo(() => {
    if (search === "") {
      return talismans;
    }

    const searchLower = search.toLowerCase();
    return talismans.filter((charm) =>
      charm.ranks.some((rank) =>
        rank.name.toLowerCase().includes(searchLower) ||
        rank.skills?.some((skill) =>
          skill.skill.name.toLowerCase().includes(searchLower)
        )
      )
    );
  }, [talismans, search]);

  const sortedTalismans = useMemo(() => {
    return [...filteredTalismans].sort((a, b) => {
      const aMaxRarity = Math.max(...a.ranks.map(r => r.rarity));
      const bMaxRarity = Math.max(...b.ranks.map(r => r.rarity));
      const rarityDiff = bMaxRarity - aMaxRarity;
      if (rarityDiff !== 0) return rarityDiff;
      return a.ranks[0]?.name.localeCompare(b.ranks[0]?.name || '') || 0;
    });
  }, [filteredTalismans]);

  const toggleCharm = (charmId: number) => {
    setExpandedCharms((prev) => {
      const next = new Set(prev);
      if (next.has(charmId)) {
        next.delete(charmId);
      } else {
        next.add(charmId);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Scroll className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">Charms</h1>
        </div>
        <p className="text-muted-foreground">
          Browse all charms with their skills and upgrade paths
        </p>
      </div>

      <div className="mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search charms by name or skill..."
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedTalismans.map((talisman) => (
          <CharmCard
            key={talisman.id}
            charm={talisman}
            isExpanded={expandedCharms.has(talisman.id)}
            onToggle={() => toggleCharm(talisman.id)}
          />
        ))}
      </div>

      {sortedTalismans.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No charms found matching "{search}"</p>
          <p className="text-sm mt-2">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
