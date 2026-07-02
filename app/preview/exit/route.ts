import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const raw = searchParams.get("path") || "/";
	const path = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";

	(await draftMode()).disable();
	return NextResponse.redirect(new URL(path, request.url));
}
