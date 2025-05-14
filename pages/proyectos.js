import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/layout";

export default function proyectos() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") return;

		if (!session) {
			router.replace("/login");
		}
	}, [session, status, router]);

	if (status === "loading" || !session) {
		return <p>Cargando...</p>;
	}
	return <Layout>proyectos</Layout>;
}
