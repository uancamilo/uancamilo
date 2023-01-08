import Link from "next/link";

export default function Button() {
	return (
		<div className="flex justify-center">
			<Link href="/contacto">
				<button className="p-4 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none text-white ">
					Contacta un equipo de desarrollo
				</button>
			</Link>
		</div>
	);
}
