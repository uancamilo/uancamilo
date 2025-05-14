import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
						credentials: "include", // Necesario para recibir cookie JWT
					});

					if (!res.ok) return null;

					const data = await res.json();

					const user = {
						name: data.user.nombre,
						email: data.user.email,
						role: data.user.rol,
					};

					return user;
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
});
