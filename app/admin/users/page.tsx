import { requireRole, DEV_BYPASS } from "@/lib/auth";
import { getProfiles } from "@/lib/cms/users";
import { UsersManager } from "./UsersManager";
import { AdminInvite } from "./AdminInvite";

export const metadata = { title: "Users" };

export default async function UsersRoute() {
	const profile = await requireRole("admin");
	const members = await getProfiles();

	return (
		<div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
			<div className="mb-12">
				<div className="mb-5 flex items-center gap-3">
					<span className="h-px w-7 bg-accent-500" />
					<span className="uppercase tracking-[0.5em] text-accent-500 text-[0.6rem] font-black">
						Users
					</span>
				</div>
				<h1 className="text-white text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
					Team <span className="text-white/30 font-light italic">access.</span>
				</h1>
				<p className="mt-6 max-w-xl text-white/45 text-sm font-light leading-relaxed">
					Manage who can sign in. Change roles, reset passwords, or remove
					accounts.
				</p>
				{DEV_BYPASS && (
					<p className="mt-4 inline-block border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-amber-300 text-xs font-medium tracking-wide">
						Dev mode — sample data. Connect Supabase to manage real users.
					</p>
				)}
			</div>

			<UsersManager
				members={members}
				currentUserId={profile.id}
				currentRole={profile.role}
			/>

			<div className="mt-16 border-t border-white/10 pt-14">
				<div className="mb-2 flex items-center gap-3">
					<span className="h-px w-5 bg-accent-500/60" />
					<span className="uppercase tracking-[0.3em] text-white/70 text-[0.66rem] font-black">
						Add a team member
					</span>
				</div>
				<p className="mb-8 text-white/45 text-sm font-light">
					They sign in with the email and password you set here.
				</p>
				<AdminInvite />
			</div>
		</div>
	);
}
