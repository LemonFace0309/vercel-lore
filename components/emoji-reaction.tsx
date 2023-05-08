"use client";

export type Emoji = "fire" | "heart" | "rocket";

export type EmojiReactionProps = {
  label: Emoji;
  quantity: number;
};

const emojiMap: Record<Emoji, string> = {
  fire: "🔥",
  heart: "❤️",
  rocket: "🚀",
};

export default function EmojiReaction({ label, quantity }: EmojiReactionProps) {
  return (
    <button className="flex items-center justify-center mr-2 border-[1px] rounded-full px-2 border-blue-600 cursor-pointer hover:bg-blue-600">
      <div className="mr-1">{emojiMap[label]}</div>
      <div className="text-sm font-bold text-white">{quantity}</div>
    </button>
  );
}
