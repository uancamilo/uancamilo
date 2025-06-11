import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { clearAllMocks, mockFetchResponse } from "../utils/setup-mocks";

// Componente de prueba para acceder al contexto
const TestComponent = () => {
	const { user, loading, isAuthenticated, isAdmin, isUser } = useAuth();

	return (
		<div>
			<div data-testid="user">{user ? user.name : "null"}</div>
			<div data-testid="loading">{loading ? "true" : "false"}</div>
			<div data-testid="isAuthenticated">
				{isAuthenticated ? "true" : "false"}
			</div>
			<div data-testid="isAdmin">{isAdmin ? "true" : "false"}</div>
			<div data-testid="isUser">{isUser ? "true" : "false"}</div>
		</div>
	);
};

describe("AuthContext", () => {
	beforeEach(() => {
		clearAllMocks();
	});

	describe("Initial State", () => {
		it("should initialize with correct default values", async () => {
			// Mock de la respuesta de checkAuth (usuario no autenticado)
			mockFetchResponse(null, false, 401);

			render(
				<AuthProvider>
					<TestComponent />
				</AuthProvider>
			);

			// Verificar estado inicial (loading debería ser true al inicio)
			expect(screen.getByTestId("loading")).toHaveTextContent("true");
			expect(screen.getByTestId("user")).toHaveTextContent("null");
			expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("false");

			// Esperar a que termine el loading
			await waitFor(() => {
				expect(screen.getByTestId("loading")).toHaveTextContent("false");
			});

			// Verificar estado final después de checkAuth
			expect(screen.getByTestId("user")).toHaveTextContent("null");
			expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("false");
			expect(screen.getByTestId("isAdmin")).toHaveTextContent("false");
			expect(screen.getByTestId("isUser")).toHaveTextContent("false");
		});

		it("should call checkAuth on mount", async () => {
			mockFetchResponse(null, false, 401);

			render(
				<AuthProvider>
					<TestComponent />
				</AuthProvider>
			);

			// Verificar que se llamó fetch para checkAuth
			await waitFor(() => {
				expect(fetch).toHaveBeenCalledWith(
					"http://localhost:8080/auth/me",
					expect.objectContaining({
						method: "GET",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
						},
					})
				);
			});
		});
	});
});

