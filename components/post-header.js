import Avatar from "../components/avatar";
import DateComponent from "../components/date";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";

export default function PostHeader({ title, coverImage, date, author }) {
	return (
		<div className="container mb-10">
			<PostTitle>{title}</PostTitle>
			<div className="mb-8 md:mb-16 sm:mx-0">
				<CoverImage title={title} url={coverImage.url} />
			</div>

			<div className="grid grid-cols-0 sm:grid-cols-2 gap-5">
				<DateComponent dateString={date} />
				<Avatar name={author.name} picture={author.picture} />
			</div>
		</div>
	);
}
