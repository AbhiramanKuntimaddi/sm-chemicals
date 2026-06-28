import { NextResponse } from "next/server";
import { z } from "zod";
import { SITE } from "@/lib/site";
import { inquiryNotification, acknowledgement } from "@/lib/email/templates";

const PayloadSchema = z.object({
	name: z.string().trim().min(1).max(200),
	email: z.string().trim().email().max(200),
	message: z.string().trim().min(1).max(5000),
	subject: z.string().trim().max(160).optional(),
	label: z.string().trim().max(60).optional(),
	fields: z.record(z.string(), z.string()).optional(),
	attachment: z
		.object({
			filename: z.string().trim().min(1).max(200),
			content: z.string().min(1), // base64 (data-URL prefix stripped client-side)
		})
		.optional(),
});

const MAX_ATTACH_BYTES = 5 * 1024 * 1024; // 5 MB
const PDF_MAGIC = [0x25, 0x50, 0x44, 0x46]; // "%PDF"

function validatePdf(
	att: { filename: string; content: string },
): { error: string } | { filename: string; content: string } {
	let bytes: Buffer;
	try {
		bytes = Buffer.from(att.content, "base64");
	} catch {
		return { error: "Attachment could not be read." };
	}
	if (bytes.length === 0) return { error: "Attachment is empty." };
	if (bytes.length > MAX_ATTACH_BYTES)
		return { error: "Attachment exceeds 5 MB." };
	if (!PDF_MAGIC.every((b, i) => bytes[i] === b))
		return { error: "Only PDF files are allowed." };
	const filename = att.filename.toLowerCase().endsWith(".pdf")
		? att.filename
		: `${att.filename}.pdf`;
	return { filename, content: bytes.toString("base64") };
}

export async function POST(req: Request) {
	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
	}

	const parsed = PayloadSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json(
			{ ok: false, error: "Please fill in your name, a valid email and a message." },
			{ status: 422 },
		);
	}

	const { name, email, message, subject, label, fields, attachment } =
		parsed.data;
	const heading = label || "New Inquiry";
	const mailSubject = subject || `${heading} — ${name}`;

	let attachments: { filename: string; content: string }[] | undefined;
	if (attachment) {
		const result = validatePdf(attachment);
		if ("error" in result)
			return NextResponse.json(
				{ ok: false, error: result.error },
				{ status: 422 },
			);
		attachments = [result];
	}

	const html = inquiryNotification(heading, {
		Name: name,
		Email: email,
		...(fields ?? {}),
		...(attachments ? { Attachment: `${attachments[0].filename} (PDF)` } : {}),
		Message: message,
	});

	const apiKey = process.env.RESEND_API_KEY;
	const from = process.env.RESEND_FROM;
	const to = process.env.CONTACT_TO || SITE.email;

	// Not configured yet — accept the submission but don't pretend it was emailed.
	if (!apiKey || !from) {
		console.warn("[contact] RESEND not configured; inquiry not emailed:", {
			heading,
			name,
			email,
		});
		return NextResponse.json({ ok: true, delivered: false });
	}

	try {
		const { Resend } = await import("resend");
		const resend = new Resend(apiKey);

		const { error: sendError } = await resend.emails.send({
			from,
			to,
			replyTo: email,
			subject: mailSubject,
			html,
			attachments,
		});
		if (sendError) {
			console.error("[contact] resend rejected the send:", sendError);
			return NextResponse.json(
				{ ok: false, error: "Email could not be sent. Please try again." },
				{ status: 502 },
			);
		}

		const { error: ackError } = await resend.emails.send({
			from,
			to: email,
			subject: `We received your inquiry — ${SITE.name}`,
			html: acknowledgement(name, heading),
		});
		if (ackError) console.warn("[contact] acknowledgement not sent:", ackError);

		return NextResponse.json({ ok: true, delivered: true });
	} catch (err) {
		console.error("[contact] send failed:", err);
		return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
	}
}
