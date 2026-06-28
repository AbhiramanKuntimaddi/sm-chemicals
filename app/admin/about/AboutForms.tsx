"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { saveAbout, type AboutState } from "./actions";
import type {
	AboutContent,
	AboutValueCard,
	CertSpec,
	TimelineItem,
} from "@/data/about";

const inputCls =
	"w-full border-b border-white/15 bg-transparent py-2.5 text-white text-sm font-light outline-none transition-colors placeholder:text-white/20 focus:border-accent-500";
const labelCls =
	"uppercase tracking-[0.25em] text-white/40 text-[0.55rem] font-black";
const btnCls =
	"inline-flex items-center gap-2 bg-accent-500 px-7 py-3.5 uppercase tracking-[0.3em] text-black text-[0.65rem] font-black transition-colors hover:bg-white disabled:opacity-50 cursor-pointer";
const ghostBtnCls =
	"inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 uppercase tracking-[0.25em] text-white/60 text-[0.58rem] font-black transition-colors hover:border-accent-500 hover:text-accent-500 cursor-pointer";

function Eyebrow({ children }: { children: React.ReactNode }) {
	return (
		<div className="mb-8 flex items-center gap-3">
			<span className="h-px w-6 bg-accent-500" />
			<h2 className="uppercase tracking-[0.4em] text-accent-500 text-[0.62rem] font-black">
				{children}
			</h2>
		</div>
	);
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label="Remove"
			className="shrink-0 text-white/30 transition-colors hover:text-red-400 cursor-pointer"
		>
			<Trash2 size={15} />
		</button>
	);
}

