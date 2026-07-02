export const SECTIONS = [
	{ key: "products", label: "Products" },
	{ key: "content", label: "Content" },
	{ key: "about", label: "About" },
	{ key: "careers", label: "Careers" },
	{ key: "blog", label: "Blog" },
	{ key: "publish", label: "Publish" },
	{ key: "users", label: "Users" },
	{ key: "activity", label: "Activity" },
] as const;

export type Section = (typeof SECTIONS)[number]["key"];

export const ALL_SECTIONS: Section[] = SECTIONS.map((s) => s.key);

export const SECTION_LABEL: Record<Section, string> = Object.fromEntries(
	SECTIONS.map((s) => [s.key, s.label]),
) as Record<Section, string>;
