import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch(
				"https://proyecto-530p.onrender.com/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({
						email,
						password,
					}),
				}
			);

			if (response.status === 401) {
				setError("Credenciales incorrectas");
				return;
			}

			if (!response.ok) {
				setError("Error inesperado en la autenticación");
				return;
			}

			if (response.ok) {
				router.push("/dashboard");
			}
		} catch (err) {
			console.error(err);
			setError("Error de red o servidor no disponible");
		}
	};

	return (
		<Layout>
			<div className="max-w-md mx-auto pt-16">
				<h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
				<form onSubmit={handleSubmit}>
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
							className="bg-[#34A853] hover:bg-[#2f9c48] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Ingresar
						</button>
					</div>
				</form>

				{error && (
					<p className="text-red-500 text-sm text-center mt-4">{error}</p>
				)}
			</div>
		</Layout>
	);
}
