"use client";

import { useEffect, experimental_useOptimistic as useOptimistic, useState } from "react";
import classNames from "classnames";

import { react, unreact } from "@/app/actions";
import useLocalStorage from "@/hooks/useLocalStorage";

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
  const [isSelected, setIsSelected] = useLocalStorage<boolean>(`${eventId}-${label}`, selected);
  const [firstRender, setFirstRender] = useState(true);
  const [optimisticQuantity, updateOptimisticQuantity] = useOptimistic(
    quantity,
    (state, newQuanatity: number) => newQuanatity
  );

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <button
      className={classNames(
        "flex items-center justify-center mr-2 border-[1px] rounded-full px-2 border-blue-600 cursor-pointer hover:bg-blue-700",
        isSelected && !firstRender && "bg-blue-600"
      )}
      onClick={async () => {
        setIsSelected((prev) => !prev);
        if (isSelected) {
          updateOptimisticQuantity(optimisticQuantity - 1);
          await unreact(eventId, label);
        } else {
          updateOptimisticQuantity(optimisticQuantity + 1);
          await react(eventId, label);
        }
      }}
    >
      <div className="mr-1">{emojiMap[label]}</div>
      <div className="text-sm font-bold text-white">{optimisticQuantity}</div>
    </button>
  );
}
