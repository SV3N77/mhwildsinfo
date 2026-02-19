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
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Great Sword</h2>
          {groupedWeapons["great-sword"]?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Sword and Shield</h2>
          {groupedWeapons["sword-and-shield"]?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Hammer</h2>
          {groupedWeapons.hammer?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Long Sword</h2>
          {groupedWeapons["long-sword"]?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Lance</h2>
          {groupedWeapons.lance?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Gunlance</h2>
          {groupedWeapons.gunlance?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Dual Blades</h2>
          {groupedWeapons["dual-blades"]?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Switch Axe</h2>
          {groupedWeapons["switch-axe"]?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Charge Blade</h2>
          {groupedWeapons["charge-blade"]?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Insect Glaive</h2>
          {groupedWeapons["insect-glaive"]?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Hunting Horn</h2>
          {groupedWeapons["hunting-horn"]?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Bow</h2>
          {groupedWeapons.bow?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Light Bowgun</h2>
          {groupedWeapons["light-bowgun"]?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Heavy Bowgun</h2>
          {groupedWeapons["heavy-bowgun"]?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
      </section>
    </div>
  );
}
