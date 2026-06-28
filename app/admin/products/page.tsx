import { requireRole } from "@/lib/auth";
import { getCatalog, catalogTotals } from "@/lib/cms/products";
import { ProductsManager } from "./ProductsManager";

export const metadata = { title: "Products" };

export default async function ProductsAdmin() {
	await requireRole("editor");
	const categories = await getCatalog();
	const totals = catalogTotals(categories);

	return (
		<div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
			<div className="mb-12">
				<div className="mb-5 flex items-center gap-3">
					<span className="h-px w-7 bg-accent-500" />
					<span className="uppercase tracking-[0.5em] text-accent-500 text-[0.6rem] font-black">
						Products
					</span>
				</div>
				<h1 className="text-white text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
					Catalog<span className="text-white/30 font-light italic">.</span>
				</h1>
				<p className="mt-6 text-white/45 text-sm font-light tracking-wide">
					<span className="text-white tabular-nums">{totals.categories}</span> categories
					<span className="mx-2 text-white/20">/</span>
					<span className="text-white tabular-nums">{totals.products}</span> products
				</p>
				<p className="mt-4 inline-block border border-white/15 bg-white/[0.03] px-4 py-2 text-white/45 text-xs font-medium tracking-wide">
					Add, edit &amp; delete categories and products. Changes save once
					Supabase is connected.
				</p>
			</div>

			<ProductsManager categories={categories} />
		</div>
	);
}
