import path from "path";
import { promises as fs } from "fs";

import Header from "@/components/header";
import TitleOverlay from "@/components/title-overlay";
import Timeline from "@/components/timeline";

type Event = {
  id: string;
  date: string;
  title: string;
  description: string;
  link: string;
  img: string;
};

async function getHistory() {
  const jsonDirectory = path.join(process.cwd(), "data");

  const fileContents = await fs.readFile(
    jsonDirectory + "/history.json",
    "utf8"
  );

  return JSON.parse(fileContents);
}

export default async function Home() {
  const history: Event[] = await getHistory();

  return (
    <main className="relative min-h-screen max-w-screen-xl mx-auto flex flex-col items-center p-4 md:p-24">
      <Header />
      <TitleOverlay />
      <Timeline history={history} />
    </main>
  );
}
