"use server";

import { WeaponData } from "@/lib/types/weapon";
import { groupWeaponsByType } from "@/lib/utils/weaponUtils";

export default async function GetAllWeapons() {
  const res = await fetch("https://wilds.mhdb.io/en/weapons");
  const data = await res.json();
  // Group weapons by type
  const groupedWeapons = groupWeaponsByType(data);

  return (
    <div className="flex flex-col px-20 py-10">
      <h1 className="text-2xl font-bold">Weapons List</h1>
      <section>
        {groupedWeapons.GreatSword?.map((weapon: WeaponData) => (
          <li key={weapon.id} className="p-2">
            {weapon.name}
          </li>
        ))}
      </section>
    </div>
  );
}
