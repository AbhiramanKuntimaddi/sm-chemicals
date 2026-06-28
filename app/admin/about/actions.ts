"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireRole, DEV_BYPASS } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/cms/products";
import { logActivity } from "@/lib/cms/activity";
import type { AboutContent } from "@/data/about";

export type AboutState = { ok?: string; error?: string };

const DEV_NOTICE = "Dev mode — connect Supabase to save content.";

const s = (v: unknown) => String(v ?? "").trim();

export async function saveAbout(
	_prev: AboutState,
	formData: FormData,
): Promise<AboutState> {
	await requireRole("editor");
	if (DEV_BYPASS && !supabaseConfigured()) return { error: DEV_NOTICE };

	let parsed: Partial<AboutContent>;
	try {
		parsed = JSON.parse(String(formData.get("payload") ?? ""));
	} catch {
		return { error: "Could not read the form data." };
	}

	const content: AboutContent = {
		values: {
			eyebrow: s(parsed.values?.eyebrow),
			heading: s(parsed.values?.heading),
			cards: (parsed.values?.cards ?? [])
				.map((c) => ({ title: s(c?.title), body: s(c?.body) }))
				.filter((c) => c.title || c.body),
		},
		timeline: {
			eyebrow: s(parsed.timeline?.eyebrow),
			heading: s(parsed.timeline?.heading),
			headingAccent: s(parsed.timeline?.headingAccent),
			items: (parsed.timeline?.items ?? [])
				.map((it) => ({
					year: s(it?.year),
					title: s(it?.title),
					description: s(it?.description),
				}))
				.filter((it) => it.year || it.title || it.description),
		},
		certifications: {
			eyebrow: s(parsed.certifications?.eyebrow),
			heading: s(parsed.certifications?.heading),
			headingAccent: s(parsed.certifications?.headingAccent),
			body: s(parsed.certifications?.body),
			specs: (parsed.certifications?.specs ?? [])
				.map((sp) => ({ title: s(sp?.title), detail: s(sp?.detail) }))
				.filter((sp) => sp.title || sp.detail),
		},
	};

	if (!content.values.heading) return { error: "Values heading is required." };
	if (!content.timeline.heading)
		return { error: "Timeline heading is required." };
	if (!content.certifications.heading)
		return { error: "Certifications heading is required." };

	const admin = createAdminClient();
	const { error } = await admin
		.from("site_settings")
		.upsert({ key: "about", value: content }, { onConflict: "key" });
	if (error) return { error: error.message };

	revalidatePath("/admin/about");
	await logActivity("edit", "About", "Updated about content");
	return { ok: "Saved." };
}
