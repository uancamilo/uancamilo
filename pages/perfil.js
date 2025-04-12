import React, { useState } from "react";
import Perfil from "../components/perfil";
import PerfilPDF from "../components/perfilPDF";
import Head from "next/head";
import Layout from "../components/layout";
import { getSkills } from "../lib/contentful";

export default function MostrarPerfil({ skills, structuredData, githubData }) {
	const [verWeb, setVerWeb] = useState(true);

	return (
		<>
			<Head>
				<title>Perfil | Juan Camilo Serna</title>
				<meta
					name="description"
					content="Perfil profesional de Juan Camilo Serna, Desarrollador Fullstack enfocado en innovación, usabilidad y experiencias digitales cautivadoras."
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
			</Head>

			<Layout>
				{verWeb ? (
					<Perfil data={githubData} skills={skills} onChange={setVerWeb} />
				) : (
					<PerfilPDF data={githubData} onChange={setVerWeb} />
				)}
			</Layout>
		</>
	);
}

export async function getStaticProps() {
	const skills = await getSkills();
	const userRes = await fetch("https://api.github.com/users/uancamilo");
	const githubData = await userRes.json();

	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": "https://uancamilo.vercel.app/perfil",
				url: "https://uancamilo.vercel.app/perfil",
				name: "Perfil | Juan Camilo Serna",
				description:
					"Perfil profesional de Juan Camilo Serna Front-End Developer",
				inLanguage: "es",
				isPartOf: {
					"@type": "WebSite",
					"@id": "https://uancamilo.vercel.app/",
				},
				breadcrumb: {
					"@id": "https://uancamilo.vercel.app/perfil#breadcrumb",
				},
				primaryImageOfPage: {
					"@type": "ImageObject",
					url: "https://avatars.githubusercontent.com/u/36907625?v=4",
				},
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://uancamilo.vercel.app/perfil#breadcrumb",
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: "Inicio",
						item: "https://uancamilo.vercel.app/",
					},
					{
						"@type": "ListItem",
						position: 2,
						name: "Perfil",
						item: "https://uancamilo.vercel.app/perfil",
					},
				],
			},
			{
				"@type": "Person",
				name: "Juan Camilo Serna Madrid",
				url: "https://uancamilo.vercel.app/perfil",
				image: "https://avatars.githubusercontent.com/u/36907625?v=4",
				jobTitle: "Desarrollador Fullstack",
				worksFor: {
					"@type": "Organization",
					name: "Freelance",
				},
				description:
					"Soy un apasionado Desarrollador Fullstack con experiencia en crear experiencias digitales cautivadoras. Me enfoco en la innovación y la usabilidad para brindar interfaces web impactantes y funcionales.",
				address: {
					"@type": "PostalAddress",
					addressLocality: "Medellín",
					addressRegion: "Antioquia",
					addressCountry: "Colombia",
				},
				email: "uancamilo@gmail.com",
				telephone: "+573105038505",
				sameAs: [
					"https://www.linkedin.com/in/uancamilo/",
					"https://github.com/uancamilo",
					"https://www.facebook.com/uancamilo",
					"https://www.instagram.com/uancamilo/",
					"https://twitter.com/uancamilo",
					"https://www.tiktok.com/@uancamilo",
				],
			},
		],
	};

	return {
		props: {
			skills,
			githubData,
			structuredData,
		},
	};
}
