import Avatar from "../components/avatar";
import DateComponent from "../components/date";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";

export default function PostHeader({ title, coverImage, date, author }) {
	return (
		<div className="container">
			<PostTitle>{title}</PostTitle>
			<div className="mb-8 md:mb-16 sm:mx-0">
				<CoverImage title={title} url={coverImage.url} />
			</div>
			<div className="grid grid-flow-col items-center max-w-2xl mx-auto">
				<div className="text-lg">
					<DateComponent dateString={date} />
				</div>
				{author && (
					<div className="flex justify-end mx-auto">
						<Avatar name={author.name} picture={author.picture} />
					</div>
				)}
			</div>
		</div>
	);
}
