import Link from "next/link"
import s from "./Layout.module.scss"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <a className={s.skip} href="#main">
      Skip to main content
    </a>

    <header className={s.header}>
      <Link href="/">
        <a className={s.masthead}>Now Foster</a>
      </Link>

      <nav className={s.nav}>
        <ul>
          <li>
            <Link href="/?quiz_open=true">Could you foster?</Link>
          </li>
          <li>
            <Link href="/apply">
              <a className={s.primary}>Apply now</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>

    {children}

    <footer className={s.footer}>© Now Foster 2022</footer>
  </>
)

export default Layout
