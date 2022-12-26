import Link from "next/link";
import Avatar from "../components/avatar";
import DateComponent from "../components/date";
import CoverImage from "./cover-image";

export default function PostPreview({
	title,
	coverImage,
	date,
	excerpt,
	author,
	slug,
}) {
	return (
		<div>
			<div className="mb-5">
				<CoverImage title={title} slug={slug} url={coverImage.url} />
			</div>
			<div className="px-10">
				<h3 className="text-3xl mb-3 leading-snug">
					<Link href={`/pagina/${slug}`}>
						<a className="hover:underline">{title}</a>
					</Link>
				</h3>
				<p className="text-lg leading-relaxed mb-4">{excerpt}</p>
				<div className="flex justify-end text-lg mb-4">
					<DateComponent dateString={date} />
				</div>
				{author && (
					<div className="flex justify-end">
						<Avatar name={author.name} picture={author.picture} />
					</div>
				)}
			</div>
		</div>
	);
}
