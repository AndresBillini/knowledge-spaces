import { NextRequest, NextResponse } from "next/server";

type tParams = Promise<{ id: string }>;

export async function POST(
  req: NextRequest,
  { params }: { params: tParams }
) {
  const { id } = await params;

  const body = await req.json();

  const apiUrl = `http://54.198.139.161/api/cards/${id}/remove_related_card/`;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ card_id: body }),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}