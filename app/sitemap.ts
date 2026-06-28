import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ["", "/products", "/about", "/careers", "/contact"];
	const now = new Date();
	return routes.map((path) => ({
		url: `${SITE.url}${path}`,
		lastModified: now,
		changeFrequency: path === "" ? "weekly" : "monthly",
		priority: path === "" ? 1 : 0.7,
	}));
}
