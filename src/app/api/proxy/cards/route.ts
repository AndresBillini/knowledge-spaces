import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  const apiUrl = `http://54.198.139.161/api/cards/?page=${page}&search=${search}`;

  const res = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}