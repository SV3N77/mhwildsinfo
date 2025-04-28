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
          {groupedWeapons.GreatSword?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Sword and Shield</h2>
          {groupedWeapons.SwordandShield?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Hammer</h2>
          {groupedWeapons.Hammer?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Long Sword</h2>
          {groupedWeapons.LongSword?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Lance</h2>
          {groupedWeapons.Lance?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Gunlance</h2>
          {groupedWeapons.Gunlance?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Dual Blades</h2>
          {groupedWeapons.DualBlades?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Switch Axe</h2>
          {groupedWeapons.SwitchAxe?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Charge Blade</h2>
          {groupedWeapons.ChargeBlade?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Insect Glaive</h2>
          {groupedWeapons.InsectGlaive?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Hunting Horn</h2>
          {groupedWeapons.HuntingHorn?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Bow</h2>
          {groupedWeapons.Bow?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Light Bowgun</h2>
          {groupedWeapons.LightBowgun?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-xl font-bold">Heavy Bowgun</h2>
          {groupedWeapons.HeavyBowgun?.map((weapon: WeaponData) => (
            <li key={weapon.id} className="">
              {weapon.name}
            </li>
          ))}
        </div>
      </section>
    </div>
  );
}
