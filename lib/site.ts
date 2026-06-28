export const SITE = {
	name: "SM Chemicals",
	email: "info@smchemicals.co.in",
	phone: "+91 98765 43210",
	location: "New Nallakunta, Hyderabad",
	url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://smchemicals.co.in",
	description:
		"SM Chemicals manufactures and supplies high-purity industrial chemicals for water treatment, ETP/STP, cooling towers, boilers, textiles, construction and more across India.",
} as const;
