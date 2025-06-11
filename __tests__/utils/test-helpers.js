import { render } from "@testing-library/react";
import { AuthProvider } from "../../context/AuthContext";

// Mock del router de Next.js
export const mockRouter = {
	push: jest.fn(),
	pathname: "/",
	route: "/",
	asPath: "/",
	query: {},
};

// Helper para renderizar con AuthProvider
export const renderWithAuthProvider = (ui, options = {}) => {
	const AllProviders = ({ children }) => (
		<AuthProvider>{children}</AuthProvider>
	);

	return render(ui, { wrapper: AllProviders, ...options });
};

// Mocks de respuestas del servidor
export const mockAuthResponses = {
	loginSuccess: {
		user: {
			nombre: "Test User",
			email: "test@example.com",
			rol: "ROLE_USER",
		},
	},
	loginSuccessAdmin: {
		user: {
			nombre: "Admin User",
			email: "admin@example.com",
			rol: "ROLE_ADMIN",
		},
	},
	checkAuthSuccess: {
		nombre: "Test User",
		email: "test@example.com",
		rol: "ROLE_USER",
	},
	loginError: {
		message: "Credenciales inválidas",
	},
};
