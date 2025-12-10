import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="SmSLs8hW6F2BOxiuyl2zJ367y1w8jxVj6fM3SBgosZo" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

