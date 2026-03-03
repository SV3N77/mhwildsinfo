"use client";

import Image from "next/image";

interface MonsterHeaderProps {
  name: string;
  description: string;
}

export default function MonsterHeader({ name, description }: MonsterHeaderProps) {
  const getMonsterIconPath = (monsterName: string): string => {
    const normalizedName = monsterName.replace(/ /g, "_");
    const extension = ["Ceratonoth Female", "Question Mark"].includes(monsterName) ? "png" : "webp";
    return `/images/monsters/${normalizedName}_Icon.${extension}`;
  };

  return (
    <div className="flex items-start gap-8 mb-8">
      <div className="relative w-32 h-32 shrink-0">
        <Image
          src={getMonsterIconPath(name)}
          alt={name}
          fill
          sizes="128px"
          className="object-contain"
        />
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-2">{name}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
    </div>
  );
}
