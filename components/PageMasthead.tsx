import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Link from "next/link"
import s from "./PageMasthead.module.scss"

interface Props {
  crumbs: React.ReactNode
  children: React.ReactNode
  title: string
  lede?: any
}

const PageMasthead = ({ crumbs, children, lede, title }: Props) => (
  <section className={s.masthead}>
    <ul className={s.breadcrumbs}>
      <li>
        <Link href="/">Home</Link>
      </li>
      {crumbs}
    </ul>

    <h1>{title}</h1>

    {lede && <div className={s.lede}>{documentToReactComponents(lede)}</div>}

    {children}
  </section>
)

export default PageMasthead
