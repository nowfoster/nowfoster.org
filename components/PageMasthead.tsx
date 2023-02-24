import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import s from "./PageMasthead.module.scss"

interface Props {
  children?: React.ReactNode
  title: string
  lede?: any
}

const PageMasthead = ({ children, lede, title }: Props) => (
  <section className={s.masthead}>
    <h1>{title}</h1>

    {lede && <div className={s.lede}>{documentToReactComponents(lede)}</div>}

    {children}
  </section>
)

export default PageMasthead
