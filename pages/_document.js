import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getPersonalInfo } from '../services/contentful/personalInfo';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    const reflect = (promise) =>
      promise
        .then((value) => ({ status: 'fulfilled', value }))
        .catch((error) => ({ status: 'rejected', reason: error }));

    const personalInfoResult = await reflect(getPersonalInfo());
    const rawPersonalInfo =
      personalInfoResult.status === 'fulfilled'
        ? personalInfoResult.value
        : null;
    
    // Asumimos que adaptPersonalInfo ahora maneja todos los campos del schema.
    const personalInfo = adaptPersonalInfo(rawPersonalInfo);

    return { ...initialProps, personalInfo };
  }

  render() {
    const { personalInfo } = this.props;

    // Proporcionar valores predeterminados robustos en caso de que los datos no lleguen.
    const siteUrl = personalInfo?.website || 'https://uancamilo.vercel.app/';
    const authorName = personalInfo?.name || 'Juan Camilo Serna';

    const personSchema = {
      '@type': 'Person',
      '@id': `${siteUrl}#person`,
      name: authorName,
      jobTitle: personalInfo?.jobTitle || 'Desarrollador de páginas web full stack',
      knowsAbout: personalInfo?.knowsAbout || [
        'React',
        'Next.js',
        'JavaScript',
        'SEO técnico',
        'desarrollo web',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: personalInfo?.location || 'Medellín',
        addressCountry: {
          '@type': 'Country',
          name: 'CO',
        },
      },
      url: siteUrl,
      email: personalInfo?.email || 'juansernamadrid@gmail.com',
      telephone: personalInfo?.phone || '+573005534553',
    };

    if (personalInfo?.sameAs?.length > 0) {
      personSchema.sameAs = personalInfo.sameAs;
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        personSchema,
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}#website`,
          url: siteUrl,
          name: authorName,
          inLanguage: 'es-CO',
          author: {
            '@id': `${siteUrl}#person`,
          },
          description: personalInfo?.description || 'Portafolio de Juan Camilo Serna, desarrollador de páginas web full stack.',
        },
      ],
    };

    return (
      <Html lang="es-CO">
        <Head>
          <link rel="canonical" href={siteUrl} />
          <link rel="alternate" href={siteUrl} hrefLang="es-CO" />
          <link rel="alternate" href={siteUrl} hrefLang="es" />
          <link rel="alternate" href={siteUrl} hrefLang="x-default" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
