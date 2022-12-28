import Link from "next/link";
import Avatar from "../components/avatar";
import DateComponent from "../components/date";
import CoverImage from "../components/cover-image";

export default function HeroPost({
	title,
	coverImage,
	date,
	excerpt,
	author,
	slug,
}) {
	return (
		<section className="lg:px-28 lg:mb-12 mb-6">
			<div className="mb-8 md:mb-12 text-center">
				<CoverImage title={title} slug={slug} url={coverImage.url} />
			</div>
			<div>
				<h2 className="flex text-justify mb-4 text-2xl lg:text-6xl leading-tight">
					<Link href={`/pagina/${slug}`}>
						<a className="flex items-center sm:hover:text-purple-900 gap-2 underline underline-offset-8 sm:underline-offset-8">
							{title}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 hidden md:block lg:block"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
								/>
							</svg>
						</a>
					</Link>
				</h2>
				<p className="text-lg leading-relaxed mb-4">{excerpt}</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
				<div className="flex justify-center sm:justify-end">
					<DateComponent dateString={date} />
				</div>
				<div className="flex justify-center sm:justify-start">
					{author && <Avatar name={author.name} picture={author.picture} />}
				</div>
			</div>
		</section>
	);
}
