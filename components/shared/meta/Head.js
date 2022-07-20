import Head from 'next/head';

export default function HeadBlock() {
  return (
    <Head>
      <title>Matty.dev</title>
      <link rel="icon" href="/avatar.png" />
      <meta charSet="utf-8" />
      <meta
        name="description"
        content={`The personal site of Matthew Bidewell`}
      />
    </Head>
  )
}