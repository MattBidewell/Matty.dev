import Head from 'next/head'
import Header from '@components/header/Header'
import Footer from '@components/footer/Footer'
import Content from '@components/content/Content'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Matty.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="<Matty.dev/>" />
        <Content></Content>
        <p className="description">
          <code>Matty.dev</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
