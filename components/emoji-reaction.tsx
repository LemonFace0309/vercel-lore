"use client";

import { experimental_useOptimistic as useOptimistic, useState } from "react";
import classNames from "classnames";

import { react, unreact } from "../app/actions";

export type Emoji = "fire" | "heart" | "rocket";

export type EmojiReactionProps = {
  eventId: string;
  label: Emoji;
  quantity: number;
  selected?: boolean;
};

const emojiMap: Record<Emoji, string> = {
  fire: "🔥",
  heart: "❤️",
  rocket: "🚀",
};

export default function EmojiReaction({
  eventId,
  label,
  quantity,
  selected = false,
}: EmojiReactionProps) {
  const [isSelected, setIsSelected] = useState(selected);
  const [optimisticQuantity, updateOptimisticQuantity] = useOptimistic(
    quantity,
    (state, type: "inc" | "decr") => (type === "inc" ? state + 1 : state - 1)
  );

  return (
    <button
      className={classNames("flex items-center justify-center mr-2 border-[1px] rounded-full px-2 border-blue-600 cursor-pointer hover:bg-blue-600", isSelected && "bg-blue-600")}
      onClick={async () => {
        if (isSelected) {
          updateOptimisticQuantity("decr");
          await unreact(eventId, label);
        } else {
          updateOptimisticQuantity("inc");
          await react(eventId, label);
        }
        setIsSelected((prev) => !prev);
      }}
    >
      <div className="mr-1">{emojiMap[label]}</div>
      <div className="text-sm font-bold text-white">{optimisticQuantity}</div>
    </button>
  );
}
