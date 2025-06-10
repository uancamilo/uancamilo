import { useState, useEffect, useCallback, useMemo, useReducer } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/layout";

const initialState = {
	proyectos: [],
	loading: true,
	error: null,
	currentPage: 0,
	totalPages: 0,
	totalItems: 0,
	hasNext: false,
	hasPrevious: false,
};

const proyectosReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload, error: null };
		case "SET_ERROR":
			return { ...state, error: action.payload, loading: false };
		case "SET_PROYECTOS":
			return {
				...state,
				proyectos: action.payload.proyectos || [],
				currentPage: action.payload.currentPage || 0,
				totalPages: action.payload.totalPages || 0,
				totalItems: action.payload.totalItems || 0,
				hasNext: action.payload.hasNext || false,
				hasPrevious: action.payload.hasPrevious || false,
				loading: false,
				error: null,
			};
		case "RESET":
			return initialState;
		default:
			return state;
	}
};

const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default function Dashboard() {
	const router = useRouter();
	const [state, dispatch] = useReducer(proyectosReducer, initialState);

	const [filters, setFilters] = useState({
		estado: "TODOS",
		busqueda: "",
		pageSize: 10,
		sortField: "fechaPublicacion",
		sortDirection: "desc",
	});

	const [modals, setModals] = useState({
		showCreate: false,
		showEdit: false,
		editingProject: null,
		loading: false,
	});

	const [notification, setNotification] = useState(null);
	const debouncedBusqueda = useDebounce(filters.busqueda, 500);

	const fetchProyectos = useCallback(
		async (showLoading = true) => {
			try {
				if (showLoading) {
					dispatch({ type: "SET_LOADING", payload: true });
				}

				const params = new URLSearchParams({
					page: state.currentPage.toString(),
					size: filters.pageSize.toString(),
					sort: filters.sortField,
					direction: filters.sortDirection,
				});

				if (filters.estado !== "TODOS") {
					params.append("estado", filters.estado);
				}

				if (debouncedBusqueda.trim()) {
					params.append("busqueda", debouncedBusqueda.trim());
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

				if (response.status === 401 || response.status === 403) {
					router.push("/login");
					return;
				}

				if (!response.ok) {
					throw new Error(`Error al cargar proyectos: ${response.status}`);
				}

				const data = await response.json();
				dispatch({ type: "SET_PROYECTOS", payload: data });
			} catch (err) {
				console.error("Error fetching proyectos:", err);
				dispatch({ type: "SET_ERROR", payload: err.message });
			}
		},
		[
			state.currentPage,
			filters.pageSize,
			filters.sortField,
			filters.sortDirection,
			filters.estado,
			debouncedBusqueda,
			router,
		]
	);

	useEffect(() => {
		fetchProyectos();
	}, [fetchProyectos]);

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => setNotification(null), 4000);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	const showNotification = useCallback((message, type = "success") => {
		setNotification({ message, type });
	}, []);

	const validateProjectForm = (formData) => {
		const errors = [];

		if (!formData.nombre?.trim()) {
			errors.push("El nombre es requerido");
		}
		if (!formData.descripcion?.trim()) {
			errors.push("La descripción es requerida");
		}
		if (!formData.fechaPostulacion) {
			errors.push("La fecha de postulación es requerida");
		}
		if (!formData.fechaEntrega) {
			errors.push("La fecha de entrega es requerida");
		}
		if (
			formData.fechaPostulacion &&
			formData.fechaEntrega &&
			new Date(formData.fechaPostulacion) >= new Date(formData.fechaEntrega)
		) {
			errors.push(
				"La fecha de entrega debe ser posterior a la fecha de postulación"
			);
		}

		return errors;
	};

	const handleCrudOperation = useCallback(
		async (operation, data = null) => {
			try {
				setModals((prev) => ({ ...prev, loading: true }));

				let url, method, body;

				switch (operation) {
					case "create":
						const createErrors = validateProjectForm(data);
						if (createErrors.length > 0) {
							throw new Error(createErrors.join(", "));
						}
						url = "http://localhost:8080/proyectos";
						method = "POST";
						body = JSON.stringify(data);
						break;

					case "update":
						const updateErrors = validateProjectForm(data.formData);
						if (updateErrors.length > 0) {
							throw new Error(updateErrors.join(", "));
						}
						url = `http://localhost:8080/proyectos/${data.id}`;
						method = "PUT";
						body = JSON.stringify(data.formData);
						break;

					case "delete":
						if (
							!confirm(
								`¿Estás seguro de eliminar el proyecto "${data.nombre}"?`
							)
						) {
							return;
						}
						url = `http://localhost:8080/proyectos/${data.id}`;
						method = "DELETE";
						break;

					default:
						throw new Error("Operación no válida");
				}

				const response = await fetch(url, {
					method,
					credentials: "include",
					headers:
						method !== "DELETE" ? { "Content-Type": "application/json" } : {},
					...(body && { body }),
				});

				if (response.status === 401 || response.status === 403) {
					router.push("/login");
					return;
				}

				if (!response.ok) {
					throw new Error(`Error en la operación: ${response.status}`);
				}

				setModals({
					showCreate: false,
					showEdit: false,
					editingProject: null,
					loading: false,
				});

				const messages = {
					create: "Proyecto creado exitosamente",
					update: "Proyecto actualizado exitosamente",
					delete: "Proyecto eliminado exitosamente",
				};
				showNotification(messages[operation]);

				fetchProyectos(false);
			} catch (error) {
				showNotification(`Error: ${error.message}`, "error");
				setModals((prev) => ({ ...prev, loading: false }));
			}
		},
		[fetchProyectos, showNotification, router]
	);

	const handleFilterChange = useCallback(
		(filterType, value) => {
			setFilters((prev) => ({ ...prev, [filterType]: value }));

			if (filterType !== "pageSize") {
				dispatch({
					type: "SET_PROYECTOS",
					payload: { ...state, currentPage: 0 },
				});
			}
		},
		[state]
	);

	const handleSortChange = useCallback(
		(field) => {
			setFilters((prev) => ({
				...prev,
				sortField: field,
				sortDirection:
					prev.sortField === field && prev.sortDirection === "desc"
						? "asc"
						: "desc",
			}));
			dispatch({
				type: "SET_PROYECTOS",
				payload: { ...state, currentPage: 0 },
			});
		},
		[state]
	);

	const handlePageChange = useCallback(
		(newPage) => {
			if (newPage >= 0 && newPage < state.totalPages) {
				dispatch({
					type: "SET_PROYECTOS",
					payload: { ...state, currentPage: newPage },
				});
			}
		},
		[state]
	);

	const metricas = useMemo(() => {
		const total = state.totalItems;
		const publicados = state.proyectos.filter(
			(p) => p.estado === "PUBLICADO"
		).length;
		const enCurso = state.proyectos.filter(
			(p) => p.estado === "EN_CURSO"
		).length;
		const finalizados = state.proyectos.filter(
			(p) => p.estado === "FINALIZADO"
		).length;
		const cancelados = state.proyectos.filter(
			(p) => p.estado === "CANCELADO"
		).length;
		const valorTotal = state.proyectos.reduce(
			(sum, p) => sum + (p.valorMonetario || 0),
			0
		);

		return { total, publicados, enCurso, finalizados, cancelados, valorTotal };
	}, [state.proyectos, state.totalItems]);

	const EstadoBadge = useMemo(
		() =>
			({ estado }) => {
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
			},
		[]
	);

	const NotificationComponent = useMemo(
		() => () => {
			if (!notification) return null;

			const bgColor =
				notification.type === "success" ? "bg-green-500" : "bg-red-500";

			return (
				<div
					className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center`}
				>
					<span>{notification.message}</span>
					<button
						onClick={() => setNotification(null)}
						className="ml-3 text-white hover:text-gray-200"
					>
						✕
					</button>
				</div>
			);
		},
		[notification]
	);

	const ProjectModal = useMemo(
		() =>
			({ isEdit = false, project = null, onClose, onSubmit }) => {
				const [formData, setFormData] = useState({
					nombre: project?.nombre || "",
					descripcion: project?.descripcion || "",
					estado: project?.estado || "PUBLICADO",
					fechaPostulacion: project?.fechaPostulacion || "",
					fechaEntrega: project?.fechaEntrega || "",
					valorMonetario: project?.valorMonetario || "",
				});

				const [formErrors, setFormErrors] = useState([]);

				const handleSubmit = (e) => {
					e.preventDefault();
					const errors = validateProjectForm(formData);

					if (errors.length > 0) {
						setFormErrors(errors);
						return;
					}

					setFormErrors([]);
					onSubmit(formData);
				};

				const handleChange = (field, value) => {
					setFormData((prev) => ({ ...prev, [field]: value }));
					if (formErrors.length > 0) {
						setFormErrors([]);
					}
				};

				return (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
						<div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
							<div className="p-6">
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-xl font-bold text-gray-900">
										{isEdit ? "Editar Proyecto" : "Crear Nuevo Proyecto"}
									</h2>
									<button
										onClick={onClose}
										className="text-gray-400 hover:text-gray-600"
									>
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>

								{formErrors.length > 0 && (
									<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
										<ul className="text-sm text-red-600 list-disc list-inside">
											{formErrors.map((error, index) => (
												<li key={index}>{error}</li>
											))}
										</ul>
									</div>
								)}

								<form onSubmit={handleSubmit} className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Nombre del proyecto *
										</label>
										<input
											type="text"
											value={formData.nombre}
											onChange={(e) => handleChange("nombre", e.target.value)}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:border-transparent"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Descripción *
										</label>
										<textarea
											value={formData.descripcion}
											onChange={(e) =>
												handleChange("descripcion", e.target.value)
											}
											className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-[#34A853] focus:border-transparent"
											required
										/>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Estado
											</label>
											<select
												value={formData.estado}
												onChange={(e) => handleChange("estado", e.target.value)}
												className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:border-transparent"
											>
												<option value="PUBLICADO">Publicado</option>
												<option value="EN_CURSO">En Curso</option>
												<option value="FINALIZADO">Finalizado</option>
												<option value="CANCELADO">Cancelado</option>
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Valor Monetario
											</label>
											<input
												type="number"
												step="0.01"
												min="0"
												value={formData.valorMonetario}
												onChange={(e) =>
													handleChange("valorMonetario", e.target.value)
												}
												className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:border-transparent"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Fecha de Postulación *
											</label>
											<input
												type="date"
												value={formData.fechaPostulacion}
												onChange={(e) =>
													handleChange("fechaPostulacion", e.target.value)
												}
												className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:border-transparent"
												required
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Fecha de Entrega *
											</label>
											<input
												type="date"
												value={formData.fechaEntrega}
												onChange={(e) =>
													handleChange("fechaEntrega", e.target.value)
												}
												className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#34A853] focus:border-transparent"
												required
											/>
										</div>
									</div>

									<div className="flex justify-end space-x-3 pt-4">
										<button
											type="button"
											onClick={onClose}
											className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
											disabled={modals.loading}
										>
											Cancelar
										</button>
										<button
											type="submit"
											className="px-4 py-2 bg-[#34A853] text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
											disabled={modals.loading}
										>
											{modals.loading
												? "Procesando..."
												: isEdit
												? "Actualizar"
												: "Crear Proyecto"}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				);
			},
		[modals.loading, validateProjectForm]
	);

	const Pagination = useMemo(
		() => () => {
			const getPageNumbers = () => {
				const pages = [];
				const maxVisible = 5;

				let start = Math.max(0, state.currentPage - Math.floor(maxVisible / 2));
				let end = Math.min(state.totalPages - 1, start + maxVisible - 1);

				if (end - start < maxVisible - 1) {
					start = Math.max(0, end - maxVisible + 1);
				}

				for (let i = start; i <= end; i++) {
					pages.push(i);
				}

				return pages;
			};

			if (state.totalPages <= 1) return null;

			return (
				<div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
					<div className="flex items-center text-sm text-gray-500">
						<span>
							Mostrando {state.currentPage * filters.pageSize + 1} a{" "}
							{Math.min(
								(state.currentPage + 1) * filters.pageSize,
								state.totalItems
							)}{" "}
							de {state.totalItems} proyectos
						</span>
					</div>

					<div className="flex items-center space-x-2">
						<button
							onClick={() => handlePageChange(state.currentPage - 1)}
							disabled={!state.hasPrevious}
							className={`px-3 py-2 text-sm font-medium rounded-md ${
								state.hasPrevious
									? "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
									: "text-gray-300 bg-gray-100 border border-gray-200 cursor-not-allowed"
							}`}
						>
							← Anterior
						</button>

						{getPageNumbers().map((pageNum) => (
							<button
								key={pageNum}
								onClick={() => handlePageChange(pageNum)}
								className={`px-3 py-2 text-sm font-medium rounded-md ${
									state.currentPage === pageNum
										? "text-white bg-[#34A853] border border-[#34A853]"
										: "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
								}`}
							>
								{pageNum + 1}
							</button>
						))}

						<button
							onClick={() => handlePageChange(state.currentPage + 1)}
							disabled={!state.hasNext}
							className={`px-3 py-2 text-sm font-medium rounded-md ${
								state.hasNext
									? "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
									: "text-gray-300 bg-gray-100 border border-gray-200 cursor-not-allowed"
							}`}
						>
							Siguiente →
						</button>
					</div>
				</div>
			);
		},
		[state, filters.pageSize, handlePageChange]
	);

	if (state.loading) {
		return (
			<Layout>
				<div className="flex items-center justify-center h-64">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#34A853]"></div>
					<span className="ml-3 text-gray-600">Cargando proyectos...</span>
				</div>
			</Layout>
		);
	}

	if (state.error) {
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
									<p>{state.error}</p>
									<p className="mt-1 text-xs">
										💡 Verifica que el backend esté ejecutándose
									</p>
								</div>
								<div className="mt-4">
									<button
										onClick={() => fetchProyectos()}
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
				<NotificationComponent />

				{/* Header */}
				<div className="mb-8 mt-16">
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								Dashboard de Proyectos
							</h1>
							<p className="mt-2 text-gray-600">
								Gestión y seguimiento de todos los proyectos
							</p>
						</div>
						<div className="flex-shrink-0">
							<button
								onClick={() =>
									setModals((prev) => ({ ...prev, showCreate: true }))
								}
								className="bg-[#34A853] hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 w-full sm:w-auto justify-center"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4v16m8-8H4"
									/>
								</svg>
								<span>Crear Proyecto</span>
							</button>
						</div>
					</div>
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

				{/* Controles de filtrado */}
				<div className="bg-white shadow-sm rounded-lg mb-6">
					<div className="px-6 py-4 border-b border-gray-200">
						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
							<div className="flex flex-col sm:flex-row gap-4 flex-1">
								<div className="flex-1 max-w-lg">
									<input
										type="text"
										placeholder="Buscar proyectos..."
										value={filters.busqueda}
										onChange={(e) =>
											handleFilterChange("busqueda", e.target.value)
										}
										className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#34A853] focus:border-transparent"
									/>
								</div>
								<select
									value={filters.estado}
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
										value={filters.pageSize}
										onChange={(e) =>
											handleFilterChange("pageSize", parseInt(e.target.value))
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
									onClick={() => fetchProyectos(false)}
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
							Proyectos ({state.totalItems} total)
						</h2>
					</div>

					{state.proyectos.length === 0 ? (
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
								{filters.busqueda || filters.estado !== "TODOS"
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
												{filters.sortField === "nombre" && (
													<span className="text-[#34A853]">
														{filters.sortDirection === "asc" ? "↑" : "↓"}
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
												{filters.sortField === "estado" && (
													<span className="text-[#34A853]">
														{filters.sortDirection === "asc" ? "↑" : "↓"}
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
												{filters.sortField === "valorMonetario" && (
													<span className="text-[#34A853]">
														{filters.sortDirection === "asc" ? "↑" : "↓"}
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
												{filters.sortField === "fechaPublicacion" && (
													<span className="text-[#34A853]">
														{filters.sortDirection === "asc" ? "↑" : "↓"}
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
									{state.proyectos.map((proyecto) => (
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
													<button
														onClick={() =>
															setModals((prev) => ({
																...prev,
																showEdit: true,
																editingProject: proyecto,
															}))
														}
														className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
													>
														✏️ Editar
													</button>
													<button
														onClick={() =>
															handleCrudOperation("delete", proyecto)
														}
														className="text-red-600 hover:text-red-700 font-medium transition-colors"
													>
														🗑️ Eliminar
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}

					<Pagination />
				</div>

				{/* Modales */}
				{modals.showCreate && (
					<ProjectModal
						onClose={() =>
							setModals((prev) => ({ ...prev, showCreate: false }))
						}
						onSubmit={(formData) => handleCrudOperation("create", formData)}
					/>
				)}

				{modals.showEdit && modals.editingProject && (
					<ProjectModal
						isEdit={true}
						project={modals.editingProject}
						onClose={() =>
							setModals((prev) => ({
								...prev,
								showEdit: false,
								editingProject: null,
							}))
						}
						onSubmit={(formData) =>
							handleCrudOperation("update", {
								id: modals.editingProject.id,
								formData,
							})
						}
					/>
				)}
			</div>
		</Layout>
	);
}

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
