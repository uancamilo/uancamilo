import { useState, useCallback } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Container from "../components/container";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Contacto() {
	const [notification, setNotification] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		trigger,
	} = useForm({
		mode: "onChange",
	});

	const showNotification = useCallback((type, message) => {
		setNotification({ type, message });
		setTimeout(() => setNotification(null), 5000);
	}, []);

	async function onSubmitForm(values) {
		if (isSubmitting) return;

		setIsSubmitting(true);
		showNotification("loading", "Enviando mensaje...");

		let config = {
			method: "POST",
			url: `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			data: values,
			timeout: 10000,
		};

		try {
			const res = await axios(config);
			if (res.status === 200) {
				reset();
				showNotification(
					"success",
					"¡Mensaje enviado exitosamente! Te contactaremos pronto."
				);
			}
		} catch (err) {
			console.log(err);
			let errorMessage = "Hubo un error al enviar el mensaje. ";

			if (err.code === "ECONNABORTED") {
				errorMessage += "La solicitud tardó demasiado tiempo.";
			} else if (err.response?.status >= 500) {
				errorMessage += "Error del servidor. Inténtalo más tarde.";
			} else if (!navigator.onLine) {
				errorMessage += "Verifica tu conexión a internet.";
			} else {
				errorMessage += "Inténtalo nuevamente.";
			}

			showNotification("error", errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<>
			<Layout>
				<Head>
					<title>Contacto | Juan Camilo Serna</title>
					<meta
						name="description"
						content="Ponte en contacto conmigo para discutir proyectos y oportunidades de colaboración."
					/>
				</Head>

				{/* Notificación */}
				{notification && (
					<div
						className={`fixed top-4 right-4 max-w-sm w-full shadow-lg rounded-lg p-4 z-50 transition-all duration-300 ${
							notification.type === "success"
								? "bg-green-500 text-white"
								: notification.type === "error"
								? "bg-red-500 text-white"
								: "bg-blue-500 text-white"
						}`}
					>
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">
								{notification.message}
							</span>
							{notification.type !== "loading" && (
								<button
									onClick={() => setNotification(null)}
									className="ml-4 text-white hover:text-gray-200"
								>
									✕
								</button>
							)}
						</div>
					</div>
				)}

				{/* Hero Section - Mismo estilo que index.js */}
				<div className="bg-gradient-to-b from-indigo-700 to-purple-600 h-96 w-full">
					<div className="w-full flex items-center justify-center py-28">
						<div className="bg-white shadow rounded py-12 lg:px-28 px-8 max-w-6xl mx-auto">
							<p className="md:text-3xl text-xl font-bold leading-7 text-center text-[#2F2F2F]">
								Este es el inicio de algo sorprendente.
							</p>
							<p className="md:text-2xl text-xl italic leading-7 text-center text-[#2F2F2F] pt-5">
								Enviarme tus datos será el primer paso.
							</p>
						</div>
					</div>
				</div>

				{/* Formulario Section - Mismo estilo estructural que servicios en index.js */}
				<Container>
					<section className="py-20 px-6 md:px-16">
						<form
							onSubmit={handleSubmit(onSubmitForm)}
							className="max-w-4xl mx-auto"
						>
							{/* Primera fila - Nombres y Email */}
							<div className="md:flex justify-between items-start mt-12 gap-6">
								<div className="md:w-1/2 flex flex-col">
									<label
										htmlFor="nombre"
										className="text-base font-semibold leading-none text-[#2F2F2F]"
									>
										Nombres *
									</label>
									<input
										id="nombre"
										tabIndex={0}
										aria-label="Ingrese sus nombres"
										type="text"
										className="text-base leading-none text-gray-900 p-3 focus:outline-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
										placeholder="Ingrese sus nombres"
										{...register("nombre", {
											required: "No olvides ingresar el nombre.",
											minLength: {
												value: 2,
												message: "El nombre debe tener al menos 2 caracteres.",
											},
										})}
									/>
									<span className="text-red-400 text-sm mt-1">
										{errors.nombre?.message}
									</span>
								</div>

								<div className="md:w-1/2 flex flex-col md:mt-0 mt-6">
									<label
										htmlFor="email"
										className="text-base font-semibold leading-none text-[#2F2F2F]"
									>
										Correo electrónico *
									</label>
									<input
										id="email"
										tabIndex={0}
										aria-label="Cuál es tu correo electrónico"
										type="email"
										className="text-base leading-none text-gray-900 p-3 focus:outline-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
										placeholder="¿Cuál es tu correo electrónico?"
										{...register("email", {
											required: "El correo electrónico es requerido",
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message:
													"Esta debe ser una dirección de correo electrónico válida.",
											},
										})}
										onBlur={() => trigger("email")}
									/>
									<span className="text-red-400 text-sm mt-1">
										{errors.email?.message}
									</span>
								</div>
							</div>

							{/* Segunda fila - Empresa y Teléfono */}
							<div className="md:flex justify-between items-start mt-8 gap-6">
								<div className="md:w-1/2 flex flex-col">
									<label
										htmlFor="empresa"
										className="text-base font-semibold leading-none text-[#2F2F2F]"
									>
										Empresa / compañía *
									</label>
									<input
										id="empresa"
										tabIndex={0}
										aria-label="Indicame el nombre de tu compañía"
										type="text"
										className="text-base leading-none text-gray-900 p-3 focus:outline-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
										placeholder="Indicame el nombre de tu compañía"
										{...register("empresa", {
											required: "Indicame a cual entidad representas",
										})}
									/>
									<span className="text-red-400 text-sm mt-1">
										{errors.empresa?.message}
									</span>
								</div>

								<div className="md:w-1/2 flex flex-col md:mt-0 mt-6">
									<label
										htmlFor="telefono"
										className="text-base font-semibold leading-none text-[#2F2F2F]"
									>
										Teléfono *
									</label>
									<input
										id="telefono"
										tabIndex={0}
										aria-label="Desde que país te comunicas"
										type="tel"
										className="text-base leading-none text-gray-900 p-3 focus:outline-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
										placeholder="Desde que país te comunicas"
										{...register("telefono", {
											required: "El teléfono es requerido",
										})}
									/>
									<span className="text-red-400 text-sm mt-1">
										{errors.telefono?.message}
									</span>
								</div>
							</div>

							{/* Mensaje */}
							<div className="w-full flex flex-col mt-8">
								<label
									htmlFor="mensaje"
									className="text-base font-semibold leading-none text-[#2F2F2F]"
								>
									Mensaje *
								</label>
								<textarea
									id="mensaje"
									tabIndex={0}
									aria-label="Envía el mensaje"
									rows="6"
									className="text-base leading-none text-gray-900 p-3 focus:outline-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400 resize-none"
									placeholder="Cuéntame sobre tu proyecto, ideas o cualquier consulta que tengas..."
									{...register("mensaje", {
										required: "El mensaje es requerido",
										minLength: {
											value: 10,
											message: "El mensaje debe tener al menos 10 caracteres.",
										},
									})}
								/>
								<span className="text-red-400 text-sm mt-1">
									{errors.mensaje?.message}
								</span>
							</div>

							{/* Política de privacidad */}
							<p className="text-xs leading-3 text-gray-600 mt-4">
								Al hacer clic en enviar, acepta nuestros términos de servicio,
								política de privacidad y cómo usamos los datos que acá se
								envían.
							</p>

							{/* Botón de envío */}
							<div className="flex items-center justify-center w-full">
								<button
									type="submit"
									disabled={isSubmitting}
									className={`mt-9 text-base font-semibold leading-none text-white py-4 px-10 rounded transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none ${
										isSubmitting
											? "bg-gray-400 cursor-not-allowed"
											: "bg-indigo-700 hover:bg-indigo-600"
									}`}
								>
									{isSubmitting ? (
										<div className="flex items-center">
											<svg
												className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Enviando...
										</div>
									) : (
										"Enviar"
									)}
								</button>
							</div>
						</form>
					</section>
				</Container>
			</Layout>
		</>
	);
}
