// middleware.js
import { NextResponse } from "next/server";

// Rutas protegidas
const PROTECTED_PATHS = ["/dashboard"];

export function middleware(request) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("jwt")?.value;

	const isProtectedRoute = PROTECTED_PATHS.some((path) =>
		pathname.startsWith(path)
	);

	if (isProtectedRoute && !token) {
		const loginUrl = new URL("/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}
export const config = {
	matcher: ["/dashboard/:path*"],
};
