import Head from 'next/head'

const Microdata = ({ data }:any) => {
  const structuredData = JSON.stringify(data);

  return (
    <Head>
      <script type="application/ld+json">{structuredData}</script>
    </Head>
  );
};