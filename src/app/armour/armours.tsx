"use server";

import Defense from "@/components/armour/defense";
import Pieces from "@/components/armour/pieces";
import Resistances from "@/components/armour/resistances";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArmorSetData } from "@/lib/types/armour";
import Link from "next/link";

export default async function GetAllArmour() {
  const res = await fetch("https://wilds.mhdb.io/en/armor/sets");
  const data = (await res.json()) as ArmorSetData[];
  // Sort the armour by name
  const sortedDataArmour = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
  /* TODO: add images when API updates with images*/
  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-4xl font-bold mb-5">Armor List</h1>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {sortedDataArmour.map((armour: ArmorSetData) => (
          <Accordion key={armour.id} type="single" collapsible className="w-full max-w-md mx-auto">
            <AccordionItem value={`${armour.id}`} className="border border-gray-300 rounded-lg shadow-md">
              <AccordionTrigger className="p-4 text-base font-semibold">{armour.name}</AccordionTrigger>
              <AccordionContent className="p-4 bg-gray-50 rounded-b-lg flex flex-col gap-3">
                <Defense armour={armour} />
                <Resistances armour={armour} />
                <Pieces pieces={armour.pieces} />
                <Link href={`/armour/${armour.id}`} className="ml-auto">
                  View information
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </section>
    </div>
  );
}
