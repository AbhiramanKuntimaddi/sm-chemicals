import { createPublicClient } from "@/lib/supabase/public";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/cms/products";
import type { BlogPost } from "@/data/blog";

type Row = {
	id: string;
	slug: string;
	title: string;
	excerpt: string | null;
	body: string | null;
	cover_image_url: string | null;
	published: boolean;
	published_at: string | null;
};

function map(r: Row): BlogPost {
	return {
		id: r.id,
		slug: r.slug,
		title: r.title,
		excerpt: r.excerpt ?? "",
		body: r.body ?? "",
		coverImage: r.cover_image_url || undefined,
		published: r.published,
		publishedAt: r.published_at,
	};
}

// Public: published posts only, newest first.
export async function getPublishedPosts(): Promise<BlogPost[]> {
	if (!supabaseConfigured()) return [];
	try {
		const db = createPublicClient();
		const { data } = await db
			.from("blog_posts")
			.select("*")
			.eq("published", true)
			.order("published_at", { ascending: false });
		return (data ?? []).map((r) => map(r as Row));
	} catch {
		return [];
	}
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	if (!supabaseConfigured()) return null;
	try {
		const db = createPublicClient();
		const { data } = await db
			.from("blog_posts")
			.select("*")
			.eq("slug", slug)
			.eq("published", true)
			.maybeSingle();
		return data ? map(data as Row) : null;
	} catch {
		return null;
	}
}

// Admin: every post, drafts included (service role).
export async function getAllPosts(): Promise<BlogPost[]> {
	if (!supabaseConfigured()) return [];
	try {
		const admin = createAdminClient();
		const { data } = await admin
			.from("blog_posts")
			.select("*")
			.order("created_at", { ascending: false });
		return (data ?? []).map((r) => map(r as Row));
	} catch {
		return [];
	}
}
