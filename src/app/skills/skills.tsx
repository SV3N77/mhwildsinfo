"use client";

import { SkillData } from "@/lib/types/skills";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Zap, Shield, Swords, Crosshair } from "lucide-react";
import { SkillCard } from "@/components/skills/skillCard";

interface GetAllSkillsProps {
  skills: SkillData[];
}

export default function GetAllSkills({ skills }: GetAllSkillsProps) {
  const [search, setSearch] = useState("");
  const [selectedKind, setSelectedKind] = useState<string>("all");

  const skillKinds = useMemo(() => {
    const kinds = new Set(skills.map((s) => s.kind));
    return Array.from(kinds).sort();
  }, [skills]);

  const filteredSkills = useMemo(() => {
    let result = skills;

    if (selectedKind !== "all") {
      result = result.filter((skill) => skill.kind === selectedKind);
    }

    if (search !== "") {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchLower) ||
          skill.description?.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [skills, search, selectedKind]);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const kindIcons: Record<string, React.ReactNode> = {
    armor: <Shield className="h-4 w-4" />,
    weapon: <Swords className="h-4 w-4" />,
    ranged: <Crosshair className="h-4 w-4" />,
  };

  const kindNames: Record<string, string> = {
    armor: "Armor Skills",
    weapon: "Weapon Skills",
    ranged: "Ranged Skills",
  };

  return (
    <div className="flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Zap className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">Skills</h1>
        </div>
        <p className="text-muted-foreground">
          Browse all skills available in Monster Hunter Wilds
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 rounded-lg bg-muted p-2">
          <button
            onClick={() => setSelectedKind("all")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedKind === "all"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <span>All</span>
            <span className="text-xs text-muted-foreground">({skills.length})</span>
          </button>
          {skillKinds.map((kind) => {
            const kindSkills = skills.filter((s) => s.kind === kind);
            return (
              <button
                key={kind}
                onClick={() => setSelectedKind(kind)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedKind === kind
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                {kindIcons[kind]}
                <span className="truncate">{kindNames[kind] || capitalize(kind)}</span>
                <span className="text-xs text-muted-foreground shrink-0">({kindSkills.length})</span>
              </button>
            );
          })}
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills by name, description..."
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSkills
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No skills found matching "{search}"</p>
          <p className="text-sm mt-2">Try adjusting your search terms or filter</p>
        </div>
      )}
    </div>
  );
}
