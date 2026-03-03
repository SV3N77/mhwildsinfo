import MonsterPage from "./monster";
import { getMonsterBySlug } from "@/lib/actions/monsters";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const monsterInfo = await getMonsterBySlug(slug);
  return <MonsterPage monsterInfo={monsterInfo} />;
}
