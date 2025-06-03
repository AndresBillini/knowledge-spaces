import { NextRequest, NextResponse } from "next/server";

type tParams = Promise<{ id: string }>;

export async function GET(
  req: NextRequest,
  context: { params: tParams }
) {
  const { id } = await context.params;

  const apiUrl = `http://54.198.139.161/api/cards/${id}/`;

  const res = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch card" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}