describe("Login Functionality", () => {
	it("should login successfully and update user state", async () => {
		const TestLoginComponent = () => {
			const { login, user, isAuthenticated, isUser, isAdmin, loading } =
				useAuth();
			const [loginResult, setLoginResult] = React.useState(null);

			const handleLogin = async () => {
				const result = await login("test@example.com", "password123");
				setLoginResult(result);
			};

			return (
				<div>
					<button onClick={handleLogin} data-testid="login-btn">
						Login
					</button>
					<div data-testid="loading">{loading ? "true" : "false"}</div>
					<div data-testid="user-name">{user ? user.name : "null"}</div>
					<div data-testid="user-email">{user ? user.email : "null"}</div>
					<div data-testid="user-role">{user ? user.role : "null"}</div>
					<div data-testid="isAuthenticated">
						{isAuthenticated ? "true" : "false"}
					</div>
					<div data-testid="isUser">{isUser ? "true" : "false"}</div>
					<div data-testid="isAdmin">{isAdmin ? "true" : "false"}</div>
					<div data-testid="login-success">
						{loginResult?.success ? "true" : "false"}
					</div>
				</div>
			);
		};

		// Mock inicial de checkAuth (no autenticado)
		mockFetchResponse(null, false, 401);

		render(
			<AuthProvider>
				<TestLoginComponent />
			</AuthProvider>
		);

		// Esperar a que termine el checkAuth inicial
		await waitFor(() => {
			expect(screen.getByTestId("loading")).toHaveTextContent("false");
			expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("false");
		});

		// Limpiar el mock y preparar para login exitoso
		global.fetch.mockClear();
		mockFetchResponse(
			{
				user: {
					nombre: "Test User",
					email: "test@example.com",
					rol: "ROLE_USER",
				},
			},
			true,
			200
		);

		// Hacer click en login
		const loginBtn = screen.getByTestId("login-btn");
		loginBtn.click();

		// Verificar que se llamó a la API de login correctamente
		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:8080/auth/login",
				expect.objectContaining({
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: "test@example.com",
						password: "password123",
					}),
				})
			);
		});

		// Verificar que el estado se actualizó correctamente después del login
		await waitFor(() => {
			expect(screen.getByTestId("login-success")).toHaveTextContent("true");
			expect(screen.getByTestId("user-name")).toHaveTextContent("Test User");
			expect(screen.getByTestId("user-email")).toHaveTextContent(
				"test@example.com"
			);
			expect(screen.getByTestId("user-role")).toHaveTextContent("ROLE_USER");
			expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("true");
			expect(screen.getByTestId("isUser")).toHaveTextContent("true");
			expect(screen.getByTestId("isAdmin")).toHaveTextContent("false");
		});
	});
	it("should handle login failure with invalid credentials", async () => {
		const TestLoginErrorComponent = () => {
			const { login, user, isAuthenticated } = useAuth();
			const [loginResult, setLoginResult] = React.useState(null);
			const [error, setError] = React.useState(null);

			const handleFailedLogin = async () => {
				try {
					const result = await login("wrong@example.com", "wrongpassword");
					setLoginResult(result);
				} catch (err) {
					setError(err.message);
				}
			};

			return (
				<div>
					<button onClick={handleFailedLogin} data-testid="login-fail-btn">
						Login Fail
					</button>
					<div data-testid="user-name">{user ? user.name : "null"}</div>
					<div data-testid="isAuthenticated">
						{isAuthenticated ? "true" : "false"}
					</div>
					<div data-testid="login-success">
						{loginResult?.success ? "true" : "false"}
					</div>
					<div data-testid="login-error">{loginResult?.error || "null"}</div>
					<div data-testid="error-message">{error || "null"}</div>
				</div>
			);
		};

		// Mock inicial de checkAuth (no autenticado)
		mockFetchResponse(null, false, 401);

		render(
			<AuthProvider>
				<TestLoginErrorComponent />
			</AuthProvider>
		);

		// Esperar checkAuth inicial
		await waitFor(() => {
			expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("false");
		});

		// Mock de respuesta de error de login
		global.fetch.mockClear();
		mockFetchResponse(
			{
				message: "Credenciales inválidas",
			},
			false,
			401
		);

		// Intentar login con credenciales incorrectas
		const loginFailBtn = screen.getByTestId("login-fail-btn");
		loginFailBtn.click();

		// Verificar que se llamó a la API
		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:8080/auth/login",
				expect.objectContaining({
					method: "POST",
					credentials: "include",
					body: JSON.stringify({
						email: "wrong@example.com",
						password: "wrongpassword",
					}),
				})
			);
		});

		// Verificar que el estado NO se actualizó (sigue sin autenticar)
		await waitFor(() => {
			expect(screen.getByTestId("login-success")).toHaveTextContent("false");
			expect(screen.getByTestId("user-name")).toHaveTextContent("null");
			expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("false");
			expect(screen.getByTestId("login-error")).toHaveTextContent(
				"Credenciales inválidas"
			);
		});
	});

	it("should handle network errors during login", async () => {
		const TestNetworkErrorComponent = () => {
			const { login } = useAuth();
			const [loginResult, setLoginResult] = React.useState(null);

			const handleNetworkError = async () => {
				const result = await login("test@example.com", "password123");
				setLoginResult(result);
			};

			return (
				<div>
					<button onClick={handleNetworkError} data-testid="network-error-btn">
						Network Error
					</button>
					<div data-testid="login-success">
						{loginResult?.success ? "true" : "false"}
					</div>
					<div data-testid="login-error">{loginResult?.error || "null"}</div>
				</div>
			);
		};

		// Mock inicial de checkAuth
		mockFetchResponse(null, false, 401);

		render(
			<AuthProvider>
				<TestNetworkErrorComponent />
			</AuthProvider>
		);

		await waitFor(() => {
			expect(screen.getByTestId("login-success")).toHaveTextContent("false");
		});

		// Mock de error de red
		global.fetch.mockClear();
		global.fetch.mockRejectedValueOnce(new Error("Error de conexión"));

		// Simular error de red
		const networkErrorBtn = screen.getByTestId("network-error-btn");
		networkErrorBtn.click();

		// Verificar que se maneja el error de red
		await waitFor(() => {
			expect(screen.getByTestId("login-success")).toHaveTextContent("false");
			expect(screen.getByTestId("login-error")).toHaveTextContent(
				"Error de conexión"
			);
		});
	});
	it("should logout successfully and clear user state", async () => {
		const TestLogoutComponent = () => {
			const { login, logout, user, isAuthenticated, loading } = useAuth();
			const [loginDone, setLoginDone] = React.useState(false);

			const handleLogin = async () => {
				await login("test@example.com", "password123");
				setLoginDone(true);
			};

			const handleLogout = async () => {
				await logout();
			};

			return (
				<div>
					<button onClick={handleLogin} data-testid="login-btn">
						Login
					</button>
					<button onClick={handleLogout} data-testid="logout-btn">
						Logout
					</button>
					<div data-testid="loading">{loading ? "true" : "false"}</div>
					<div data-testid="user-name">{user ? user.name : "null"}</div>
					<div data-testid="user-email">{user ? user.email : "null"}</div>
					<div data-testid="isAuthenticated">
						{isAuthenticated ? "true" : "false"}
					</div>
					<div data-testid="login-done">{loginDone ? "true" : "false"}</div>
				</div>
			);
		};

		// Mock inicial de checkAuth (no autenticado)
		mockFetchResponse(null, false, 401);

		render(
			<AuthProvider>
				<TestLogoutComponent />
			</AuthProvider>
		);

		// Esperar checkAuth inicial
		await waitFor(() => {
			expect(screen.getByTestId("loading")).toHaveTextContent("false");
		});

		// PASO 1: Hacer login primero
		global.fetch.mockClear();
		mockFetchResponse(
			{
				user: {
					nombre: "Test User",
					email: "test@example.com",
					rol: "ROLE_USER",
				},
			},
			true,
			200
		);

		const loginBtn = screen.getByTestId("login-btn");
		loginBtn.click();

		// Verificar que el login funcionó
		await waitFor(() => {
			expect(screen.getByTestId("login-done")).toHaveTextContent("true");
			expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("true");
			expect(screen.getByTestId("user-name")).toHaveTextContent("Test User");
		});

		// PASO 2: Hacer logout
		global.fetch.mockClear();
		// Mock de respuesta exitosa de logout (puede ser vacía)
		mockFetchResponse({}, true, 200);

		const logoutBtn = screen.getByTestId("logout-btn");
		logoutBtn.click();

		// Verificar que se llamó a la API de logout
		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:8080/auth/logout",
				expect.objectContaining({
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				})
			);
		});

		// Verificar que el estado se limpió correctamente
		await waitFor(() => {
			expect(screen.getByTestId("user-name")).toHaveTextContent("null");
			expect(screen.getByTestId("user-email")).toHaveTextContent("null");
			expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("false");
		});
	});
	describe("CheckAuth Functionality", () => {
		it("should detect existing user session on mount", async () => {
			const TestCheckAuthComponent = () => {
				const { user, loading, isAuthenticated, isAdmin, isUser } = useAuth();

				return (
					<div>
						<div data-testid="loading">{loading ? "true" : "false"}</div>
						<div data-testid="user-name">{user ? user.name : "null"}</div>
						<div data-testid="user-email">{user ? user.email : "null"}</div>
						<div data-testid="user-role">{user ? user.role : "null"}</div>
						<div data-testid="isAuthenticated">
							{isAuthenticated ? "true" : "false"}
						</div>
						<div data-testid="isAdmin">{isAdmin ? "true" : "false"}</div>
						<div data-testid="isUser">{isUser ? "true" : "false"}</div>
					</div>
				);
			};

			// Mock de checkAuth que devuelve usuario existente
			mockFetchResponse(
				{
					nombre: "Existing User",
					email: "existing@example.com",
					rol: "ROLE_USER",
				},
				true,
				200
			);

			render(
				<AuthProvider>
					<TestCheckAuthComponent />
				</AuthProvider>
			);

			// Verificar estado inicial (loading)
			expect(screen.getByTestId("loading")).toHaveTextContent("true");
			expect(screen.getByTestId("user-name")).toHaveTextContent("null");

			// Verificar que se llamó a checkAuth
			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:8080/auth/me",
				expect.objectContaining({
					method: "GET",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				})
			);

			// Esperar a que termine el loading y se detecte el usuario
			await waitFor(() => {
				expect(screen.getByTestId("loading")).toHaveTextContent("false");
				expect(screen.getByTestId("user-name")).toHaveTextContent(
					"Existing User"
				);
				expect(screen.getByTestId("user-email")).toHaveTextContent(
					"existing@example.com"
				);
				expect(screen.getByTestId("user-role")).toHaveTextContent("ROLE_USER");
				expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("true");
				expect(screen.getByTestId("isUser")).toHaveTextContent("true");
				expect(screen.getByTestId("isAdmin")).toHaveTextContent("false");
			});
		});

		it("should detect admin user session on mount", async () => {
			const TestCheckAuthAdminComponent = () => {
				const { user, loading, isAuthenticated, isAdmin, isUser } = useAuth();

				return (
					<div>
						<div data-testid="loading">{loading ? "true" : "false"}</div>
						<div data-testid="user-role">{user ? user.role : "null"}</div>
						<div data-testid="isAuthenticated">
							{isAuthenticated ? "true" : "false"}
						</div>
						<div data-testid="isAdmin">{isAdmin ? "true" : "false"}</div>
						<div data-testid="isUser">{isUser ? "true" : "false"}</div>
					</div>
				);
			};

			// Mock de checkAuth que devuelve admin existente
			mockFetchResponse(
				{
					nombre: "Admin User",
					email: "admin@example.com",
					rol: "ROLE_ADMIN",
				},
				true,
				200
			);

			render(
				<AuthProvider>
					<TestCheckAuthAdminComponent />
				</AuthProvider>
			);

			// Esperar a que se detecte el admin
			await waitFor(() => {
				expect(screen.getByTestId("loading")).toHaveTextContent("false");
				expect(screen.getByTestId("user-role")).toHaveTextContent("ROLE_ADMIN");
				expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("true");
				expect(screen.getByTestId("isAdmin")).toHaveTextContent("true");
				expect(screen.getByTestId("isUser")).toHaveTextContent("false");
			});
		});

		it("should handle checkAuth errors gracefully", async () => {
			const TestCheckAuthErrorComponent = () => {
				const { user, loading, isAuthenticated } = useAuth();

				return (
					<div>
						<div data-testid="loading">{loading ? "true" : "false"}</div>
						<div data-testid="user-name">{user ? user.name : "null"}</div>
						<div data-testid="isAuthenticated">
							{isAuthenticated ? "true" : "false"}
						</div>
					</div>
				);
			};

			// Mock de checkAuth que falla (servidor caído, etc.)
			global.fetch.mockRejectedValueOnce(new Error("Server error"));

			render(
				<AuthProvider>
					<TestCheckAuthErrorComponent />
				</AuthProvider>
			);

			// Verificar que se maneja el error y se pone loading en false
			await waitFor(() => {
				expect(screen.getByTestId("loading")).toHaveTextContent("false");
				expect(screen.getByTestId("user-name")).toHaveTextContent("null");
				expect(screen.getByTestId("isAuthenticated")).toHaveTextContent(
					"false"
				);
			});
		});
	});
});
