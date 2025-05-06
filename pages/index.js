import Head from "next/head";
import Usp from "../components/usp";
import Intro from "../components/intro";
import Stack from "../components/stack";
import Layout from "../components/layout";
import Container from "../components/container";
import ListServices from "../components/list-services";
import { getServices, getDatosEstructurados } from "../lib/contentful";

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
				<meta property="og:site_name" content="Lybre" />
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
										alt={service.title || "Imagen de servicio"}
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
				<Usp />
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
				"@type": "Organization",
				name: "Lybre",
				url: "https://uancamilo.vercel.app/",
				logo: "https://avatars.githubusercontent.com/u/36907625?v=4",
				sameAs: [
					"https://www.linkedin.com/company/lybredev/",
					"https://www.facebook.com/lybredev",
					"https://github.com/uancamilo",
				],
				description:
					"Diseñamos páginas web claras, rápidas y adaptadas a tu negocio para que conectes con más personas y destaques en Internet con confianza.",
				contactPoint: {
					"@type": "ContactPoint",
					telephone: "+57-310-5038505",
					contactType: "customer support",
					areaServed: "CO",
					availableLanguage: ["Spanish", "English"],
				},
			},
		},
		revalidate: 1,
	};
}
