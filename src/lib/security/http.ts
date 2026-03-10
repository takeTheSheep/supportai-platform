import { NextResponse } from "next/server";

export const ok = <T>(data: T, status = 200) =>
  NextResponse.json(data, { status });

export const fail = (message: string, status = 400, details?: unknown) =>
  NextResponse.json({ error: message, details }, { status });

