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

			<div className="flex gap-5">
				<span className="flex items-center text-xl">
					<DateComponent dateString={date} />
				</span>
				{author && <Avatar name={author.name} picture={author.picture} />}
			</div>
		</section>
	);
}
