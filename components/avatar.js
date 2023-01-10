import ContentfulImage from "./contentful-image";
import Link from "next/link";

export default function Avatar({ name, picture }) {
	return (
		<div className="flex">
			<Link href="/perfil">
				<a>
					<div className="relative w-12 h-12">
						<ContentfulImage
							src={picture.url}
							layout="fill"
							className="rounded-full"
							alt={name}
						/>
					</div>
				</a>
			</Link>
		</div>
	);
}
