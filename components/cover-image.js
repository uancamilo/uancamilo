import ContentfulImage from "./contentful-image";
import Link from "next/link";
import cn from "classnames";

export default function CoverImage({ title, url, slug }) {
	const image = (
		<ContentfulImage
			src={url}
			width={1280}
			height={640}
			priority={true}
			alt={`Imagen para ${title}`}
			className={cn("shadow-small rounded-t-lg", {
				"hover:shadow-medium transition-shadow duration-200": slug,
			})}
		/>
	);

	return (
		<div className="w-auto flex justify-center">
			{slug ? (
				<Link href={`/pagina/${slug}`} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	);
}
