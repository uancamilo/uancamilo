import Script from 'next/script';
import '../styles/globals.css';

/**
 * Root Layout para App Router
 * Combina la funcionalidad de _app.js y _document.js del Pages Router
 *
 * Responsabilidades:
 * - Define estructura HTML base
 * - Carga estilos globales
 * - Integra Google Tag Manager (solo en producción)
 * - Configura Google Site Verification
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es-CO">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta
          name="google-site-verification"
          content="SmSLs8hW6F2BOxiuyl2zJ367y1w8jxVj6fM3SBgosZo"
        />
      </head>
      <body>
        {process.env.NODE_ENV === 'production' && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KBGT5ZFJ');`}
          </Script>
        )}
        {children}
      </body>
    </html>
  );
}
