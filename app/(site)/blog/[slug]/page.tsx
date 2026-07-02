import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/cms/blog";

function fmtDate(iso: string | null) {
	if (!iso) return "";
	return new Date(iso).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPostBySlug(slug);
	if (!post) return { title: "Post not found" };
	return {
		title: post.title,
		description: post.excerpt,
		alternates: { canonical: `/blog/${post.slug}` },
		openGraph: post.coverImage
			? { title: post.title, description: post.excerpt, images: [post.coverImage] }
			: { title: post.title, description: post.excerpt },
	};
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);
	if (!post) notFound();

	return (
		<div data-header-theme="dark">
			<article>
				<header className="dark relative bg-background-50 text-text-950 overflow-hidden pt-36 pb-12 border-b border-background-200">
					<div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-text-400 hover:text-accent-500 transition-colors mb-8"
						>
							<span>←</span> Blog
						</Link>
						<span className="block text-[11px] font-black uppercase tracking-[0.3em] text-accent-500 mb-4">
							{fmtDate(post.publishedAt)}
						</span>
						<h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.05] text-text-950">
							{post.title}
						</h1>
						{post.excerpt && (
							<p className="mt-5 max-w-2xl text-text-400 text-lg font-light leading-relaxed">
								{post.excerpt}
							</p>
						)}
					</div>
				</header>

				<div className="bg-background-50 py-16 lg:py-20">
					<div className="max-w-3xl mx-auto px-6 lg:px-10">
						{post.coverImage && (
							<div className="mb-12 overflow-hidden rounded-sm border border-background-200">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={post.coverImage}
									alt={post.title}
									className="w-full object-cover"
								/>
							</div>
						)}
						<div
							className="max-w-none text-text-800 text-lg font-light leading-relaxed [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-text-950 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-text-950 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-text-950 [&_p]:mb-5 [&_u]:underline [&_s]:line-through [&_mark]:rounded [&_mark]:bg-accent-500/30 [&_mark]:px-0.5 [&_a]:text-accent-700 [&_a]:underline [&_code]:rounded [&_code]:bg-text-950/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-text-950 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:text-background-50 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-background-50 [&_hr]:my-8 [&_hr]:border-background-200 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_strong]:font-bold [&_strong]:text-text-950 [&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-sm [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-background-200 [&_th]:bg-background-100 [&_th]:p-2.5 [&_th]:text-left [&_th]:font-bold [&_th]:text-text-950 [&_td]:border [&_td]:border-background-200 [&_td]:p-2.5"
							dangerouslySetInnerHTML={{ __html: post.body }}
						/>

						<div className="mt-16 border-t border-background-200 pt-10">
							<Link
								href="/blog"
								className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-text-950 hover:text-accent-700 transition-colors"
							>
								<span>←</span> Back to Blogs
							</Link>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}
