import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape({
	nombre: yup.string().required("El nombre es obligatorio"),
	email: yup
		.string()
		.email("Email inválido")
		.required("El email es obligatorio"),
	password: yup
		.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.required("La contraseña es obligatoria"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Las contraseñas no coinciden")
		.required("Confirma tu contraseña"),
});

export default function RegisterModal({ open, onClose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [formState, setFormState] = useState("idle"); // 'idle' | 'enviando' | 'exito' | 'error'
	const [serverError, setServerError] = useState("");

	const API_URL = process.env.NEXT_PUBLIC_API_URL;

	const onSubmit = async (data) => {
		setFormState("enviando");
		setServerError("");

		try {
			const response = await fetch(`${API_URL}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					nombre: data.nombre,
					email: data.email,
					password: data.password,
				}),
			});

			if (!response.ok) {
				const errorText = await response.text();
				setServerError(errorText || "Error en el registro");
				setFormState("error");
				return;
			}

			setFormState("exito");
			reset(); // limpia el formulario
		} catch (error) {
			console.error("Error en el registro:", error);
			setServerError("Error de red o servidor no disponible");
			setFormState("error");
		}
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-xl font-bold mb-4">Registrarse</h2>

				{formState === "enviando" && (
					<p className="text-center text-gray-700 py-8">Registrando...</p>
				)}

				{formState === "idle" || formState === "error" ? (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Nombre</label>
							<input
								{...register("nombre")}
								className="w-full border rounded px-3 py-2"
								type="text"
							/>
							<p className="text-red-500 text-sm">{errors.nombre?.message}</p>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Email</label>
							<input
								{...register("email")}
								className="w-full border rounded px-3 py-2"
								type="email"
							/>
							<p className="text-red-500 text-sm">{errors.email?.message}</p>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">
								Contraseña
							</label>
							<input
								{...register("password")}
								className="w-full border rounded px-3 py-2"
								type="password"
							/>
							<p className="text-red-500 text-sm">{errors.password?.message}</p>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">
								Confirmar contraseña
							</label>
							<input
								{...register("confirmPassword")}
								className="w-full border rounded px-3 py-2"
								type="password"
							/>
							<p className="text-red-500 text-sm">
								{errors.confirmPassword?.message}
							</p>
						</div>

						{serverError && (
							<p className="text-red-600 text-sm text-center mb-2">
								{serverError}
							</p>
						)}

						<div className="flex justify-between mt-4">
							<button
								type="button"
								onClick={() => {
									reset();
									setFormState("idle");
									onClose();
								}}
								className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="px-4 py-2 bg-[#34A853] text-white rounded hover:bg-[#2f9c48]"
							>
								Registrarse
							</button>
						</div>
					</form>
				) : null}

				{formState === "exito" && (
					<div className="text-center py-4">
						<p className="text-green-600 font-medium mb-4">
							Registro exitoso. Ya puedes iniciar sesión.
						</p>
						<button
							onClick={() => {
								setFormState("idle");
								onClose();
							}}
							className="px-4 py-2 bg-[#34A853] text-white rounded hover:bg-[#2f9c48]"
						>
							Ingresar
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
