import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

if (process.env.NODE_ENV === "production" && !process.env.NEXTAUTH_SECRET) {
	throw new Error("❌ NEXTAUTH_SECRET es obligatorio en producción.");
}

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const res = await fetch("http://localhost:8080/auth/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
						credentials: "include",
					});

					if (!res.ok) return null;

					const data = await res.json();

					return {
						name: data.user.nombre,
						email: data.user.email,
						role: data.user.rol,
					};
				} catch (err) {
					console.error("Error en authorize():", err);
					return null;
				}
			},
		}),
	],

	session: {
		strategy: "jwt",
	},

	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.name = user.name;
				token.email = user.email;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.name = token.name;
			session.user.email = token.email;
			session.user.role = token.role;
			return session;
		},
	},

	pages: {
		signIn: "/login",
	},

	debug: process.env.NODE_ENV === "development",
});
