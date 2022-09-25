import Link from "next/link"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <header>
      <Link href="/">Now Foster</Link>

      <nav>
        <ul>
          <li>
            <Link href="/?quiz_open=true">Could you foster?</Link>
          </li>
          <li>
            <Link href="/apply">Apply now</Link>
          </li>
        </ul>
      </nav>
    </header>
    <hr />
    {children}
    <hr />
    <footer>© Now Foster 2022</footer>
  </>
)

export default Layout
