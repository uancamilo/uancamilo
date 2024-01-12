import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export default function Skills({ skills }) {
	const scrollWin = (x, y) => {
		document.getElementById("slider").scrollBy(x, y);
	};
	return (
		<div className="flex justify-center">
			<div className="self-center hidden md:block lg:px-3 xl:px-5">
				<button
					className="btn btn-outline-light shadow-none border-0 "
					id="atras"
					aria-label="hacia_atras"
					onClick={() => scrollWin(-450, 0)}
				>
					<ChevronDoubleLeftIcon className="h-6 text-indigo-900 hover:text-sky-700" />
				</button>
			</div>

			<div
				id="slider"
				className="grid grid-flow-col gap-8 overflow-x-hidden scroll-smooth py-4 px-4"
			>
				{skills.map((skill, index) => (
					<div key={index} className="w-[425px] rounded-lg shadow-lg">
						<img
							className="w-full rounded-t-lg"
							src={skill.coverImage.url}
							alt="Sunset in the mountains"
						/>
						<div className="px-6 py-4">
							<div className="font-bold text-xl mb-2">{skill.title}</div>
							<p className="text-gray-700 text-base text-justify">
								{skill.excerpt}
							</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							{skill.tagsCollection.items.map((tag, index) => (
								<span
									key={index}
									className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
								>
									# {tag.title}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="self-center hidden md:block lg:px-3 xl:px-5">
				<button
					className="btn btn-outline-light shadow-none border-0 "
					id="adelante"
					aria-label="hacia_adelante"
					onClick={() => scrollWin(450, 0)}
				>
					<ChevronDoubleRightIcon className="h-6 text-indigo-900 hover:text-sky-700" />
				</button>
			</div>
		</div>
	);
}
