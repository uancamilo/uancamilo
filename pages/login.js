import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import RegisterModal from "../components/registerModal";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showRegister, setShowRegister] = useState(false);

	const { login, user, loading } = useAuth();
	const router = useRouter();

	const ROL_REDIRECCIONES = {
		ROLE_ADMIN: "/dashboard",
		ROLE_USER: "/proyectos",
	};

	useEffect(() => {
		if (!loading && user) {
			const destination = ROL_REDIRECCIONES[user.role] || "/dashboard";
			router.push(destination);
		}
	}, [user, loading, router]);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		if (!email.trim()) {
			setError("El correo es obligatorio");
			return;
		}

		if (!/\S+@\S+\.\S+/.test(email)) {
			setError("El correo no es válido");
			return;
		}

		if (!password.trim()) {
			setError("La contraseña es obligatoria");
			return;
		}

		setIsSubmitting(true);

		try {
			const result = await login(email, password);

			if (!result.success) {
				setError(result.error || "Error al iniciar sesión");
			}
		} catch (err) {
			setError(err.message || "Error al iniciar sesión");
		} finally {
			setIsSubmitting(false);
		}
	};

	// Mostrar loading mientras verifica autenticación
	if (loading) {
		return (
			<Layout>
				<div className="max-w-md mx-auto px-4 pt-[80px] pb-10 sm:pt-[96px] sm:pb-16">
					<div className="flex items-center justify-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#34A853]"></div>
						<span className="ml-3 text-gray-600">Verificando sesión...</span>
					</div>
				</div>
			</Layout>
		);
	}

	// No mostrar login si ya está autenticado
	if (user) {
		return null;
	}

	return (
		<>
			<Layout>
				<div className="max-w-md mx-auto px-4 pt-[80px] pb-10 sm:pt-[96px] sm:pb-16">
					<h2 className="text-2xl font-bold mb-6 text-center">
						Iniciar sesión
					</h2>
					<form onSubmit={handleLogin}>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="password"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Contraseña
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="flex items-center justify-between">
							<button
								type="submit"
								disabled={isSubmitting}
								className="bg-[#34A853] hover:bg-[#2f9c48] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
							>
								{isSubmitting ? "Ingresando..." : "Ingresar"}
							</button>
						</div>
					</form>
					{error && (
						<p className="text-red-500 text-sm text-center mt-4">{error}</p>
					)}
					<div className="mt-4 text-center">
						<p className="text-sm">
							¿No tienes una cuenta?{" "}
							<button
								type="button"
								onClick={() => setShowRegister(true)}
								className="text-[#34A853] hover:underline"
							>
								Regístrate aquí
							</button>
						</p>
					</div>
				</div>
			</Layout>
			<RegisterModal
				open={showRegister}
				onClose={() => setShowRegister(false)}
			/>
		</>
	);
}
