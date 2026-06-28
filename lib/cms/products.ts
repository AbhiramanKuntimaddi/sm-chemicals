import {
	productCategories,
	type ProductCategory,
	type ProductSpec,
} from "@/data/products";
import { createClient } from "@/lib/supabase/server";

export function supabaseConfigured() {
	return Boolean(
		process.env.NEXT_PUBLIC_SUPABASE_URL &&
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	);
}

// Reads the catalog from Supabase when configured; otherwise (and in dev
// bypass with no Supabase) falls back to the static `data/products.ts` so the
// public site and admin still render.
export async function getCatalog(): Promise<ProductCategory[]> {
	if (!supabaseConfigured()) return productCategories;
	try {
		const supabase = await createClient();
		const [{ data: cats }, { data: prods }] = await Promise.all([
			supabase
				.from("product_categories")
				.select("id, name, blurb, sort_order")
				.order("sort_order", { ascending: true }),
			supabase
				.from("products")
				.select("id, category_id, name, description, spec, image_url, sort_order")
				.order("sort_order", { ascending: true }),
		]);

		if (!cats || cats.length === 0) return productCategories;

		return cats.map((c) => ({
			id: c.id as string,
			name: c.name as string,
			blurb: (c.blurb as string) ?? "",
			products: (prods ?? [])
				.filter((p) => p.category_id === c.id)
				.map((p) => ({
					id: p.id as string,
					name: p.name as string,
					description: (p.description as string) ?? "",
					spec: (p.spec as ProductSpec) ?? {},
					image: (p.image_url as string) || undefined,
				})),
		}));
	} catch {
		return productCategories;
	}
}

export function catalogTotals(categories: ProductCategory[]) {
	return {
		categories: categories.length,
		products: categories.reduce((n, c) => n + c.products.length, 0),
	};
}
