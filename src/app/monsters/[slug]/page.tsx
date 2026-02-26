import MonsterPage from "./monster";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MonsterPage slug={slug} />;
}
