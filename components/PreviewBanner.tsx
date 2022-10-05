import Link from "next/link"
import Head from "next/head"
import crossIcon from "./cross.svg"
import Image from "next/image"
import s from "./PreviewBanner.module.scss"

const PreviewBanner = () => (
  <header className={s.banner}>
    <Head>
      <title>Previewing...</title>
    </Head>
    This is a preview
    <Link href="/api/preview/exit">
      <a>
        <Image src={crossIcon} alt="" height={20} width={20} />
        Exit preview mode
      </a>
    </Link>
  </header>
)

export default PreviewBanner
