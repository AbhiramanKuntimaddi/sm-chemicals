import { requirePermission, DEV_BYPASS } from "@/lib/auth";
import { getSetting } from "@/lib/cms/settings";
import { defaultAbout, type AboutContent } from "@/data/about";
import {
	AboutValuesForm,
	AboutTimelineForm,
	AboutCertsForm,
} from "./AboutForms";

export const metadata = { title: "About" };

export default async function AboutAdmin() {
	await requirePermission("about");
	const about = await getSetting<AboutContent>("about", defaultAbout);

	return (
		<div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
			<div className="mb-12">
				<div className="mb-5 flex items-center gap-3">
					<span className="h-px w-7 bg-accent-500" />
					<span className="uppercase tracking-[0.5em] text-accent-500 text-[0.6rem] font-black">
						About
					</span>
				</div>
				<h1 className="text-white text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
					About content<span className="text-white/30 font-light italic">.</span>
				</h1>
				<p className="mt-6 text-white/45 text-sm font-light tracking-wide">
					Edit the purpose cards, milestones timeline and certifications shown on
					the About page. Each section saves on its own. Icons stay fixed by
					position.
				</p>
				{DEV_BYPASS && (
					<p className="mt-4 inline-block border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-amber-300 text-xs font-medium tracking-wide">
						Dev mode — showing defaults. Connect Supabase to save edits.
					</p>
				)}
			</div>

			<div className="space-y-10">
				<AboutValuesForm section={about.values} />
				<AboutTimelineForm section={about.timeline} />
				<AboutCertsForm section={about.certifications} />
			</div>
		</div>
	);
}
