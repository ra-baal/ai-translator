import Tile from "@/components/atoms/Tile";
import Translator from "@/components/organisms/Translator";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Tile title="Context AI" description="LLM app" href="/" size="sm" />
      <Translator />
    </div>
  );
}
