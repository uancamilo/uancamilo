import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { DataBaseProvider } from "../context/DataBaseContext";
import { getSkills } from "../lib/contentful";
import { useRecursos } from "../hooks/useRecursos";

export default function Recursos({ skills }) {
	const { recursos, searchTerm, setSearchTerm, loading } = useRecursos({
		preview: false,
	});

	console.log(recursos);

	return (
		<DataBaseProvider>
			<Head>
				{/* <title>Recursos | Lybre</title>
				<meta
					name="description"
					content="Perfil profesional de Juan Camilo Serna, Desarrollador Fullstack enfocado en innovación, usabilidad y experiencias digitales cautivadoras."
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/> */}
			</Head>

			<Layout>
				<div className="flex flex-col items-center justify-start min-h-screen px-4 pt-32 space-y-8 bg-white">
					<div className="w-full max-w-5xl space-y-12">
						<div className="w-full">
							<label
								htmlFor="search-recursos"
								className="block mb-4 text-center text-2xl text-gray-800"
							>
								Buscar recursos
							</label>

							<div className="flex justify-center">
								<input
									type="text"
									id="search-recursos"
									name="search-recursos"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Escribe una o varias palabras para buscar el recurso..."
									className="w-3/4 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
									autoComplete="off"
								/>
							</div>
						</div>

						{loading ? (
							<p className="text-gray-500 text-sm text-center">Cargando...</p>
						) : recursos.length === 0 ? (
							<div className="text-center text-gray-500">
								<p className="italic mb-4">No se encontraron recursos.</p>
								<button
									onClick={() => setSearchTerm("")}
									className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
								>
									Limpiar búsqueda
								</button>
							</div>
						) : (
							<div className="w-full overflow-x-auto">
								<table className="w-full divide-y divide-gray-200 shadow border border-gray-200 rounded-md bg-white">
									<thead className="bg-gray-100">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Título
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Extracto
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Autor
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Ver
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{recursos.map((recurso, index) => (
											<tr key={index} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													{recurso.titulo}
												</td>
												<td className="px-6 py-4 whitespace-normal text-sm text-gray-600">
													{recurso.extracto}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
													{recurso.autor.name}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm">
													<a
														href={`/recursos/${recurso.slug}`}
														className="inline-block px-4 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md transition"
													>
														Ver
													</a>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</Layout>
		</DataBaseProvider>
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
