import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import '../styles/globals.css';

/**
 * Root Layout para App Router
 *
 * Estructura visual base:
 * - Fondo neutro (gray-50)
 * - Tipografía Geist Sans optimizada con next/font
 * - Contenedor centrado con max-width
 * - Padding responsive
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es-CO" className={GeistSans.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#2563EB" />
        <meta
          name="google-site-verification"
          content="SmSLs8hW6F2BOxiuyl2zJ367y1w8jxVj6fM3SBgosZo"
        />
      </head>
      <body className={`${GeistSans.className} bg-gray-50 text-gray-900 min-h-screen`}>
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
