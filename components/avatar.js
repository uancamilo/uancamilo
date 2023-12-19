import ContentfulImage from "./contentful-image";
import Link from "next/link";

export default function Avatar({ name, picture }) {
	return (
		<div className="flex">
			<Link href="/perfil">
				<div className="relative w-12 h-12">
					<ContentfulImage
						src={picture.url}
						fill={true}
						className="rounded-full"
						alt={name}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
			</Link>
		</div>
	);
}
