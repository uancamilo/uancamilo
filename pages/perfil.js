import React, { useState, useEffect } from "react";

import Perfil from "../components/perfil";
import PerfilPDF from "../components/perfilPDF";

import Head from "next/head";
import Layout from "../components/layout";
import { getSkills } from "../lib/contentful";

export default function MostrarPerfil({ skills, structuredData }) {
	const [verWeb, setVerWeb] = useState(true);
	const [data, setData] = useState(null);

	async function fetchData() {
		try {
			const response = await fetch("https://api.github.com/users/uancamilo");
			setData(await response.json());
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	if (!data) {
		return "loading...";
	}

	return (
		<>
			<Layout>
				<Head>
					<title>Perfil | Juan Camilo Serna</title>
					<meta
						name="description"
						content="Perfil profesional de Juan Camilo Serna Fron-End Developer"
					/>
					<script
						key="structured-data"
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(structuredData),
						}}
					/>
				</Head>
				{verWeb ? (
					<Perfil data={data} skills={skills} onChange={setVerWeb} />
				) : (
					<PerfilPDF data={data} onChange={setVerWeb} />
				)}
			</Layout>
		</>
	);
}

export async function getStaticProps() {
	const skills = await getSkills();
	return {
		props: {
			skills,
			structuredData: {
				"@context": "https://schema.org",
				"@type": "Person",
				name: "Juan Camilo Serna Madrid",
				url: "https://uancamilo.vercel.app/perfil",
				image: "https://avatars.githubusercontent.com/u/36907625?v=4",
				jobTitle: "Front-End Developer",
				description:
					"Soy un apasionado Front-End Developer con experiencia en crear experiencias digitales cautivadoras. Me enfoco en la innovación y la usabilidad para brindar interfaces web impactantes y funcionales.",
				address: {
					"@type": "PostalAddress",
					addressLocality: "Medellín",
					addressRegion: "Antioquia",
					addressCountry: "Colombia",
				},
				email: "uancamilo@gmail.com",
				telephone: "+57 300 553 4 553",
				sameAs: ["https://www.linkedin.com/in/uancamilo/"],
			},
		},
	};
}
