import WeaponPage from "./weapon";
import { getWeaponBySlug } from "@/lib/actions/weapons";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const weapon = await getWeaponBySlug(slug);
  return <WeaponPage weapon={weapon} />;
}
