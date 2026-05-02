import { Metadata } from "next"
import { ProductsGrid } from "@/components/productspage-components/products-grid"
import ProductsHero from "@/components/productspage-components/products-hero";

export const metadata: Metadata = {
  title: "Products - SM Chemicals",
  description: "Browse our comprehensive range of industrial chemicals for water treatment, textiles, construction, and more.",
}

export default function ProductsPage() {
	return (
		<div data-header-theme="light">
			<ProductsHero />
			<ProductsGrid />
		</div>
	);
}