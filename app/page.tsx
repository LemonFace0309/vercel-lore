import path from "path";
import { promises as fs } from "fs";

import classNames from "classnames";

import Timeline from "@/components/timeline";

type Event = {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
      <h1 className="text-5xl font-bold text-gray-900 mb-8 lg:mb-16">Vercel Lore</h1>
      <Timeline history={history} /> 
    </main>
  );
}