export function AboutForm({ about }: { about: AboutContent }) {
	const router = useRouter();
	const [state, action, pending] = useActionState(saveAbout, {} as AboutState);
	const [data, setData] = useState<AboutContent>(about);

	useEffect(() => {
		if (state.ok) router.refresh();
	}, [state]); // eslint-disable-line react-hooks/exhaustive-deps

	const cards = data.values.cards;
	const items = data.timeline.items;
	const specs = data.certifications.specs;

	const setCards = (next: AboutValueCard[]) =>
		setData((p) => ({ ...p, values: { ...p.values, cards: next } }));
	const setItems = (next: TimelineItem[]) =>
		setData((p) => ({ ...p, timeline: { ...p.timeline, items: next } }));
	const setSpecs = (next: CertSpec[]) =>
		setData((p) => ({
			...p,
			certifications: { ...p.certifications, specs: next },
		}));

	const payload = JSON.stringify(data);

	return (
		<form action={action} className="space-y-10">
			<input type="hidden" name="payload" value={payload} />

			<section className="border border-white/10 bg-white/[0.02] p-8">
				<Eyebrow>Purpose & direction</Eyebrow>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<label className="flex flex-col gap-1.5">
						<span className={labelCls}>Eyebrow</span>
						<input
							value={data.values.eyebrow}
							onChange={(e) =>
								setData((p) => ({
									...p,
									values: { ...p.values, eyebrow: e.target.value },
								}))
							}
							className={inputCls}
						/>
					</label>
					<label className="flex flex-col gap-1.5">
						<span className={labelCls}>Heading</span>
						<input
							value={data.values.heading}
							onChange={(e) =>
								setData((p) => ({
									...p,
									values: { ...p.values, heading: e.target.value },
								}))
							}
							className={inputCls}
						/>
					</label>
				</div>

				<div className="mt-8 mb-2 flex items-center gap-3">
					<span className="h-px w-5 bg-accent-500/60" />
					<span className="uppercase tracking-[0.3em] text-white/60 text-[0.6rem] font-black">
						Cards
					</span>
				</div>
				<div className="divide-y divide-white/10">
					{cards.map((c, i) => (
						<div key={i} className="flex items-start gap-4 py-4">
							<div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
								<label className="flex flex-col gap-1">
									<span className={labelCls}>Title</span>
									<input
										value={c.title}
										onChange={(e) =>
											setCards(
												cards.map((x, j) =>
													j === i ? { ...x, title: e.target.value } : x,
												),
											)
										}
										className={inputCls}
									/>
								</label>
								<label className="flex flex-col gap-1 sm:col-span-2">
									<span className={labelCls}>Body</span>
									<input
										value={c.body}
										onChange={(e) =>
											setCards(
												cards.map((x, j) =>
													j === i ? { ...x, body: e.target.value } : x,
												),
											)
										}
										className={inputCls}
									/>
								</label>
							</div>
							<div className="mt-5">
								<RemoveBtn onClick={() => setCards(cards.filter((_, j) => j !== i))} />
							</div>
						</div>
					))}
				</div>
				<button
					type="button"
					onClick={() => setCards([...cards, { title: "", body: "" }])}
					className={`${ghostBtnCls} mt-5`}
				>
					<Plus size={13} /> Add card
				</button>
			</section>

			<section className="border border-white/10 bg-white/[0.02] p-8">
				<Eyebrow>Milestones</Eyebrow>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<label className="flex flex-col gap-1.5">
						<span className={labelCls}>Eyebrow</span>
						<input
							value={data.timeline.eyebrow}
							onChange={(e) =>
								setData((p) => ({
									...p,
									timeline: { ...p.timeline, eyebrow: e.target.value },
								}))
							}
							className={inputCls}
						/>
					</label>
					<label className="flex flex-col gap-1.5">
						<span className={labelCls}>Heading</span>
						<input
							value={data.timeline.heading}
							onChange={(e) =>
								setData((p) => ({
									...p,
									timeline: { ...p.timeline, heading: e.target.value },
								}))
							}
							className={inputCls}
						/>
					</label>
					<label className="flex flex-col gap-1.5">
						<span className={labelCls}>Heading accent (italic)</span>
						<input
							value={data.timeline.headingAccent}
							onChange={(e) =>
								setData((p) => ({
									...p,
									timeline: { ...p.timeline, headingAccent: e.target.value },
								}))
							}
							className={inputCls}
						/>
					</label>
				</div>

				<div className="mt-8 mb-2 flex items-center gap-3">
					<span className="h-px w-5 bg-accent-500/60" />
					<span className="uppercase tracking-[0.3em] text-white/60 text-[0.6rem] font-black">
						Entries
					</span>
				</div>
				<div className="space-y-px">
					{items.map((it, i) => (
						<div
							key={i}
							className="relative border border-white/10 bg-white/[0.02] p-6"
						>
							<div className="absolute right-5 top-5">
								<RemoveBtn onClick={() => setItems(items.filter((_, j) => j !== i))} />
							</div>
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
								<label className="flex flex-col gap-1.5">
									<span className={labelCls}>Year</span>
									<input
										value={it.year}
										onChange={(e) =>
											setItems(
												items.map((x, j) =>
													j === i ? { ...x, year: e.target.value } : x,
												),
											)
										}
										className={inputCls}
									/>
								</label>
								<label className="flex flex-col gap-1.5 sm:col-span-2">
									<span className={labelCls}>Title</span>
									<input
										value={it.title}
										onChange={(e) =>
											setItems(
												items.map((x, j) =>
													j === i ? { ...x, title: e.target.value } : x,
												),
											)
										}
										className={inputCls}
									/>
								</label>
							</div>
							<label className="mt-5 flex flex-col gap-1.5">
								<span className={labelCls}>Description</span>
								<textarea
									value={it.description}
									onChange={(e) =>
										setItems(
											items.map((x, j) =>
												j === i ? { ...x, description: e.target.value } : x,
											),
										)
									}
									rows={2}
									className={`${inputCls} resize-none`}
								/>
							</label>
						</div>
					))}
				</div>
				<button
					type="button"
					onClick={() =>
						setItems([...items, { year: "", title: "", description: "" }])
					}
					className={`${ghostBtnCls} mt-5`}
				>
					<Plus size={13} /> Add milestone
				</button>
			</section>

			<section className="border border-white/10 bg-white/[0.02] p-8">
				<Eyebrow>Certifications</Eyebrow>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<label className="flex flex-col gap-1.5">
						<span className={labelCls}>Eyebrow</span>
						<input
							value={data.certifications.eyebrow}
							onChange={(e) =>
								setData((p) => ({
									...p,
									certifications: {
										...p.certifications,
										eyebrow: e.target.value,
									},
								}))
							}
							className={inputCls}
						/>
					</label>
					<label className="flex flex-col gap-1.5">
						<span className={labelCls}>Heading</span>
						<input
							value={data.certifications.heading}
							onChange={(e) =>
								setData((p) => ({
									...p,
									certifications: {
										...p.certifications,
										heading: e.target.value,
									},
								}))
							}
							className={inputCls}
						/>
					</label>
					<label className="flex flex-col gap-1.5">
						<span className={labelCls}>Heading accent (italic)</span>
						<input
							value={data.certifications.headingAccent}
							onChange={(e) =>
								setData((p) => ({
									...p,
									certifications: {
										...p.certifications,
										headingAccent: e.target.value,
									},
								}))
							}
							className={inputCls}
						/>
					</label>
				</div>

				<label className="mt-6 flex flex-col gap-1.5">
					<span className={labelCls}>Body</span>
					<textarea
						value={data.certifications.body}
						onChange={(e) =>
							setData((p) => ({
								...p,
								certifications: { ...p.certifications, body: e.target.value },
							}))
						}
						rows={3}
						className={`${inputCls} resize-none`}
					/>
				</label>

				<div className="mt-8 mb-2 flex items-center gap-3">
					<span className="h-px w-5 bg-accent-500/60" />
					<span className="uppercase tracking-[0.3em] text-white/60 text-[0.6rem] font-black">
						Spec tiles
					</span>
				</div>
				<div className="divide-y divide-white/10">
					{specs.map((sp, i) => (
						<div key={i} className="flex items-start gap-4 py-4">
							<div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
								<label className="flex flex-col gap-1">
									<span className={labelCls}>Title</span>
									<input
										value={sp.title}
										onChange={(e) =>
											setSpecs(
												specs.map((x, j) =>
													j === i ? { ...x, title: e.target.value } : x,
												),
											)
										}
										className={inputCls}
									/>
								</label>
								<label className="flex flex-col gap-1">
									<span className={labelCls}>Detail</span>
									<input
										value={sp.detail}
										onChange={(e) =>
											setSpecs(
												specs.map((x, j) =>
													j === i ? { ...x, detail: e.target.value } : x,
												),
											)
										}
										className={inputCls}
									/>
								</label>
							</div>
							<div className="mt-5">
								<RemoveBtn onClick={() => setSpecs(specs.filter((_, j) => j !== i))} />
							</div>
						</div>
					))}
				</div>
				<button
					type="button"
					onClick={() => setSpecs([...specs, { title: "", detail: "" }])}
					className={`${ghostBtnCls} mt-5`}
				>
					<Plus size={13} /> Add spec tile
				</button>
			</section>

			<div className="flex items-center gap-4">
				<button type="submit" disabled={pending} className={btnCls}>
					{pending ? "Saving…" : "Save about"}
				</button>
				{state.error && <span className="text-red-400 text-xs">{state.error}</span>}
				{state.ok && <span className="text-accent-500 text-xs">{state.ok}</span>}
			</div>
		</form>
	);
}
