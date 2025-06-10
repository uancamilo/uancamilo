import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	// Verificar si el usuario está autenticado al cargar la página
	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			setLoading(true);
			const response = await fetch("http://localhost:8080/auth/me", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const userData = await response.json();
				setUser({
					name: userData.nombre,
					email: userData.email,
					role: userData.rol,
				});
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error("Error checking auth:", error);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const login = async (email, password) => {
		try {
			const response = await fetch("http://localhost:8080/auth/login", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const data = await response.json();
				setUser({
					name: data.user.nombre,
					email: data.user.email,
					role: data.user.rol,
				});

				// Redirigir según el rol
				if (data.user.rol === "ROLE_ADMIN") {
					router.push("/dashboard");
				} else {
					router.push("/proyectos");
				}

				return { success: true };
			} else {
				const errorData = await response.json();
				return {
					success: false,
					error: errorData.message || "Credenciales inválidas",
				};
			}
		} catch (error) {
			console.error("Error during login:", error);
			return {
				success: false,
				error: "Error de conexión",
			};
		}
	};

	const logout = async () => {
		try {
			await fetch("http://localhost:8080/auth/logout", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error during logout:", error);
		} finally {
			setUser(null);
			router.push("/login");
		}
	};

	const value = {
		user,
		loading,
		login,
		logout,
		checkAuth,
		isAuthenticated: !!user,
		isAdmin: user?.role === "ROLE_ADMIN",
		isUser: user?.role === "ROLE_USER",
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
