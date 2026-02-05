import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import '../styles/globals.css';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { getCachedCvData, getCachedPersonalInfo } from '../lib/data';

/**
 * Root Layout para App Router
 *
 * Estructura visual base:
 * - Header sticky con navegación y botón "Descargar CV"
 * - Contenido dinámico ({children})
 * - Footer con contacto, redes sociales y copyright
 *
 * Data fetching:
 * - Usa fetchers cacheados con React.cache() para evitar duplicación
 *   cuando page.js también consulta los mismos datos.
 */
export default async function RootLayout({ children }) {
  const [cvData, personalInfo] = await Promise.all([
    getCachedCvData(),
    getCachedPersonalInfo(),
  ]);

  return (
    <html lang="es-CO" className={GeistSans.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#2563EB" />
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
      </head>
      <body className={`${GeistSans.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
          </Script>
        )}
        <Header cvData={cvData} />
        <div className="flex-1">
          {children}
        </div>
        <Footer personalInfo={personalInfo} />
      </body>
    </html>
  );
}

export const revalidate = 3600;
