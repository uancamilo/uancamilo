import React, { useState, useEffect } from "react";

import Perfil from "../components/perfil";
import PerfilPDF from "../components/perfilPDF";

import Head from "next/head";
import Layout from "../components/layout";
import { getSkills } from "../lib/contentful";

export default function MostrarPerfil({ skills }) {
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
		},
	};
}
