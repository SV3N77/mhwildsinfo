import ArmourSet from "./armourSet";
import { getArmourSetBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const armourSet = await getArmourSetBySlug(slug);

  if (!armourSet) {
    notFound();
  }

  return <ArmourSet armourSet={armourSet} />;
}
