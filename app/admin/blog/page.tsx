import { requireRole, DEV_BYPASS } from "@/lib/auth";
import { getAllPosts } from "@/lib/cms/blog";
import { BlogManager } from "./BlogManager";

export const metadata = { title: "Blog" };

export default async function BlogAdmin() {
	await requireRole("editor");
	const posts = await getAllPosts();

	return (
		<div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
			<div className="mb-12">
				<div className="mb-5 flex items-center gap-3">
					<span className="h-px w-7 bg-accent-500" />
					<span className="uppercase tracking-[0.5em] text-accent-500 text-[0.6rem] font-black">
						Blog
					</span>
				</div>
				<h1 className="text-white text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
					Journal<span className="text-white/30 font-light italic">.</span>
				</h1>
				<p className="mt-6 text-white/45 text-sm font-light tracking-wide">
					Write posts in HTML. A post goes live on the site as soon as it&apos;s
					marked Published.
				</p>
				{DEV_BYPASS && (
					<p className="mt-4 inline-block border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-amber-300 text-xs font-medium tracking-wide">
						Dev mode — connect Supabase to save posts.
					</p>
				)}
			</div>

			<BlogManager posts={posts} />
		</div>
	);
}
