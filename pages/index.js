import Head from "next/head";
import Layout from "../components/layout";
import Intro from "../components/intro";
import Container from "../components/container";
import { getServices, getDatosEstructurados } from "../lib/contentful";
import ListServices from "../components/list-services";
import Stack from "../components/stack";

export default function Index({ services, structuredData }) {
	return (
		<>
			<Head>
				<title>
					Crear tu página web profesional para destacar tu presencia online |
					Lybre
				</title>
				<meta
					name="description"
					content="Diseñamos páginas web claras, rápidas y adaptadas a tu negocio para que conectes con más personas y destaques en Internet con confianza."
				/>
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://uancamilo.vercel.app/" />
				<link rel="icon" href="/images/logo.ico" type="image/x-icon" />
				<meta
					property="og:title"
					content="Crear tu página web profesional para destacar tu presencia online | Lybre"
				/>
				<meta
					property="og:description"
					content="Diseñamos páginas web claras, rápidas y adaptadas a tu negocio para que conectes con más personas y destaques en Internet con confianza."
				/>
				<meta property="og:url" content="https://uancamilo.vercel.app/" />
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content="https://uancamilo.vercel.app/images/og-image-lybre.png"
				/>
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />

				<script
					key="structured-data"
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
			</Head>
			<Layout>
				<Intro />
				<Container>
					{services && services.length > 0 ? (
						<section className="py-20 px-6 md:px-16">
							<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#2F2F2F]">
								Servicios
							</h2>

							<div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
								{services.map((service, index) => (
									<ListServices
										key={index}
										title={service.title}
										descripcion={service.descripcion}
										imagen={service.imagen?.url || "/images/default.svg"}
									/>
								))}
							</div>
						</section>
					) : (
						<p className="text-center text-xl text-[#2F2F2F]">
							No hay servicios disponibles en este momento.
						</p>
					)}
				</Container>
				<Stack />
			</Layout>
		</>
	);
}
export async function getStaticProps() {
	const services = await getServices();
	const datosEstructurados = await getDatosEstructurados();

	console.log(datosEstructurados[0].name);
	return {
		props: {
			services,
			structuredData: {
				"@context": "https://schema.org",
				"@type": "Person",
				name: "Juan Camilo Serna",
				url: "https://uancamilo.vercel.app/",
				image: "https://avatars.githubusercontent.com/u/36907625?v=4",
				jobTitle: "Desarrollador Fullstack",
				worksFor: {
					"@type": "Organization",
					name: "Freelance",
				},
				sameAs: [
					"https://www.linkedin.com/in/uancamilo/",
					"https://github.com/uancamilo",
					"https://www.facebook.com/uancamilo",
					"https://www.instagram.com/uancamilo/",
					"https://twitter.com/uancamilo",
					"https://www.tiktok.com/@uancamilo",
				],
				knowsAbout: [
					"React",
					"Next.js",
					"Node.js",
					"JavaScript",
					"Tailwind CSS",
					"HTML",
					"CSS",
					"Bootstrap",
					"Python",
					"Spring Boot",
					"Java",
					"SQL",
				],
				description:
					"Soy Juan Camilo Serna, desarrollador fullstack con experiencia en interfaces modernas, desarrollo web con React, Spring Boot, y optimización de sitios para performance y SEO.",
			},
		},
		revalidate: 1,
	};
}
