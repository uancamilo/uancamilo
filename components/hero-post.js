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
		<section className="lg:px-28 lg:mb-12">
			<div className="mb-8 md:mb-12 text-center">
				<CoverImage title={title} slug={slug} url={coverImage.url} />
			</div>
			<div>
				<h2 className="text-justify mb-4 text-4xl lg:text-6xl leading-tight">
					<Link href={`/pagina/${slug}`}>
						<a className="hover:underline">{title}</a>
					</Link>
				</h2>
				<p className="text-lg leading-relaxed mb-4">{excerpt}</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2">
				<div className="flex justify-center">
					<DateComponent dateString={date} />
				</div>
				{author && <Avatar name={author.name} picture={author.picture} />}
			</div>
		</section>
	);
}
