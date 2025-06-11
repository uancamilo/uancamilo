import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Contacto from "../../pages/contacto";

// Mock de axios
jest.mock("axios", () => ({
	__esModule: true,
	default: jest.fn(() => Promise.resolve({ data: {} })),
}));

const mockedAxios = axios;

// Mock del router de Next.js
jest.mock("next/router", () => ({
	useRouter: () => ({
		push: jest.fn(),
		pathname: "/contacto",
		route: "/contacto",
		asPath: "/contacto",
		query: {},
	}),
}));

// Mock de componentes si es necesario
jest.mock("../../components/layout", () => {
	return function MockLayout({ children }) {
		return <div data-testid="mock-layout">{children}</div>;
	};
});

jest.mock("../../components/container", () => {
	return function MockContainer({ children }) {
		return <div data-testid="mock-container">{children}</div>;
	};
});

// Mock de variables de entorno
process.env.NEXT_PUBLIC_API_URL = "http://localhost:8080";

// Suprimir logs en la consola durante tests
const originalError = console.error;
const originalLog = console.log;
beforeAll(() => {
	console.error = (...args) => {
		if (
			typeof args[0] === "string" &&
			(args[0].includes("Cross origin") ||
				args[0].includes("XMLHttpRequest") ||
				args[0].includes("Warning: An update to") ||
				args[0].includes("Warning: The current testing environment"))
		) {
			return;
		}
		originalError.call(console, ...args);
	};

	console.log = jest.fn();
});

afterAll(() => {
	console.error = originalError;
	console.log = originalLog;
});

