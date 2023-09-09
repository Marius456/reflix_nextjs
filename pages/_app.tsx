import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, SSRProvider } from 'react-bootstrap'
import { Navbar } from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router.pathname)
  return (
    <>
      <Head>
        <title>Reflix</title>
      </Head>
      <SSRProvider>
        {router.pathname != "/" ?
          (
            <>
              <Navbar />
              <div className="background">
                <Container className="mb-4">
                  <Component {...pageProps} />
                </Container>
              </div>
            </>
          ) : (
            <Component {...pageProps} />
          )
        }
      </SSRProvider>
    </>
  )
}

export default MyApp
