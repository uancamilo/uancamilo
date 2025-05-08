import Layout from "../components/layout";

export async function getServerSideProps({ req }) {
	const cookie = req.headers.cookie || "";

	if (!cookie.includes("jwt=")) {
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


export default function Dashboard() {
	return (
		<Layout>
			<div className="px-4 sm:px-6 lg:px-8 py-6">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

				{/* Tarjetas resumen */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					<div className="bg-white shadow rounded-lg p-5">
						<h3 className="text-lg font-medium text-gray-700">
							Usuarios activos
						</h3>
						<p className="mt-2 text-3xl font-bold text-[#34A853]">124</p>
					</div>
					<div className="bg-white shadow rounded-lg p-5">
						<h3 className="text-lg font-medium text-gray-700">Órdenes hoy</h3>
						<p className="mt-2 text-3xl font-bold text-[#34A853]">58</p>
					</div>
					<div className="bg-white shadow rounded-lg p-5">
						<h3 className="text-lg font-medium text-gray-700">Ingresos</h3>
						<p className="mt-2 text-3xl font-bold text-[#34A853]">$7,540</p>
					</div>
				</div>

				{/* Tabla de muestra */}
				<div className="bg-white shadow rounded-lg p-5">
					<h2 className="text-lg font-medium text-gray-700 mb-4">
						Últimos registros
					</h2>
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Nombre
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Correo
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Rol
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								<tr>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										Juan Pérez
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										juan@example.com
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										Admin
									</td>
								</tr>
								<tr>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										Lucía Gómez
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										lucia@example.com
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										Usuario
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Layout>
	);
}
