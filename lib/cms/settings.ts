import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/cms/products";

// Reads a JSONB settings document by key; returns `fallback` when Supabase is
// not configured or the key isn't set, so the public site always renders.
export async function getSetting<T>(key: string, fallback: T): Promise<T> {
	if (!supabaseConfigured()) return fallback;
	try {
		const supabase = await createClient();
		const { data } = await supabase
			.from("site_settings")
			.select("value")
			.eq("key", key)
			.maybeSingle();
		const value = data?.value as Partial<T> | undefined;
		if (!value) return fallback;
		// Shallow-merge so newly-added fields fall back to defaults.
		return { ...fallback, ...value };
	} catch {
		return fallback;
	}
}
