export interface Category {
	id: string;
	name: string;
}

export interface Product {
	id: number;
	category: string;
	featured: boolean;
	name: string;
	description: string;
	items: string[];
}

export const categories: Category[] = [
	{ id: "all", name: "All Products" },
	{ id: "water", name: "Water Treatment" },
	{ id: "etp", name: "ETP / STP" },
	{ id: "construction", name: "Construction" },
	{ id: "textile", name: "Textile" },
	{ id: "pharma", name: "Pharmaceutical" },
	{ id: "boiler", name: "Boiler Chemicals" },
	{ id: "cooling", name: "Cooling Tower" },
];

export const products: Product[] = [
	{
		id: 1,
		category: "water",
		featured: true,
		name: "Water Treatment Chemicals",
		description:
			"Comprehensive coagulants, flocculants, pH adjusters, and disinfectants for industrial water purification.",
		items: [
			"Polyaluminium Chloride (PAC)",
			"Ferric Chloride",
			"Sodium Hypochlorite",
			"Alum",
			"Caustic Soda",
			"Hydrochloric Acid",
		],
	},
	{
		id: 2,
		category: "etp",
		featured: true,
		name: "ETP / STP Chemicals",
		description:
			"Specialised chemicals for effluent and sewage treatment ensuring environmental compliance.",
		items: [
			"Anionic Polyelectrolyte",
			"Cationic Polyelectrolyte",
			"Anti-Foam Agents",
			"Defoamers",
			"Bio-Culture",
			"Nutrient Solutions",
		],
	},
	{
		id: 3,
		category: "construction",
		featured: false,
		name: "Construction Chemicals",
		description:
			"High-performance additives for concrete and building materials enhancing strength and durability.",
		items: [
			"Plasticizers",
			"Superplasticizers",
			"Waterproofing Compounds",
			"Curing Compounds",
			"Grout Additives",
			"Bonding Agents",
		],
	},
	{
		id: 4,
		category: "textile",
		featured: false,
		name: "Textile Chemicals",
		description:
			"Complete range for textile processing and finishing from pre-treatment to final application.",
		items: [
			"Softeners",
			"Fixing Agents",
			"Leveling Agents",
			"Anti-Pilling Agents",
			"Wetting Agents",
			"Sequestering Agents",
		],
	},
	{
		id: 5,
		category: "pharma",
		featured: false,
		name: "Pharmaceutical Chemicals",
		description:
			"High-purity chemicals for pharmaceutical manufacturing meeting stringent quality standards.",
		items: [
			"Solvents",
			"Reagents",
			"APIs",
			"Intermediates",
			"Excipients",
			"Buffer Solutions",
		],
	},
	{
		id: 6,
		category: "boiler",
		featured: true,
		name: "Boiler Water Chemicals",
		description:
			"Specialised treatment preventing scale, corrosion, and deposits in industrial boiler systems.",
		items: [
			"Oxygen Scavengers",
			"Scale Inhibitors",
			"Corrosion Inhibitors",
			"Alkalinity Builders",
			"Condensate Treatment",
			"Sludge Conditioners",
		],
	},
	{
		id: 7,
		category: "cooling",
		featured: false,
		name: "Cooling Tower Chemicals",
		description:
			"Complete water treatment for cooling systems ensuring optimal heat transfer efficiency.",
		items: [
			"Biocides",
			"Scale & Corrosion Inhibitors",
			"Dispersants",
			"pH Controllers",
			"Legionella Control",
			"Biodispersants",
		],
	},
	{
		id: 8,
		category: "etp",
		featured: false,
		name: "Sludge Treatment",
		description:
			"Solutions for sludge dewatering, thickening, and management in treatment facilities.",
		items: [
			"Dewatering Polymers",
			"Thickening Agents",
			"Conditioning Chemicals",
			"Odor Control",
			"Sludge Digesters",
		],
	},
];
