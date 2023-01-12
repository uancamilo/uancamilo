import Head from "next/head";

export default function Meta() {
	return (
		<Head>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/favicon/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon/favicon-16x16.png"
			/>
			<link rel="manifest" href="/favicon/site.webmanifest" />
			<link
				rel="mask-icon"
				href="/favicon/safari-pinned-tab.svg"
				color="#000000"
			/>
			<link rel="shortcut icon" href="/favicon/favicon.ico" />
			<meta name="msapplication-TileColor" content="#000000" />
			<meta name="msapplication-config" content="/favicon/browserconfig.xml" />
			<meta name="theme-color" content="#000" />
			<meta
				name="description"
				content="Esta es la web de Juan Camilo Serna. FrontEnd dev. Medellín, Colombia."
			/>
			<meta
				name="google-site-verification"
				content="SmSLs8hW6F2BOxiuyl2zJ367y1w8jxVj6fM3SBgosZo"
			/>
			<meta name="p:domain_verify" content="593b420af50c5c86dfdefe8d945391a9" />
			<link rel="alternate" type="application/rss+xml" href="/feed.xml" />
			<meta
				name="Juan Camilo Serna "
				content="Desarrollador FrontEnd Juan Camilo"
			/>
		</Head>
	);
}
