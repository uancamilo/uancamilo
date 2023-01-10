import PostPreview from "../components/post-preview";

export default function MoreStories({ posts }) {
	return (
		<section>
			<h2 className="m-4 text-3xl text-center tracking-tighter leading-tight">
				Otros temas...
			</h2>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts.map((post) => (
					<PostPreview
						key={post.slug}
						title={post.title}
						coverImage={post.coverImage}
						date={post.date}
						author={post.author}
						slug={post.slug}
						excerpt={post.excerpt}
					/>
				))}
			</div>
		</section>
	);
}
