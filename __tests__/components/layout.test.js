import { render, screen } from "@testing-library/react";
import Layout from "../../components/layout";

jest.mock("../../components/navbar", () => {
	return function MockNavbar() {
		return <div data-testid="navbar">Navbar</div>;
	};
});

jest.mock("../../components/footer", () => {
	return function MockFooter() {
		return <div data-testid="footer">Footer</div>;
	};
});

jest.mock("../../components/whatsapp", () => {
	return function MockWhatsapp() {
		return <div data-testid="whatsapp">WhatsApp</div>;
	};
});

describe("Layout Component", () => {
	it("should render without crashing", () => {
		render(
			<Layout>
				<div>Test content</div>
			</Layout>
		);

		expect(screen.getByTestId("navbar")).toBeInTheDocument();
		expect(screen.getByTestId("footer")).toBeInTheDocument();
		expect(screen.getByTestId("whatsapp")).toBeInTheDocument();
		expect(screen.getByText("Test content")).toBeInTheDocument();
	});
});
