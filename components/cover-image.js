import ContentfulImage from "./contentful-image";
import Link from "next/link";
import cn from "classnames";

export default function CoverImage({ title, url, slug }) {
	const image = (
		<ContentfulImage
			width={1280}
			height={640}
			alt={`Imagen para ${title}`}
			className={cn("shadow-small rounded-t-lg", {
				"hover:shadow-medium transition-shadow duration-200": slug,
			})}
			src={url}
		/>
	);

	return (
		<div className="w-auto flex justify-center">
			{slug ? (
				<Link href={`/pagina/${slug}`}>
					<a aria-label={title}>{image}</a>
				</Link>
			) : (
				image
			)}
		</div>
	);
}
