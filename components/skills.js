export default function Skills({ skills }) {
	const renderTags = (tags) => {
		return tags.map((tag, index) => (
			<span
				key={index}
				className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
			>
				#{tag.title}
			</span>
		));
	};

	return (
		<div className="mx-auto w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
			{skills.map((skill, index) => {
				const { title, excerpt, coverImage, tagsCollection } = skill;
				return (
					<div
						key={index}
						className="max-w-md rounded-lg overflow-hidden shadow-lg"
					>
						<img
							className="w-full rounded-t-lg"
							src={coverImage.url}
							alt={title}
						/>
						<div className="px-6 py-4">
							<div className="font-bold text-xl mb-2">{title}</div>
							<p className="text-gray-700 text-base text-justify">{excerpt}</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							{renderTags(tagsCollection.items)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
