import Link from 'next/link'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav>
        <div>
          <Link href='/'>
            <a>April's Kitchen</a>
          </Link>
        </div>
      </nav>

      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
