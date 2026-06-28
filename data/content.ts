// Editable site content. These defaults mirror the current hardcoded copy and
// are the fallback whenever Supabase isn't configured / a key isn't set yet.

export interface StatItem {
	label: string;
	value: number;
	suffix: string;
	decimals?: number;
}

export interface HomeContent {
	sectors: string[];
	tagline: string;
	stats: StatItem[];
}

export const defaultHome: HomeContent = {
	sectors: [
		"Water Treatment",
		"Construction",
		"Pharmaceuticals",
		"Textiles",
		"Power Plants",
	],
	tagline:
		"Crafting high-precision industrial formulations that drive innovation across India's infrastructure.",
	stats: [
		{ label: "Experience", value: 15, suffix: "Yrs" },
		{ label: "Sectors", value: 20, suffix: "+" },
		{ label: "Portfolio", value: 100, suffix: "+" },
		{ label: "Global", value: 500, suffix: "+" },
		{ label: "Purity", value: 99.99, suffix: "%", decimals: 2 },
	],
};

export interface ContactContent {
	addressLines: string[];
	phone: string;
	email: string;
	hours: string;
	mapsUrl: string;
	mapCid: string;
}

export const defaultContact: ContactContent = {
	addressLines: ["2-2-1137, 5/B, Shivam Rd", "New Nallakunta, Hyderabad"],
	phone: "+91 98765 43210",
	email: "info@smchemicals.co.in",
	hours: "Mon - Sat: 09:00 - 18:00",
	mapsUrl:
		"https://www.google.com/maps/place//data=!4m2!3m1!1s0x3bcb99bab873583f:0x83559a538cdc44b0",
	mapCid: "9463639875625174192",
};

export const CONTENT_KEYS = {
	home: "home",
	contact: "contact",
} as const;
