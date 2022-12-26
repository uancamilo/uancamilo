import ContentfulImage from "./contentful-image";
import Link from "next/link";

export default function Avatar({ name, picture }) {
	return (
		<>
			<span className="flex items-center text-xl mr-4"> Autor:</span>
			<Link href="/perfil">
				<a className="flex items-center">
					<div className="text-xl font-bold mr-4">{name}</div>
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
		</>
	);
}
