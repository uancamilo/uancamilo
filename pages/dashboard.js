import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Layout from "../components/layout";

export default function Dashboard() {
	const [proyectos, setProyectos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filtroEstado, setFiltroEstado] = useState("TODOS");
	const [busqueda, setBusqueda] = useState("");

	// Estados de paginación
	const [currentPage, setCurrentPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalItems, setTotalItems] = useState(0);
	const [hasNext, setHasNext] = useState(false);
	const [hasPrevious, setHasPrevious] = useState(false);

	// Estados para ordenamiento
	const [sortField, setSortField] = useState("fechaPublicacion");
	const [sortDirection, setSortDirection] = useState("desc");

	// Obtener proyectos del backend con paginación
	useEffect(() => {
		fetchProyectos();
	}, [currentPage, pageSize, filtroEstado, busqueda, sortField, sortDirection]);

	const fetchProyectos = async () => {
		try {
			setLoading(true);
			setError(null);

			// Construir URL con parámetros de paginación y filtros
			const params = new URLSearchParams({
				page: currentPage.toString(),
				size: pageSize.toString(),
				sort: sortField,
				direction: sortDirection,
			});

			if (filtroEstado !== "TODOS") {
				params.append("estado", filtroEstado);
			}

			if (busqueda.trim()) {
				params.append("busqueda", busqueda.trim());
			}

			const response = await fetch(
				`http://localhost:8080/proyectos/paginado?${params}`,
				{
					method: "GET",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			// Si obtenemos 403, intentar login automático
			if (response.status === 403) {
				console.log("🔐 Intentando login automático...");

				const loginResponse = await fetch("http://localhost:8080/auth/login", {
					method: "POST",
					credentials: "include",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: "admin@email.com",
						password: "admin123",
					}),
				});

				if (loginResponse.ok) {
					// Reintentar carga de proyectos después del login
					const retryResponse = await fetch(
						`http://localhost:8080/proyectos/paginado?${params}`,
						{
							method: "GET",
							credentials: "include",
							headers: { "Content-Type": "application/json" },
						}
					);

					if (retryResponse.ok) {
						const data = await retryResponse.json();
						updatePaginationState(data);
						return;
					}
				}

				throw new Error("No se pudo autenticar con el backend");
			}

			if (!response.ok) {
				throw new Error(`Error al cargar proyectos: ${response.status}`);
			}

			const data = await response.json();
			updatePaginationState(data);
		} catch (err) {
			setError(err.message);
			console.error("Error fetching proyectos:", err);
		} finally {
			setLoading(false);
		}
	};

	const updatePaginationState = (data) => {
		setProyectos(data.proyectos || []);
		setCurrentPage(data.currentPage || 0);
		setTotalPages(data.totalPages || 0);
		setTotalItems(data.totalItems || 0);
		setHasNext(data.hasNext || false);
		setHasPrevious(data.hasPrevious || false);
	};

	// Manejar cambio de página
	const handlePageChange = (newPage) => {
		if (newPage >= 0 && newPage < totalPages) {
			setCurrentPage(newPage);
		}
	};

	// Manejar cambio de filtros (resetear a página 0)
	const handleFilterChange = (newFilter, value) => {
		setCurrentPage(0);
		if (newFilter === "estado") {
			setFiltroEstado(value);
		} else if (newFilter === "busqueda") {
			setBusqueda(value);
		} else if (newFilter === "pageSize") {
			setPageSize(parseInt(value));
		}
	};

	// Manejar cambio de ordenamiento
	const handleSortChange = (field) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("desc");
		}
		setCurrentPage(0);
	};

	// Calcular métricas - total de todos los proyectos, contadores de la página actual
	const calcularMetricas = () => {
		const total = totalItems; // Total de todos los proyectos
		const publicados = proyectos.filter((p) => p.estado === "PUBLICADO").length;
		const enCurso = proyectos.filter((p) => p.estado === "EN_CURSO").length;
		const finalizados = proyectos.filter(
			(p) => p.estado === "FINALIZADO"
		).length;
		const cancelados = proyectos.filter((p) => p.estado === "CANCELADO").length;
		const valorTotal = proyectos.reduce(
			(sum, p) => sum + (p.valorMonetario || 0),
			0
		);

		return { total, publicados, enCurso, finalizados, cancelados, valorTotal };
	};

	const metricas = calcularMetricas();

	// Badge de estado con colores
	const EstadoBadge = ({ estado }) => {
		const colores = {
			PUBLICADO: "bg-green-100 text-green-800",
			EN_CURSO: "bg-blue-100 text-blue-800",
			FINALIZADO: "bg-gray-100 text-gray-800",
			CANCELADO: "bg-red-100 text-red-800",
		};

		return (
			<span
				className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
					colores[estado] || "bg-gray-100 text-gray-800"
				}`}
			>
				{estado.replace("_", " ")}
			</span>
		);
	};

	// Componente de paginación
	const Pagination = () => {
		const getPageNumbers = () => {
			const pages = [];
			const maxVisible = 5;

			let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
			let end = Math.min(totalPages - 1, start + maxVisible - 1);

			if (end - start < maxVisible - 1) {
				start = Math.max(0, end - maxVisible + 1);
			}

			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			return pages;
		};

		if (totalPages <= 1) return null;

		return (
			<div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
				<div className="flex items-center text-sm text-gray-500">
					<span>
						Mostrando {currentPage * pageSize + 1} a{" "}
						{Math.min((currentPage + 1) * pageSize, totalItems)} de {totalItems}{" "}
						proyectos
					</span>
				</div>

				<div className="flex items-center space-x-2">
					{/* Botón anterior */}
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={!hasPrevious}
						className={`px-3 py-2 text-sm font-medium rounded-md ${
							hasPrevious
								? "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
								: "text-gray-300 bg-gray-100 border border-gray-200 cursor-not-allowed"
						}`}
					>
						← Anterior
					</button>

					{/* Números de página */}
					{getPageNumbers().map((pageNum) => (
						<button
							key={pageNum}
							onClick={() => handlePageChange(pageNum)}
							className={`px-3 py-2 text-sm font-medium rounded-md ${
								currentPage === pageNum
									? "text-white bg-[#34A853] border border-[#34A853]"
									: "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
							}`}
						>
							{pageNum + 1}
						</button>
					))}

					{/* Botón siguiente */}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={!hasNext}
						className={`px-3 py-2 text-sm font-medium rounded-md ${
							hasNext
								? "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
								: "text-gray-300 bg-gray-100 border border-gray-200 cursor-not-allowed"
						}`}
					>
						Siguiente →
					</button>
				</div>
			</div>
		);
	};

	if (loading) {
		return (
			<Layout>
				<div className="flex items-center justify-center h-64">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#34A853]"></div>
					<span className="ml-3 text-gray-600">Cargando proyectos...</span>
				</div>
			</Layout>
		);
	}

	if (error) {
		return (
			<Layout>
				<div className="max-w-2xl mx-auto mt-8">
					<div className="bg-red-50 border border-red-200 rounded-lg p-6">
						<div className="flex">
							<div className="flex-shrink-0">
								<svg
									className="h-5 w-5 text-red-400"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div className="ml-3">
								<h3 className="text-sm font-medium text-red-800">
									Error al cargar proyectos
								</h3>
								<div className="mt-2 text-sm text-red-700">
									<p>{error}</p>
									<p className="mt-1 text-xs">
										💡 Verifica que el backend esté ejecutándose en
										localhost:8080
									</p>
								</div>
								<div className="mt-4">
									<button
										onClick={fetchProyectos}
										className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded text-sm font-medium transition-colors"
									>
										🔄 Reintentar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="px-4 sm:px-6 lg:px-8 py-6">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						Dashboard de Proyectos
					</h1>
					<p className="mt-2 text-gray-600">
						Gestión y seguimiento de todos los proyectos
					</p>
				</div>

				{/* Métricas */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					<div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
									<svg
										className="w-5 h-5 text-blue-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
							</div>
							<div className="ml-4">
								<h3 className="text-sm font-medium text-gray-500">
									Total Proyectos
								</h3>
								<p className="text-2xl font-bold text-gray-900">
									{metricas.total}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
									<svg
										className="w-5 h-5 text-green-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										/>
									</svg>
								</div>
							</div>
							<div className="ml-4">
								<h3 className="text-sm font-medium text-gray-500">
									Publicados
								</h3>
								<p className="text-2xl font-bold text-green-600">
									{metricas.publicados}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
									<svg
										className="w-5 h-5 text-orange-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
										/>
									</svg>
								</div>
							</div>
							<div className="ml-4">
								<h3 className="text-sm font-medium text-gray-500">En Curso</h3>
								<p className="text-2xl font-bold text-orange-600">
									{metricas.enCurso}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
									<svg
										className="w-5 h-5 text-gray-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										/>
									</svg>
								</div>
							</div>
							<div className="ml-4">
								<h3 className="text-sm font-medium text-gray-500">
									Finalizados
								</h3>
								<p className="text-2xl font-bold text-gray-600">
									{metricas.finalizados}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
									<svg
										className="w-5 h-5 text-red-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										/>
									</svg>
								</div>
							</div>
							<div className="ml-4">
								<h3 className="text-sm font-medium text-gray-500">
									Cancelados
								</h3>
								<p className="text-2xl font-bold text-red-600">
									{metricas.cancelados}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
									<svg
										className="w-5 h-5 text-purple-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
										/>
									</svg>
								</div>
							</div>
							<div className="ml-4">
								<h3 className="text-sm font-medium text-gray-500">
									Valor Total
								</h3>
								<p className="text-2xl font-bold text-purple-600">
									${metricas.valorTotal.toLocaleString()}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Controles de filtrado y paginación */}
				<div className="bg-white shadow-sm rounded-lg mb-6">
					<div className="px-6 py-4 border-b border-gray-200">
						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
							<div className="flex flex-col sm:flex-row gap-4 flex-1">
								<div className="flex-1 max-w-lg">
									<input
										type="text"
										placeholder="Buscar proyectos..."
										value={busqueda}
										onChange={(e) =>
											handleFilterChange("busqueda", e.target.value)
										}
										className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#34A853] focus:border-transparent"
									/>
								</div>
								<select
									value={filtroEstado}
									onChange={(e) => handleFilterChange("estado", e.target.value)}
									className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#34A853] focus:border-transparent"
								>
									<option value="TODOS">Todos los estados</option>
									<option value="PUBLICADO">Publicado</option>
									<option value="EN_CURSO">En Curso</option>
									<option value="FINALIZADO">Finalizado</option>
									<option value="CANCELADO">Cancelado</option>
								</select>
							</div>

							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<label className="text-sm text-gray-500">Mostrar:</label>
									<select
										value={pageSize}
										onChange={(e) =>
											handleFilterChange("pageSize", e.target.value)
										}
										className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#34A853] focus:border-transparent"
									>
										<option value={5}>5</option>
										<option value={10}>10</option>
										<option value={25}>25</option>
										<option value={50}>50</option>
									</select>
								</div>
								<button
									onClick={fetchProyectos}
									className="bg-[#34A853] hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
								>
									🔄 Actualizar
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Tabla de proyectos */}
				<div className="bg-white shadow-sm rounded-lg overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h2 className="text-lg font-semibold text-gray-900">
							Proyectos ({totalItems} total)
						</h2>
					</div>

					{proyectos.length === 0 ? (
						<div className="text-center py-12">
							<svg
								className="mx-auto h-12 w-12 text-gray-400"
								stroke="currentColor"
								fill="none"
								viewBox="0 0 48 48"
							>
								<path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
							<h3 className="mt-2 text-sm font-medium text-gray-900">
								No hay proyectos
							</h3>
							<p className="mt-1 text-sm text-gray-500">
								{busqueda || filtroEstado !== "TODOS"
									? "No se encontraron proyectos con los filtros aplicados."
									: "Comienza creando tu primer proyecto."}
							</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											onClick={() => handleSortChange("nombre")}
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										>
											<div className="flex items-center space-x-1">
												<span>Proyecto</span>
												{sortField === "nombre" && (
													<span className="text-[#34A853]">
														{sortDirection === "asc" ? "↑" : "↓"}
													</span>
												)}
											</div>
										</th>
										<th
											onClick={() => handleSortChange("estado")}
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										>
											<div className="flex items-center space-x-1">
												<span>Estado</span>
												{sortField === "estado" && (
													<span className="text-[#34A853]">
														{sortDirection === "asc" ? "↑" : "↓"}
													</span>
												)}
											</div>
										</th>
										<th
											onClick={() => handleSortChange("valorMonetario")}
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										>
											<div className="flex items-center space-x-1">
												<span>Valor</span>
												{sortField === "valorMonetario" && (
													<span className="text-[#34A853]">
														{sortDirection === "asc" ? "↑" : "↓"}
													</span>
												)}
											</div>
										</th>
										<th
											onClick={() => handleSortChange("fechaPublicacion")}
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										>
											<div className="flex items-center space-x-1">
												<span>Fechas</span>
												{sortField === "fechaPublicacion" && (
													<span className="text-[#34A853]">
														{sortDirection === "asc" ? "↑" : "↓"}
													</span>
												)}
											</div>
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Creado por
										</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
											Acciones
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{proyectos.map((proyecto) => (
										<tr key={proyecto.id} className="hover:bg-gray-50">
											<td className="px-6 py-4">
												<div>
													<div className="text-sm font-medium text-gray-900">
														{proyecto.nombre}
													</div>
													<div className="text-sm text-gray-500 max-w-xs truncate">
														{proyecto.descripcion}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<EstadoBadge estado={proyecto.estado} />
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
												${proyecto.valorMonetario?.toLocaleString() || "0"}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<div>
													<div>
														📅{" "}
														{new Date(
															proyecto.fechaPostulacion
														).toLocaleDateString()}
													</div>
													<div>
														🚀{" "}
														{new Date(
															proyecto.fechaEntrega
														).toLocaleDateString()}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{proyecto.creadoPor}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<div className="flex justify-end space-x-2">
													<button className="text-[#34A853] hover:text-green-700 font-medium transition-colors">
														👁️ Ver
													</button>
													<button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
														✏️ Editar
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}

					{/* Componente de paginación */}
					<Pagination />
				</div>
			</div>
		</Layout>
	);
}

// ✅ Protección SSR
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

	if (session.user.role !== "ROLE_ADMIN") {
		return {
			redirect: {
				destination: "/proyectos",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