describe("Contacto Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		// Mock por defecto exitoso para axios
		mockedAxios.mockResolvedValue({
			status: 200,
			data: { success: true, message: "Mensaje enviado correctamente" },
		});
	});

	describe("Form Rendering", () => {
		it("should render contact form with all required fields", () => {
			render(<Contacto />);

			expect(screen.getByLabelText(/nombres/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/empresa.*compañía/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: /enviar/i })
			).toBeInTheDocument();
		});

		it("should have proper form structure and accessibility", () => {
			render(<Contacto />);

			// Verificar que el form existe
			const form = document.querySelector("form");
			expect(form).toBeInTheDocument();

			// Verificar que los campos tengan los IDs correctos
			expect(screen.getByLabelText(/nombres/i)).toHaveAttribute("id", "nombre");
			expect(screen.getByLabelText(/correo electrónico/i)).toHaveAttribute(
				"id",
				"email"
			);
			expect(screen.getByLabelText(/empresa.*compañía/i)).toHaveAttribute(
				"id",
				"empresa"
			);
			expect(screen.getByLabelText(/teléfono/i)).toHaveAttribute(
				"id",
				"telefono"
			);
			expect(screen.getByLabelText(/mensaje/i)).toHaveAttribute(
				"id",
				"mensaje"
			);
		});
	});

	describe("Form Validation", () => {
		it("should show validation errors for empty required fields", async () => {
			const user = userEvent.setup();
			render(<Contacto />);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			await waitFor(() => {
				// Verificar mensajes específicos del componente
				expect(
					screen.getByText("No olvides ingresar el nombre.")
				).toBeInTheDocument();
				expect(
					screen.getByText("El correo electrónico es requerido")
				).toBeInTheDocument();
				expect(
					screen.getByText("Indicame a cual entidad representas")
				).toBeInTheDocument();
				expect(
					screen.getByText("El teléfono es requerido")
				).toBeInTheDocument();
				expect(screen.getByText("El mensaje es requerido")).toBeInTheDocument();
			});
		});

		it("should validate email format", async () => {
			const user = userEvent.setup();
			render(<Contacto />);

			const emailInput = screen.getByLabelText(/correo electrónico/i);

			await user.type(emailInput, "email-invalido");
			await user.tab(); // Trigger onBlur

			await waitFor(() => {
				expect(
					screen.getByText(
						"Esta debe ser una dirección de correo electrónico válida."
					)
				).toBeInTheDocument();
			});
		});

		it("should validate minimum length for nombre", async () => {
			const user = userEvent.setup();
			render(<Contacto />);

			const nombreInput = screen.getByLabelText(/nombres/i);
			const submitButton = screen.getByRole("button", { name: /enviar/i });

			await user.type(nombreInput, "A");
			await user.click(submitButton);

			await waitFor(() => {
				expect(
					screen.getByText("El nombre debe tener al menos 2 caracteres.")
				).toBeInTheDocument();
			});
		});

		it("should validate minimum length for mensaje", async () => {
			const user = userEvent.setup();
			render(<Contacto />);

			const mensajeInput = screen.getByLabelText(/mensaje/i);
			const submitButton = screen.getByRole("button", { name: /enviar/i });

			await user.type(mensajeInput, "Hola");
			await user.click(submitButton);

			await waitFor(() => {
				expect(
					screen.getByText("El mensaje debe tener al menos 10 caracteres.")
				).toBeInTheDocument();
			});
		});

		it("should not show errors when all fields are valid", async () => {
			const user = userEvent.setup();
			render(<Contacto />);

			// Llenar todos los campos requeridos con datos válidos
			await user.type(screen.getByLabelText(/nombres/i), "Juan Pérez");
			await user.type(
				screen.getByLabelText(/correo electrónico/i),
				"juan@example.com"
			);
			await user.type(
				screen.getByLabelText(/empresa.*compañía/i),
				"Mi Empresa"
			);
			await user.type(screen.getByLabelText(/teléfono/i), "+57 300 123 4567");
			await user.type(
				screen.getByLabelText(/mensaje/i),
				"Este es mi mensaje de prueba con más de 10 caracteres"
			);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			// Verificar que no haya errores de validación específicos
			expect(
				screen.queryByText("No olvides ingresar el nombre.")
			).not.toBeInTheDocument();
			expect(
				screen.queryByText("El correo electrónico es requerido")
			).not.toBeInTheDocument();
			expect(
				screen.queryByText("Indicame a cual entidad representas")
			).not.toBeInTheDocument();
			expect(
				screen.queryByText("El teléfono es requerido")
			).not.toBeInTheDocument();
			expect(
				screen.queryByText("El mensaje es requerido")
			).not.toBeInTheDocument();
		});
	});

	describe("Form Submission", () => {
		it("should submit form with correct data", async () => {
			const user = userEvent.setup();
			render(<Contacto />);

			// Llenar el formulario
			const formData = {
				nombre: "Juan Pérez",
				email: "juan@example.com",
				empresa: "Mi Empresa",
				telefono: "+57 300 123 4567",
				mensaje: "Este es mi mensaje de prueba con suficientes caracteres",
			};

			await user.type(screen.getByLabelText(/nombres/i), formData.nombre);
			await user.type(
				screen.getByLabelText(/correo electrónico/i),
				formData.email
			);
			await user.type(
				screen.getByLabelText(/empresa.*compañía/i),
				formData.empresa
			);
			await user.type(screen.getByLabelText(/teléfono/i), formData.telefono);
			await user.type(screen.getByLabelText(/mensaje/i), formData.mensaje);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			await waitFor(() => {
				expect(mockedAxios).toHaveBeenCalledWith({
					method: "POST",
					url: "http://localhost:8080/api/contact",
					headers: {
						Accept: "application/json, text/plain, */*",
						"Content-Type": "application/json",
					},
					data: formData,
					timeout: 10000,
				});
			});
		});

		it("should show success message after successful submission", async () => {
			const user = userEvent.setup();
			render(<Contacto />);

			// Llenar formulario válido
			await user.type(screen.getByLabelText(/nombres/i), "Juan Pérez");
			await user.type(
				screen.getByLabelText(/correo electrónico/i),
				"juan@example.com"
			);
			await user.type(
				screen.getByLabelText(/empresa.*compañía/i),
				"Mi Empresa"
			);
			await user.type(screen.getByLabelText(/teléfono/i), "+57 300 123 4567");
			await user.type(
				screen.getByLabelText(/mensaje/i),
				"Mensaje de prueba con suficientes caracteres"
			);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			await waitFor(() => {
				expect(
					screen.getByText(
						"¡Mensaje enviado exitosamente! Te contactaremos pronto."
					)
				).toBeInTheDocument();
			});
		});

		it("should handle submission errors", async () => {
			const user = userEvent.setup();

			// Mock error response
			mockedAxios.mockRejectedValueOnce({
				response: {
					status: 500,
					data: { message: "Error del servidor" },
				},
			});

			render(<Contacto />);

			// Llenar formulario válido
			await user.type(screen.getByLabelText(/nombres/i), "Juan Pérez");
			await user.type(
				screen.getByLabelText(/correo electrónico/i),
				"juan@example.com"
			);
			await user.type(
				screen.getByLabelText(/empresa.*compañía/i),
				"Mi Empresa"
			);
			await user.type(screen.getByLabelText(/teléfono/i), "+57 300 123 4567");
			await user.type(
				screen.getByLabelText(/mensaje/i),
				"Mensaje de prueba con suficientes caracteres"
			);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			await waitFor(() => {
				expect(
					screen.getByText(
						/Hubo un error al enviar el mensaje.*Error del servidor/
					)
				).toBeInTheDocument();
			});
		});

		it("should handle network timeout errors", async () => {
			const user = userEvent.setup();

			// Mock timeout error
			mockedAxios.mockRejectedValueOnce({
				code: "ECONNABORTED",
			});

			render(<Contacto />);

			// Llenar formulario válido
			await user.type(screen.getByLabelText(/nombres/i), "Juan Pérez");
			await user.type(
				screen.getByLabelText(/correo electrónico/i),
				"juan@example.com"
			);
			await user.type(
				screen.getByLabelText(/empresa.*compañía/i),
				"Mi Empresa"
			);
			await user.type(screen.getByLabelText(/teléfono/i), "+57 300 123 4567");
			await user.type(
				screen.getByLabelText(/mensaje/i),
				"Mensaje de prueba con suficientes caracteres"
			);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			await waitFor(() => {
				expect(
					screen.getByText(
						/Hubo un error al enviar el mensaje.*La solicitud tardó demasiado tiempo/
					)
				).toBeInTheDocument();
			});
		});

		it("should disable submit button during submission", async () => {
			const user = userEvent.setup();

			// Mock con delay controlado
			let resolvePromise;
			mockedAxios.mockImplementation(
				() =>
					new Promise((resolve) => {
						resolvePromise = resolve;
					})
			);

			render(<Contacto />);

			// Llenar formulario
			await user.type(screen.getByLabelText(/nombres/i), "Juan Pérez");
			await user.type(
				screen.getByLabelText(/correo electrónico/i),
				"juan@example.com"
			);
			await user.type(
				screen.getByLabelText(/empresa.*compañía/i),
				"Mi Empresa"
			);
			await user.type(screen.getByLabelText(/teléfono/i), "+57 300 123 4567");
			await user.type(
				screen.getByLabelText(/mensaje/i),
				"Mensaje de prueba con suficientes caracteres"
			);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			// Verificar que el botón se deshabilita y muestra "Enviando..."
			expect(submitButton).toBeDisabled();
			expect(screen.getByText("Enviando...")).toBeInTheDocument();

			// Resolver la promesa
			resolvePromise({ status: 200, data: { success: true } });

			// Verificar que el botón se rehabilita
			await waitFor(() => {
				expect(submitButton).not.toBeDisabled();
				expect(screen.queryByText("Enviando...")).not.toBeInTheDocument();
			});
		});

		it("should clear form after successful submission", async () => {
			const user = userEvent.setup();
			render(<Contacto />);

			const nombreInput = screen.getByLabelText(/nombres/i);
			const emailInput = screen.getByLabelText(/correo electrónico/i);
			const empresaInput = screen.getByLabelText(/empresa.*compañía/i);
			const telefonoInput = screen.getByLabelText(/teléfono/i);
			const mensajeInput = screen.getByLabelText(/mensaje/i);

			// Llenar formulario
			await user.type(nombreInput, "Juan Pérez");
			await user.type(emailInput, "juan@example.com");
			await user.type(empresaInput, "Mi Empresa");
			await user.type(telefonoInput, "+57 300 123 4567");
			await user.type(
				mensajeInput,
				"Mensaje de prueba con suficientes caracteres"
			);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			await waitFor(() => {
				expect(nombreInput.value).toBe("");
				expect(emailInput.value).toBe("");
				expect(empresaInput.value).toBe("");
				expect(telefonoInput.value).toBe("");
				expect(mensajeInput.value).toBe("");
			});
		});
	});

	describe("Loading States", () => {
		it("should show loading notification during submission", async () => {
			const user = userEvent.setup();

			// Mock con delay controlado
			let resolvePromise;
			mockedAxios.mockImplementation(
				() =>
					new Promise((resolve) => {
						resolvePromise = resolve;
					})
			);

			render(<Contacto />);

			// Llenar formulario
			await user.type(screen.getByLabelText(/nombres/i), "Juan Pérez");
			await user.type(
				screen.getByLabelText(/correo electrónico/i),
				"juan@example.com"
			);
			await user.type(
				screen.getByLabelText(/empresa.*compañía/i),
				"Mi Empresa"
			);
			await user.type(screen.getByLabelText(/teléfono/i), "+57 300 123 4567");
			await user.type(
				screen.getByLabelText(/mensaje/i),
				"Mensaje de prueba con suficientes caracteres"
			);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			// Verificar indicador de loading en la notificación
			expect(screen.getByText("Enviando mensaje...")).toBeInTheDocument();

			// Resolver la promesa
			resolvePromise({ status: 200, data: { success: true } });

			// Esperar a que termine
			await waitFor(() => {
				expect(
					screen.queryByText("Enviando mensaje...")
				).not.toBeInTheDocument();
			});
		});
	});

	describe("Notification System", () => {
		it("should show success notification", async () => {
			const user = userEvent.setup();
			render(<Contacto />);

			// Llenar formulario válido
			await user.type(screen.getByLabelText(/nombres/i), "Juan Pérez");
			await user.type(
				screen.getByLabelText(/correo electrónico/i),
				"juan@example.com"
			);
			await user.type(
				screen.getByLabelText(/empresa.*compañía/i),
				"Mi Empresa"
			);
			await user.type(screen.getByLabelText(/teléfono/i), "+57 300 123 4567");
			await user.type(
				screen.getByLabelText(/mensaje/i),
				"Mensaje de prueba con suficientes caracteres"
			);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			// Verificar que aparece la notificación de éxito
			await waitFor(() => {
				expect(
					screen.getByText(
						"¡Mensaje enviado exitosamente! Te contactaremos pronto."
					)
				).toBeInTheDocument();
			});
		});

		it("should allow manual notification dismissal", async () => {
			const user = userEvent.setup();
			render(<Contacto />);

			// Llenar formulario válido
			await user.type(screen.getByLabelText(/nombres/i), "Juan Pérez");
			await user.type(
				screen.getByLabelText(/correo electrónico/i),
				"juan@example.com"
			);
			await user.type(
				screen.getByLabelText(/empresa.*compañía/i),
				"Mi Empresa"
			);
			await user.type(screen.getByLabelText(/teléfono/i), "+57 300 123 4567");
			await user.type(
				screen.getByLabelText(/mensaje/i),
				"Mensaje de prueba con suficientes caracteres"
			);

			const submitButton = screen.getByRole("button", { name: /enviar/i });
			await user.click(submitButton);

			// Verificar que aparece la notificación
			await waitFor(() => {
				expect(
					screen.getByText(
						"¡Mensaje enviado exitosamente! Te contactaremos pronto."
					)
				).toBeInTheDocument();
			});

			// Hacer clic en el botón de cerrar
			const closeButton = screen.getByText("✕");
			await user.click(closeButton);

			// Verificar que la notificación se oculta
			expect(
				screen.queryByText(
					"¡Mensaje enviado exitosamente! Te contactaremos pronto."
				)
			).not.toBeInTheDocument();
		});
	});
});
