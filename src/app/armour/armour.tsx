"use server";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArmourSetData, Piece } from "@/lib/armour";
import { calculateTotalBaseDefense } from "@/lib/utils";

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
              <AccordionContent className="p-4 bg-gray-50 rounded-b-lg flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>Lv 1</div>
                  <div>{calculateTotalBaseDefense(armour)}</div>
                </div>
                {armour.pieces.map((piece: Piece) => (
                  <div key={piece.id} className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <div className="flex flex-col">
                        <div className="text-lg font-semibold">{piece.name}</div>
                        <div className="text-sm text-gray-500">{piece.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </section>
    </div>
  );
}
