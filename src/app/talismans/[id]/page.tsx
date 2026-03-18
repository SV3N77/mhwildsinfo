import CharmPage from "./charm";
import { getCharmById } from "@/lib/actions/talismans";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const charm = await getCharmById(id);
  return <CharmPage charm={charm} />;
}
