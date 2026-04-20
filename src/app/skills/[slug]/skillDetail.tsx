"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Swords, Crosshair } from "lucide-react";
import { SkillData } from "@/lib/types/skills";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

interface SkillDetailProps {
  skill: SkillData;
}

const kindIcons: Record<string, React.ReactNode> = {
  armor: <Shield className="h-5 w-5" />,
  weapon: <Swords className="h-5 w-5" />,
  ranged: <Crosshair className="h-5 w-5" />,
};

const kindNames: Record<string, string> = {
  armor: "Armor Skill",
  weapon: "Weapon Skill",
  ranged: "Ranged Skill",
};

export default function SkillDetail({ skill }: SkillDetailProps) {
  const maxLevel = skill.ranks.length;

  return (
    <div className="flex flex-col px-4 md:px-20 py-10 max-w-7xl mx-auto w-full">
      <FadeIn>
        <Link href="/skills">
          <Button variant="ghost" className="gap-2 mb-6 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Skills
          </Button>
        </Link>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {kindIcons[skill.kind] || <Shield className="h-6 w-6" />}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{skill.name}</h1>
              <p className="text-sm text-muted-foreground capitalize">
                {kindNames[skill.kind] || skill.kind}
              </p>
            </div>
          </div>
          {skill.description && (
            <p className="text-muted-foreground mt-3 max-w-2xl">{skill.description}</p>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex items-center gap-4 mb-6 text-sm">
          <span className="font-medium">Max Level: {maxLevel}</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <h2 className="text-xl font-semibold mb-4">Skill Levels</h2>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skill.ranks.map((rank) => (
          <StaggerItem key={rank.id}>
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-primary">
                    Lv {rank.level}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    of {maxLevel}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {rank.description}
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
