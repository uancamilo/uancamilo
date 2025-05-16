import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import RegisterModal from "../components/registerModal";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const router = useRouter();

	const ROL_REDIRECCIONES = {
		ROLE_ADMIN: "/dashboard",
		ROLE_USER: "/proyectos",
	};

	useEffect(() => {
		const checkSession = async () => {
			const session = await getSession();
			const userRole = session?.user?.role;

			if (session && userRole && ROL_REDIRECCIONES[userRole]) {
				router.replace(ROL_REDIRECCIONES[userRole]);
			}
		};

		checkSession();
	}, [router]);

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
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (!result.ok) {
				throw new Error("Credenciales incorrectas");
			}

			const session = await getSession();
			const userRole = session?.user?.role;

			if (!userRole || !ROL_REDIRECCIONES[userRole]) {
				throw new Error("Rol de usuario no reconocido");
			}

			router.push(ROL_REDIRECCIONES[userRole]);
		} catch (err) {
			setError(err.message || "Error al iniciar sesión");
		} finally {
			setIsSubmitting(false);
		}
	};


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
