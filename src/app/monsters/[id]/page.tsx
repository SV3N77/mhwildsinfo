import MonsterPage from "./monster";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MonsterPage id={id} />;
}
