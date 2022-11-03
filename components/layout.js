import Navbar from "./navbar";
import Footer from "../components/footer";
import Meta from "../components/meta";

export default function Layout({ children }) {
	return (
		<>
			<Meta />
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
}
