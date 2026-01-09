import Head from 'next/head';
import { getPersonalInfo } from '../services/contentful/personalInfo';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';

import ProfileHeader from '../components/sections/ProfileHeader';

export default function Home({ personalInfo }) {
  return (
    <>
      <Head>
        <title>{`${personalInfo.name} | ${personalInfo.title}`}</title>
        <meta name="description" content={personalInfo.description} />
      </Head>
      <main id="cv-content">
        <ProfileHeader personalInfo={personalInfo} />
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

  return {
    props: {
      personalInfo,
    },
    revalidate: 3600,
  };
}
