import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireRole = null }) => {
	const { user, loading, isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			router.push("/login");
			return;
		}

		// Verificar rol específico si se requiere
		if (!loading && isAuthenticated && requireRole) {
			if (user?.role !== requireRole) {
				// Redirigir según el rol del usuario
				if (user?.role === "ROLE_ADMIN") {
					router.push("/dashboard");
				} else {
					router.push("/proyectos");
				}
				return;
			}
		}
	}, [loading, isAuthenticated, user, requireRole, router]);

	// Mostrar loading mientras verifica autenticación
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#34A853]"></div>
				<span className="ml-3 text-gray-600">Verificando autenticación...</span>
			</div>
		);
	}

	// No mostrar contenido si no está autenticado
	if (!isAuthenticated) {
		return null;
	}

	// No mostrar contenido si no tiene el rol requerido
	if (requireRole && user?.role !== requireRole) {
		return null;
	}

	return children;
};

export default ProtectedRoute;
