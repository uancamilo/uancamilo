import Head from 'next/head';
import { getPersonalInfo } from '../services/contentful/personalInfo';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';
import { composeSchemas } from '../seo/schema/composer';
import { composeMetadata } from '../seo/metadata/composer';

import ProfileHeader from '../components/sections/ProfileHeader';
import ContactSection from '../components/sections/ContactSection';

export default function Home({ personalInfo, schemaData, metadata }) {
  return (
    <>
      <Head>
        {metadata?.title && <title>{metadata.title}</title>}
        {metadata?.description && (
          <meta name="description" content={metadata.description} />
        )}
        {metadata?.canonical && <link rel="canonical" href={metadata.canonical} />}

        {schemaData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schemaData),
            }}
          />
        )}
      </Head>

      <main id="cv-content">
        <ProfileHeader personalInfo={personalInfo} />
        <ContactSection personalInfo={personalInfo} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const reflect = (promise) =>
    promise
      .then((value) => ({ status: 'fulfilled', value }))
      .catch((error) => ({ status: 'rejected', reason: error }));

  const [personalInfoResult] = await Promise.all([reflect(getPersonalInfo())]);

  const rawPersonalInfo =
    personalInfoResult.status === 'fulfilled' ? personalInfoResult.value : null;

  const personalInfo = adaptPersonalInfo(rawPersonalInfo);

  // Componer schemas para esta página
  const schemaData = composeSchemas(personalInfo, ['Person', 'WebSite']);

  // Componer metadata SEO para esta página
  const metadata = composeMetadata(personalInfo, ['base', 'canonical'], {
    path: '/',
  });

  return {
    props: {
      personalInfo,
      schemaData,
      metadata,
    },
    revalidate: 3600,
  };
}
