import GetAllSkills from "./skills";
import { SkillData } from "@/lib/types/skills";
import { getAllSkills } from "@/lib/actions";

export default async function SkillsPage() {
  const skills: SkillData[] = await getAllSkills();

  return <GetAllSkills skills={skills} />;
}
