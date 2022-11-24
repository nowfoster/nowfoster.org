import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { blogUrl, facebookUrl, instaUrl, twitterUrl } from "../config"
import { useQuiz } from "../contexts/quiz"
import { Quiz } from "../types"
import s from "./Layout.module.scss"
import QuizLayout from "./QuizLayout"

interface Props {
  quiz?: Quiz
  children: React.ReactNode
}

const Layout = ({ children, quiz }: Props) => {
  const { quizStarted, lastVisitedPage } = useQuiz()

  const { asPath } = useRouter()

  if (asPath.includes("/could-you-foster") && quiz)
    return <QuizLayout quiz={quiz}>{children}</QuizLayout>

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Now Foster · Forget everything you know about fostering</title>
      </Head>

      <a className={s.skip} href="#main-content">
        Skip to main content
      </a>

      <header className={s.header}>
        <div className={s.inner}>
          <Link href="/" className={s.masthead}>
            <svg width="101" height="94" viewBox="0 0 101 94" fill="none">
              <path
                d="M40.9446 9.58296C50.0329 4.29044 61.654 7.43125 66.9012 16.5982L90.6531 58.0936C95.9003 67.2605 92.7864 78.9822 83.6981 84.2747V84.2747C74.6098 89.5673 62.9886 86.4264 57.7415 77.2595L33.9895 35.7641C28.7424 26.5972 31.8563 14.8755 40.9446 9.58296V9.58296Z"
                fill="url(#paint0_linear_753_280)"
              />
              <path
                d="M59.2097 9.58296C50.1214 4.29044 38.5003 7.43125 33.2531 16.5982L9.50117 58.0936C4.25404 67.2605 7.36793 78.9822 16.4562 84.2747V84.2747C25.5445 89.5673 37.1657 86.4264 42.4128 77.2595L66.1648 35.7641C71.4119 26.5972 68.298 14.8755 59.2097 9.58296V9.58296Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_753_280"
                  x1="54.0256"
                  y1="38.5239"
                  x2="85.1457"
                  y2="84.8037"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
            Now Foster
          </Link>

          <nav className={s.nav}>
            <ul>
              <li>
                <Link href="/fostering-with-us">Fostering with us</Link>
              </li>
              <li>
                <Link href="/process">The process</Link>
              </li>
              <li>
                <Link href={blogUrl}>Blog</Link>
              </li>
              <li>
                <Link href={lastVisitedPage} className={s.primary}>
                  {quizStarted ? "Resume" : "Could you foster?"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className={s.footer}>
        <div className={s.footerInner}>
          <p className={s.message}>
            We are a not-for-profit start-up that raises the bar for service
            delivery in fostering
          </p>

          <nav className={s.footerMenu}>
            <ul>
              <li>
                <Link href="/fostering-with-us">About us</Link>
              </li>
              <li>
                <Link href="/could-you-foster">Could you foster</Link>
              </li>
              <li>
                <Link href="/#kinds-of-fostering">Kinds of fostering</Link>
              </li>
              <li>
                <Link href="/#why-foster">Why foster?</Link>
              </li>
            </ul>
          </nav>

          <nav className={s.footerMenu}>
            <ul>
              <li>
                <Link href="/contact">Contact us</Link>
              </li>

              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/inclusion">Inclusion</Link>
              </li>
              <li>
                <Link href="/faq">FAQs</Link>
              </li>
            </ul>
          </nav>

          <nav className={s.connect}>
            Connect
            <div>
              <Link href={facebookUrl}>
                <svg width="13" height="24" viewBox="0 0 13 24" fill="none">
                  <path
                    d="M4 24V12H0V8H4V5.852C4 1.785 5.981 0 9.361 0C10.98 0 11.836 0.12 12.241 0.175V4H9.936C8.501 4 8 4.757 8 6.291V8H12.205L11.634 12H8V24H4Z"
                    fill="white"
                  />
                </svg>
                Facebook
              </Link>
              <Link href={instaUrl}>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <path
                    d="M11.5 0C5.159 0 0 5.159 0 11.5V26.5C0 32.841 5.159 38 11.5 38H26.5C32.841 38 38 32.841 38 26.5V11.5C38 5.159 32.841 0 26.5 0H11.5ZM29 7C30.105 7 31 7.895 31 9C31 10.104 30.105 11 29 11C27.895 11 27 10.104 27 9C27 7.895 27.895 7 29 7ZM19 9C24.514 9 29 13.486 29 19C29 24.514 24.514 29 19 29C13.486 29 9 24.514 9 19C9 13.486 13.486 9 19 9ZM19 12C18.0807 12 17.1705 12.1811 16.3212 12.5328C15.4719 12.8846 14.7003 13.4002 14.0503 14.0503C13.4002 14.7003 12.8846 15.4719 12.5328 16.3212C12.1811 17.1705 12 18.0807 12 19C12 19.9193 12.1811 20.8295 12.5328 21.6788C12.8846 22.5281 13.4002 23.2997 14.0503 23.9497C14.7003 24.5998 15.4719 25.1154 16.3212 25.4672C17.1705 25.8189 18.0807 26 19 26C19.9193 26 20.8295 25.8189 21.6788 25.4672C22.5281 25.1154 23.2997 24.5998 23.9497 23.9497C24.5998 23.2997 25.1154 22.5281 25.4672 21.6788C25.8189 20.8295 26 19.9193 26 19C26 18.0807 25.8189 17.1705 25.4672 16.3212C25.1154 15.4719 24.5998 14.7003 23.9497 14.0503C23.2997 13.4002 22.5281 12.8846 21.6788 12.5328C20.8295 12.1811 19.9193 12 19 12V12Z"
                    fill="white"
                  />
                </svg>
                Instagram
              </Link>
              <Link href={twitterUrl}>
                <svg width="42" height="36" viewBox="0 0 42 36" fill="none">
                  <path
                    d="M41.7196 4.305C41.4246 4 40.9706 3.913 40.5836 4.091L40.4196 4.166C40.2806 4.23 40.1416 4.294 40.0016 4.357C40.4086 3.708 40.7316 3.014 40.9546 2.296C41.0786 1.9 40.9436 1.467 40.6156 1.211C40.2876 0.955 39.8356 0.928 39.4806 1.145C38.3396 1.838 37.2436 2.337 36.1106 2.685C34.4006 1.026 32.0716 0 29.5006 0C24.2536 0 20.0006 4.253 20.0006 9.5C20.0006 9.505 20.0006 9.703 20.0006 10L19.0016 9.92C9.27856 8.77 6.51056 2.23 6.39556 1.948C6.20956 1.478 5.79956 1.135 5.30456 1.032C4.81056 0.927 4.29756 1.082 3.93956 1.439C3.74156 1.638 2.00056 3.48 2.00056 7C2.00056 9.508 3.11856 11.542 4.56556 13.124C3.89156 12.713 3.49856 12.38 3.48856 12.371C3.02756 11.969 2.36756 11.885 1.81956 12.163C1.27356 12.442 0.951562 13.025 1.00656 13.636C1.02556 13.847 1.45156 17.849 6.07456 20.871L5.23156 21.024C4.72056 21.117 4.29356 21.468 4.10356 21.952C3.91456 22.437 3.98856 22.984 4.30056 23.4C4.40556 23.541 6.35856 26.08 10.5996 27.54C8.33456 28.295 5.22256 29 1.50056 29C0.912562 29 0.377562 29.344 0.134562 29.88C-0.109438 30.416 -0.0164382 31.045 0.371562 31.487C0.532562 31.672 4.43556 36 14.5006 36C31.2136 36 39.0006 20.485 39.0006 10V9.5C39.0006 9.352 38.9846 9.207 38.9786 9.061C41.0706 7.039 41.8576 5.522 41.8956 5.447C42.0846 5.067 42.0146 4.609 41.7196 4.305Z"
                    fill="white"
                  />
                </svg>
                Twitter
              </Link>
            </div>
          </nav>
        </div>
      </footer>
    </>
  )
}

export default Layout
