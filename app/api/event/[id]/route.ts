import { NextRequest, NextResponse } from "next/server";
import kv from "@vercel/kv";

import { Emoji } from "@/components/emoji-reaction";

export async function GET(
  req: NextRequest,
  context: { params: { id?: string } }
) {
  const { id } = context.params; 

  console.log(id);

  if (!id)
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });

  const reactions: Partial<Record<Emoji, number>> =
    (await kv.hgetall(id)) ?? {};
  return NextResponse.json(reactions);
}
