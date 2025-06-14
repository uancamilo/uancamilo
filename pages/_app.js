import { AuthProvider } from "../context/AuthContext";
import "../styles/index.css";
import Script from "next/script";
import { GTM_ID } from "../lib/gtm";

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','${GTM_ID}');`,
				}}
			/>
			<Script
				src="https://platform.linkedin.com/badges/js/profile.js"
				strategy="afterInteractive"
				async
				defer
				type="text/javascript"
			/>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
