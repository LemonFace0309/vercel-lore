import kv from "@vercel/kv";
import { cache } from "react";
import Image from "next/image";
import classNames from "classnames";

import EmojiReaction, { Emoji } from "./emoji-reaction";

const getReactions = cache(async (id: string) => {
  const reactions: Partial<Record<Emoji, number>> =
    (await kv.hgetall(id)) ?? {};
  return reactions;
});

type CardProps = {
  id: string;
  title: string;
  date: string;
  description: string;
  link: string;
  img: string;
  className?: string;
};

export default async function HistoryCard({
  id,
  title,
  date,
  description,
  link,
  img,
  className,
}: CardProps) {
  const reactions = await getReactions(id);

  const dateFormatted = (date ? new Date(date) : new Date())
    .toISOString()
    .split("T")[0];

  return (
    <div
      className={classNames(
        "max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
        className
      )}
    >
      <Image
        className="rounded-t-lg"
        width={640}
        height={360}
        src={img}
        alt=""
      />
      <div className="p-5">
        <h2 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {dateFormatted}
        </h2>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={link}
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <div className="flex justify-center items-center">
            {/* <EmojiReaction eventId={id} label={"fire"} quantity={1} />
            <EmojiReaction eventId={id} label={"heart"} quantity={1} />
            <EmojiReaction eventId={id} label={"rocket"} quantity={1} /> */}
            {Object.entries(reactions)
              .sort((e1, e2) => (e1[0] > e2[0] ? 1 : -1))
              .map(([label, quantity]) => (
                <EmojiReaction
                  key={`${id}-${label}`}
                  eventId={id}
                  label={label as Emoji}
                  quantity={quantity}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
