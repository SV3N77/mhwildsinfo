import CharmPage from "./charm";
import { getCharmBySlug } from "@/lib/actions/talismans";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const charm = await getCharmBySlug(slug);
  return <CharmPage charm={charm} />;
}
