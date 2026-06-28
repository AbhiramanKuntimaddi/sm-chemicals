import { requireRole, DEV_BYPASS } from "@/lib/auth";
import { getDrafts } from "@/lib/cms/snapshots";
import { supabaseConfigured } from "@/lib/cms/products";
import { PublishPanel } from "./PublishPanel";

export const metadata = { title: "Publish" };

export default async function PublishAdmin() {
	await requireRole("admin");
	const pages = await getDrafts();
	const dirty = pages.filter((p) => p.status !== "clean").length;

	return (
		<div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
			<div className="mb-12">
				<div className="mb-5 flex items-center gap-3">
					<span className="h-px w-7 bg-accent-500" />
					<span className="uppercase tracking-[0.5em] text-accent-500 text-[0.6rem] font-black">
						Publish
					</span>
				</div>
				<h1 className="text-white text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
					Go live
					<span className="text-white/30 font-light italic">.</span>
				</h1>
				<p className="mt-6 max-w-xl text-white/45 text-sm font-light leading-relaxed">
					Your edits stay as drafts until you publish. Review what changed, then
					push each section — or everything — live.{" "}
					{dirty > 0 ? (
						<span className="text-accent-500">
							{dirty} section{dirty === 1 ? "" : "s"} with unpublished changes.
						</span>
					) : (
						<span className="text-white/30">Everything is up to date.</span>
					)}
				</p>
				{DEV_BYPASS && (
					<p className="mt-4 inline-block border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-amber-300 text-xs font-medium tracking-wide">
						Dev mode — publishing is disabled. Connect Supabase to go live.
					</p>
				)}
				{!DEV_BYPASS && !supabaseConfigured() && (
					<p className="mt-4 inline-block border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-amber-300 text-xs font-medium tracking-wide">
						Supabase isn’t configured — set the env vars to enable publishing.
					</p>
				)}
			</div>

			<PublishPanel pages={pages} />
		</div>
	);
}
