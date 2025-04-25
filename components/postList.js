import { useEffect, useState } from "react";
import { useDataBase } from "../context/DataBaseContext";

export default function PostList() {
	const { fetchEntries } = useDataBase();
	const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState({});
	const [savedComments, setSavedComments] = useState({});

	useEffect(() => {
		const loadPosts = async () => {
			const entries = await fetchEntries("estaticas");
			setPosts(entries);
		};

		loadPosts();
	}, [fetchEntries]);

	const handleLike = (postId) => {
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

	const handleCommentChange = (postId, comment) => {
		setComments((prevComments) => ({
			...prevComments,
			[postId]: comment,
		}));
	};

	const handleSaveComment = (postId) => {
		setSavedComments((prevSavedComments) => ({
			...prevSavedComments,
			[postId]: [
				...(prevSavedComments[postId] || []),
				comments[postId], 
			],
		}));

		setComments((prevComments) => ({
			...prevComments,
			[postId]: "",
		}));
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

						<div className="mt-6">
							<h4 className="text-lg font-semibold text-gray-800">
								Comentarios
							</h4>
							<textarea
								className="w-full mt-2 p-2 border rounded-md"
								placeholder="Deja un comentario..."
								value={comments[item.sys.id] || ""}
								onChange={(e) =>
									handleCommentChange(item.sys.id, e.target.value)
								}
							/>
							<button
								className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
								onClick={() => handleSaveComment(item.sys.id)}
							>
								Guardar comentario
							</button>

							{savedComments[item.sys.id] && (
								<div className="mt-4 p-4 bg-gray-100 rounded-md">
									<h5 className="font-semibold text-gray-800">
										Comentarios Guardados:
									</h5>
									<ul className="list-disc pl-6 mt-2">
										{savedComments[item.sys.id].map((comment, index) => (
											<li key={index} className="text-gray-700">
												{comment}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
