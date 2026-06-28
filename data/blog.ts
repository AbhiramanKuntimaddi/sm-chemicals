export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	body: string;
	coverImage?: string;
	published: boolean;
	publishedAt: string | null;
}
