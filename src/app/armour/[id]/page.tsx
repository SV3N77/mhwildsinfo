import { TopBar } from "@/components/topBar";
import ArmourSet from "./armourSet";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <TopBar />
      <ArmourSet id={id} />;
    </div>
  );
}
