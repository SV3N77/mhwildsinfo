"use server";

import Link from "next/link";
import Image from "next/image";
import { getAllMonsters } from "@/lib/actions";

export default async function GetAllMonsters() {
  const data = await getAllMonsters();
  // Sort the monsters by name
  const sortedMonsters = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));

  const getMonsterIconPath = (name: string): string => {
    const normalizedName = name.replace(/ /g, "_");
    const extension = ["Ceratonoth Female", "Question Mark"].includes(name) ? "png" : "webp";
    return `/images/monsters/${normalizedName}_Icon.${extension}`;
  };

  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-2xl font-bold pb-4">Monsters List</h1>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {sortedMonsters.map((monster: any) => (
          <Link
            href={`/monsters/${monster.slug}`}
            key={monster.id}
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
        ))}
      </section>
    </div>
  );
}
