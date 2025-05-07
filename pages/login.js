import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("http://localhost:8080/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", // ⬅️ importante para que la cookie se guarde
				body: JSON.stringify({ email, password }),
			});

			if (response.status === 401) {
				setError("Credenciales incorrectas");
				return;
			}

			if (!response.ok) {
				setError("Error inesperado en la autenticación");
				return;
			}

			router.push("/dashboard");
		} catch (err) {
			console.error(err);
			setError("Error de red o servidor no disponible");
		}
	};

	return (
		<div style={{ maxWidth: 400, margin: "auto", paddingTop: "4rem" }}>
			<h2>Iniciar sesión</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div style={{ marginTop: "1rem" }}>
					<label>Contraseña:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button style={{ marginTop: "1rem" }} type="submit">
					Ingresar
				</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
}
