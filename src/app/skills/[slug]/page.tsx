import SkillDetail from "./skillDetail";
import { getSkillBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);

  if (!skill) {
    notFound();
  }

  return <SkillDetail skill={skill} />;
}
