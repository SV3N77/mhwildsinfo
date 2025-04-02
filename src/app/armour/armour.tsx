"use server";

import Defense from "@/components/armour/defense";
import Resistances from "@/components/armour/resistances";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArmourSetData, Piece } from "@/lib/armour";

export default async function GetAllArmour() {
  const res = await fetch("https://wilds.mhdb.io/en/armor/sets");
  const data = (await res.json()) as ArmourSetData[];
  const sortedDataArmour = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-4xl font-bold mb-5">Armor List</h1>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {sortedDataArmour.map((armour: ArmourSetData) => (
          <Accordion key={armour.id} type="single" collapsible className="w-full max-w-md mx-auto">
            <AccordionItem value={`${armour.id}`} className="border border-gray-300 rounded-lg shadow-md">
              <AccordionTrigger className="p-4 text-base font-semibold">{armour.name}</AccordionTrigger>
              <AccordionContent className="p-4 bg-gray-50 rounded-b-lg flex flex-col gap-3">
                <Defense armour={armour} />
                <Resistances armour={armour} />
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">Pieces</h2>
                  {armour.pieces.map((piece: Piece) => (
                    <div key={piece.id} className="flex flex-col gap-1">
                      <div className="flex flex-col">
                        <div className="text-sm">{piece.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </section>
    </div>
  );
}
