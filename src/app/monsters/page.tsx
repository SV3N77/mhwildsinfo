import GetAllMonsters from "./monsters";
import { getAllMonsters } from "@/lib/actions";

export default async function MonstersPage() {
  const data = await getAllMonsters();
  return <GetAllMonsters data={data} />;
}
