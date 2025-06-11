import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ProtectedRoute from "../../components/ProtectedRoutes";

// Mock simple del AuthContext
const mockAuthContext = {
	user: null,
	loading: false,
	isAuthenticated: false,
};

jest.mock("../../context/AuthContext", () => ({
	useAuth: () => mockAuthContext,
}));

// Componente de prueba
const TestComponent = () => (
	<div data-testid="protected-content">Protected Content</div>
);

describe("ProtectedRoute Component", () => {
	beforeEach(() => {
		// Reset del mock del AuthContext
		mockAuthContext.user = null;
		mockAuthContext.loading = false;
		mockAuthContext.isAuthenticated = false;
	});

	it("should show loading spinner when authentication is being verified", () => {
		// Configurar estado de loading
		mockAuthContext.loading = true;
		mockAuthContext.isAuthenticated = false;
		mockAuthContext.user = null;

		render(
			<ProtectedRoute>
				<TestComponent />
			</ProtectedRoute>
		);

		// Verificar que se muestra el loading
		expect(
			screen.getByText("Verificando autenticación...")
		).toBeInTheDocument();
		expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
	});

	it("should not render content when user is not authenticated", () => {
		// Configurar usuario no autenticado
		mockAuthContext.loading = false;
		mockAuthContext.isAuthenticated = false;
		mockAuthContext.user = null;

		render(
			<ProtectedRoute>
				<TestComponent />
			</ProtectedRoute>
		);

		// Verificar que no se muestra el contenido
		expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
		expect(
			screen.queryByText("Verificando autenticación...")
		).not.toBeInTheDocument();
	});

	it("should render children when user is authenticated and no role required", () => {
		// Configurar usuario autenticado
		mockAuthContext.loading = false;
		mockAuthContext.isAuthenticated = true;
		mockAuthContext.user = { role: "ROLE_USER", name: "Test User" };

		render(
			<ProtectedRoute>
				<TestComponent />
			</ProtectedRoute>
		);

		// Verificar que se muestra el contenido protegido
		expect(screen.getByTestId("protected-content")).toBeInTheDocument();
		expect(screen.getByText("Protected Content")).toBeInTheDocument();
	});

	it("should render children when user has correct role", () => {
		// Configurar usuario con rol correcto
		mockAuthContext.loading = false;
		mockAuthContext.isAuthenticated = true;
		mockAuthContext.user = { role: "ROLE_ADMIN", name: "Admin User" };

		render(
			<ProtectedRoute requireRole="ROLE_ADMIN">
				<TestComponent />
			</ProtectedRoute>
		);

		// Verificar que se muestra el contenido para admin
		expect(screen.getByTestId("protected-content")).toBeInTheDocument();
	});

	it("should not render content when user has incorrect role", () => {
		// Configurar usuario con rol incorrecto
		mockAuthContext.loading = false;
		mockAuthContext.isAuthenticated = true;
		mockAuthContext.user = { role: "ROLE_USER", name: "Regular User" };

		render(
			<ProtectedRoute requireRole="ROLE_ADMIN">
				<TestComponent />
			</ProtectedRoute>
		);

		// Verificar que NO se muestra el contenido (rol incorrecto)
		expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
	});
});
