import { getSession } from "next-auth/react";
import Layout from "../components/layout";

export default function Proyectos() {
	const proyectosDummy = [
		{
			nombre: "Plataforma X",
			cliente: "ACME Corp",
			estado: "Activo",
			fecha: "2024-01-10",
		},
		{
			nombre: "CRM Inmobiliario",
			cliente: "PropTech",
			estado: "En pausa",
			fecha: "2023-12-01",
		},
		{
			nombre: "Marketplace Salud",
			cliente: "Medika",
			estado: "Finalizado",
			fecha: "2023-09-15",
		},
		{
			nombre: "Sistema Inventario",
			cliente: "LogiWare",
			estado: "Activo",
			fecha: "2024-03-01",
		},
	];

	return (
		<Layout>
			<div className="px-4 sm:px-6 lg:px-8 py-6">
				<h1 className="text-2xl font-bold text-gray-800 mb-6 pt-20">
					Proyectos
				</h1>

				<div className="overflow-x-auto bg-white shadow rounded-lg">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Nombre
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Cliente
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Estado
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Fecha de creación
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{proyectosDummy.map((proyecto, idx) => (
								<tr key={idx}>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{proyecto.nombre}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{proyecto.cliente}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
												proyecto.estado === "Activo"
													? "bg-green-100 text-green-800"
													: proyecto.estado === "Finalizado"
													? "bg-gray-100 text-gray-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{proyecto.estado}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{proyecto.fecha}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</Layout>
	);
}

// ✅ Solo se valida que esté autenticado, sin filtrar por rol
export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
