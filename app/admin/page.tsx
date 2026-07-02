import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { getDrafts, type SnapshotKey, type PageStatus } from "@/lib/cms/snapshots";
import { getCatalog, catalogTotals } from "@/lib/cms/products";
import { getAllPosts } from "@/lib/cms/blog";

export const metadata = { title: "Overview" };

const SECTIONS: {
	label: string;
	note: string;
	href: string;
	view: string;
	keys: SnapshotKey[];
	section: string;
}[] = [
	{
		label: "Products",
		note: "Categories & products",
		href: "/admin/products",
		view: "/products",
		keys: ["products"],
		section: "products",
	},
	{
		label: "Content",
		note: "Home figures & contact details",
		href: "/admin/content",
		view: "/",
		keys: ["home", "contact"],
		section: "content",
	},
	{
		label: "About",
		note: "Purpose, milestones & certifications",
		href: "/admin/about",
		view: "/about",
		keys: ["about"],
		section: "about",
	},
	{
		label: "Careers",
		note: "Intro, values & open roles",
		href: "/admin/careers",
		view: "/careers",
		keys: ["careers"],
		section: "careers",
	},
	{
		label: "Blog",
		note: "Posts & articles",
		href: "/admin/blog",
		view: "/blog",
		keys: [],
		section: "blog",
	},
];

export default async function AdminHome() {
	const profile = await requireStaff();
	const [drafts, catalog, posts] = await Promise.all([
		getDrafts(),
		getCatalog(),
		getAllPosts(),
	]);
	const statusByKey = new Map<string, PageStatus>(
		drafts.map((d) => [d.key, d.status]),
	);
	const productCount = catalogTotals(catalog).products;
	const blogCount = posts.length;
	const firstName = (profile.full_name?.trim() || profile.email.split("@")[0])
		.split(" ")[0];
	const perms = profile.permissions as string[];
	const visibleSections = SECTIONS.filter(
		(s) => profile.role === "founder" || perms.includes(s.section),
	);

	return (
		<div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
			<div className="mb-14">
				<div className="mb-5 flex items-center gap-3">
					<span className="h-px w-7 bg-accent-500" />
					<span className="uppercase tracking-[0.5em] text-accent-500 text-[0.6rem] font-black">
						Overview
					</span>
				</div>
				<h1 className="text-white text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
					Welcome back,{" "}
					<span className="text-white/30 font-light italic">{firstName}.</span>
				</h1>
				<p className="mt-6 max-w-xl text-white/45 text-sm font-light leading-relaxed">
					Edits are saved as drafts. When you’re ready, head to Publish to review
					what changed and push it live.
				</p>
			</div>

			<div className="grid grid-cols-1 border-t border-l border-white/10 sm:grid-cols-2 lg:grid-cols-3">
				{visibleSections.map((s) => {
					const statuses = s.keys.map((k) => statusByKey.get(k));
					const pendingState: PageStatus | null = statuses.some(
						(st) => st === "dirty",
					)
						? "dirty"
						: statuses.some((st) => st === "unpublished")
							? "unpublished"
							: null;
					const count =
						s.label === "Products"
							? productCount
							: s.label === "Blog"
								? blogCount
								: undefined;

					return (
						<div
							key={s.label}
							className="group relative flex flex-col justify-between border-b border-r border-white/10 p-8 h-44 transition-colors hover:bg-white/[0.02]"
						>
							<div>
								<div className="flex items-start justify-between gap-3">
									<Link
										href={s.href}
										className="uppercase tracking-[0.2em] text-white text-sm font-black transition-colors hover:text-accent-500"
									>
										<span className="absolute inset-0" aria-hidden />
										{s.label}
									</Link>
									{count !== undefined && (
										<span className="shrink-0 text-accent-500 text-sm font-light tabular-nums">
											{count}
											<span className="text-white/30"> items</span>
										</span>
									)}
								</div>
								<span className="mt-2 block text-white/40 text-xs font-light tracking-wide">
									{s.note}
								</span>
								{pendingState && (
									<span className="mt-3 inline-block border border-accent-500/40 bg-accent-500/10 px-2.5 py-0.5 uppercase tracking-[0.18em] text-accent-500 text-[0.52rem] font-black">
										{pendingState === "unpublished"
											? "Not published"
											: "Draft · needs publish"}
									</span>
								)}
							</div>

							<div className="relative z-10 flex items-center gap-5 text-[0.6rem] font-black uppercase tracking-[0.2em]">
								<Link
									href={s.href}
									className="text-accent-500 transition-opacity hover:opacity-70"
								>
									Manage →
								</Link>
								<a
									href={s.view}
									target="_blank"
									rel="noopener noreferrer"
									className="text-white/30 transition-colors hover:text-accent-500"
								>
									View ↗
								</a>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
