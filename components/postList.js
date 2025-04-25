import { useEffect, useState } from "react";
import { useDataBase } from "../context/DataBaseContext";

export default function PostList() {
	const { fetchEntries } = useDataBase();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const loadPosts = async () => {
			const entries = await fetchEntries("estaticas");
			setPosts(entries);
		};

		loadPosts();
	}, [fetchEntries]);

	const handleLike = (postId) => {
		// Actualiza los likes para el post con el postId
		setPosts((prevPosts) =>
			prevPosts.map((post) =>
				post.sys.id === postId
					? {
							...post,
							fields: { ...post.fields, likes: (post.fields.likes || 0) + 1 },
					  }
					: post
			)
		);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold mb-6 pt-16 text-center text-gray-800">
				Posts
			</h2>
			<ul className="space-y-6">
				{posts.map((item) => (
					<li
						key={item.sys.id}
						className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
					>
						<h3 className="text-2xl font-semibold text-gray-800">
							{item.fields.title}
						</h3>
						<p className="text-gray-600 mb-4">{item.fields.excerpt}</p>
						<p className="text-sm text-gray-500 mb-4">
							{new Date(item.fields.date).toLocaleDateString()}
						</p>
						<div className="flex items-center space-x-4 mb-4">
							<button
								className="text-red-500 hover:text-red-700"
								onClick={() => handleLike(item.sys.id)}
							>
								❤️ Like
							</button>
							<span className="text-sm text-gray-500">
								{item.fields.likes || 0} Likes
							</span>
						</div>
						<button
							className="text-blue-500 hover:underline focus:outline-none"
							onClick={() =>
								(window.location.href = `/pagina/${item.fields.slug}`)
							}
						>
							Leer más
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
