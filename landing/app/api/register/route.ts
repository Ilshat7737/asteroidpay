import { NextResponse } from "next/server";
import { z } from "zod";
import { registerSchema } from "@/lib/validation/register";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: ["Invalid request body"] } },
      { status: 400 }
    );
  }

  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("New wallet early-access signup:", parsed.data);

  return NextResponse.json({ ok: true });
}
