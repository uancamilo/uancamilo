
import CoverImage from "../components/cover-image";
import EstaticasTitle from "../components/estaticas-title";

export default function PostHeader({ title, coverImage }) {
	return (
		<div className="container mb-10">
			<EstaticasTitle>{title}</EstaticasTitle>
			<div className="mb-8 md:mb-16 sm:mx-0">
				<CoverImage title={title} url={coverImage.url} />
			</div>
			<div className="grid justify-center gap-5 sm:flex"></div>
		</div>
	);
}
