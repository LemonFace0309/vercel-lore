"use server";

import kv from "@vercel/kv";
import { revalidateTag } from "next/cache";

import type { Emoji } from "@/components/emoji-reaction";

export async function react(id: string, emoji: Emoji) {
  await kv.hincrby(id, emoji, 1);
  revalidateTag("/");
}

export async function unreact(id: string, emoji: Emoji) {
  await kv.hincrby(id, emoji, -1);
  revalidateTag("/");
}