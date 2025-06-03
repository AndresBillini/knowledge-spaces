import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

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