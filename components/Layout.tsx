import Head from "next/head"
import Link from "next/link"
import s from "./Layout.module.scss"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.png" />
      <title>Now Foster · The fostering service with heart</title>
    </Head>

    <a className={s.skip} href="#main-content">
      Skip to main content
    </a>

    <header className={s.header}>
      <div className={s.inner}>
        <Link href="/">
          <a className={s.masthead}>Now Foster</a>
        </Link>

        <nav className={s.nav}>
          <ul>
            <li>
              <Link href="#">Example</Link>
            </li>
            <li>
              <Link href="#">Example 2</Link>
            </li>
            <li>
              <Link href="/apply">
                <a className={s.primary}>Apply now</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main id="main-content">{children}</main>

    <footer className={s.footer}>© Now Foster 2022</footer>
  </>
)

export default Layout
