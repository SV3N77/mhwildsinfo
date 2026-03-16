import GetAllTalismans from "./talismans";
import { CharmData } from "@/lib/types/talismans";
import { getAllTalismans } from "@/lib/actions";

export default async function TalismansPage() {
  const talismans: CharmData[] = await getAllTalismans();

  return <GetAllTalismans talismans={talismans} />;
}
