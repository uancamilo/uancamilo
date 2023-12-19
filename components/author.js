import Link from "next/link";
export default function Author({ name }) {
	return (
		<Link href="/perfil">
			<div className="text-lg flex items-start">{name}</div>
		</Link>
	);
}
