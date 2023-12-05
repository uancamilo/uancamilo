import Link from "next/link";
import Skills from "./skills";
import Container from "../components/container";

const skills = [
	{
		title: "HTML, JavaScript y CSS",
		description:
			"HTML estructura, CSS estilo y JavaScript interactividad en desarrollo web, formando la base para crear páginas dinámicas y atractivas.",
	},
	{
		title: "React con Next",
		description:
			"React es una biblioteca JavaScript para interfaces de usuario, mientras que Next.js es un marco que extiende React para facilitar el desarrollo web, ofreciendo enrutamiento y renderización del lado del servidor.",
	},
	{
		title: "Scrum Master",
		description:
			"Facilitador ágil y líder de equipo. Optimiza la entrega de proyectos mediante la implementación efectiva de la metodología Scrum.",
	},
	{
		title: "Firebase y Vercel",
		description:
			"Firebase: Plataforma de desarrollo para aplicaciones web y móviles con servicios como base de datos y autenticación. Vercel: Plataforma para despliegue y alojamiento rápido de aplicaciones web.",
	},
	{
		title: "Hotjar + Analytics",
		description:
			"Optimiza tu sitio con Hotjar para análisis de comportamiento y Google Analytics para datos cuantitativos, mejorando la experiencia del usuario y tomando decisiones informadas en marketing digital.",
	},
	{
		title: "Hubspot",
		description:
			"Plataforma integral de marketing, ventas y servicios. Impulsa el crecimiento empresarial con automatización, análisis y experiencia del cliente.",
	},
	{
		title: "Contentfull",
		description:
			"Plataforma de gestión de contenido API-first. Crea, gestiona y entrega contenido de manera flexible y eficiente en todos los canales digitales",
	},
	{
		title: "Node.js",
		description:
			"Entorno de ejecución de JavaScript del lado del servidor. Eficiente y escalable, ideal para construir aplicaciones web y APIs en tiempo real.",
	},
];

export default function Perfil(props) {
	return (
		<>
			<div className="pt-16">
				<div className="relative overflow-hidden bg-white">
					<div className="mx-auto max-w-7xl">
						<div className="relative md:z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
							<svg
								className="absolute z-10 inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
								fill="currentColor"
								viewBox="0 0 100 100"
								preserveAspectRatio="none"
								aria-hidden="true"
							>
								<polygon fill="" points="0,0 50,0 100,100 0,100" />
							</svg>
							<main className="mx-4 max-w-7xl">
								<div className="text-center lg:pr-5">
									<h1 className="text-4xl pt-7 font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
										<span className="block">Soy Juan Camilo,</span>{" "}
										<span className="block text-indigo-600 sm:my-8 lg:my-10v">
											frontEnd dev <span className="italic"> passionate.</span>
										</span>
									</h1>
									<p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-10">
										Unir creatividad y usabilidad para generar las mejores
										experiencias de los usuarios{" "}
										<span className="italic">− mi reto −.</span>
									</p>
									<div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
										<div className="rounded-md shadow">
											<button
												onClick={() => {
													props.onChange(!props.onChange);
												}}
												className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
											>
												Descargar C.V.
											</button>
										</div>
										<div className="mt-3 sm:mt-0 sm:ml-3">
											<Link href="/contacto">
												<a className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg">
													¡Contáctame!
												</a>
											</Link>
										</div>
									</div>
								</div>
							</main>
						</div>
					</div>
					{/* Imagen de perfil */}
					<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
						<img
							className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
							src={props.data.avatar_url}
							alt="uancamilo"
						/>
					</div>
					<p>{props.verPDF}</p>
				</div>
				<Container>
					<div>
						<h2 className="text-4xl text-center font-bold text-indigo-700 my-8">
							Habilidades y conocimientos
						</h2>
					</div>
					<Skills skills={skills} />
				</Container>
			</div>
		</>
	);
}
