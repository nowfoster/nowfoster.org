import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import {
  blogUrl,
  linkedInUrl,
  facebookUrl,
  instaUrl,
  twitterUrl,
} from "../config"
import { useQuiz } from "../contexts/quiz"
import { Quiz } from "../types"
import s from "./Layout.module.scss"
import QuizLayout from "./QuizLayout"

interface Props {
  quiz?: Quiz
  children: React.ReactNode
}

const NavLinks = () => {
  const { quizStarted, lastVisitedPage } = useQuiz()

  return (
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
  )
}

const Layout = ({ children, quiz }: Props) => {
  const { asPath } = useRouter()
  const [navOpen, setNavOpen] = useState<boolean>(false)

  if (asPath.includes("/could-you-foster") && quiz)
    return <QuizLayout quiz={quiz}>{children}</QuizLayout>

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>Now Foster · Forget everything you know about fostering</title>
      </Head>

      <a className={s.skip} href="#main-content">
        Skip to main content
      </a>

      <header className={s.header}>
        <div className={s.inner}>
          <Link href="/" className={s.masthead}>
            <svg
              width="374"
              height="146"
              viewBox="0 0 374 146"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.5696 62.0708C40.7596 53.6108 40.8596 42.1308 40.8596 27.9308C40.8596 21.6108 38.8196 19.0808 33.2696 19.0808C27.7196 19.0808 23.3496 22.1908 23.3496 30.9408C23.3496 49.7108 23.4496 56.0308 23.5396 62.0608H0.389648C0.579648 53.4008 0.679649 45.6208 0.679649 31.9108C0.679649 18.9808 0.579648 9.83082 0.389648 1.47083H23.5396C23.4396 5.26083 23.4396 8.08083 23.2496 11.4908L23.8297 11.6808C27.4297 3.90082 34.2396 0.59082 43.9596 0.59082C56.5096 0.59082 63.6996 6.23083 63.6996 20.7208C63.6996 30.4508 63.5097 35.4108 63.5097 41.7308C63.5097 49.3208 63.6096 55.6408 63.8997 62.0608H40.5596L40.5696 62.0708Z"
                fill="#CCB4CB"
              />
              <path
                d="M102.459 63.3405C80.5793 63.3405 69.7793 52.1605 69.7793 30.5705C69.7793 8.98048 81.7393 0.230469 102.459 0.230469C123.179 0.230469 135.529 8.89048 135.529 30.5705C135.529 52.2505 124.349 63.3405 102.459 63.3405ZM102.459 17.3405C95.9393 17.3405 91.9593 20.5505 91.9593 30.9605C91.9593 41.3705 95.8493 45.3505 102.459 45.3505C109.069 45.3505 112.959 41.2705 112.959 30.9605C112.959 20.6505 109.069 17.3405 102.459 17.3405Z"
                fill="#CCB4CB"
              />
              <path
                d="M229.679 1.4807C226.079 15.9707 218.789 52.7307 216.839 62.0707C213.439 61.9707 208.959 61.8807 203.609 61.8807C196.899 61.8807 191.259 61.9807 189.019 62.0707C188.139 57.1107 186.199 44.9507 184.449 33.5707C183.869 29.9707 183.189 26.3707 182.599 23.2607H182.209C181.629 26.3707 180.949 30.0707 180.169 33.6707C178.419 44.8507 176.179 56.8207 175.109 62.0707C172.289 61.9707 167.039 61.8807 161.879 61.8807C155.169 61.8807 151.179 61.9807 149.239 62.0707C146.999 52.1507 140.099 15.2907 136.399 1.4807H159.059C159.449 5.7607 161.879 20.7407 163.529 31.8207C164.109 35.6107 164.599 39.1107 165.089 41.9307H165.669C166.159 39.0107 166.839 35.5107 167.519 31.6207C169.459 20.9207 171.989 6.7207 172.579 1.4707C175.789 1.5707 182.399 1.66071 185.809 1.66071C189.409 1.66071 194.269 1.6607 197.479 1.4707C197.969 6.3307 200.199 20.7307 202.249 31.9107C203.029 35.9007 203.509 39.3007 203.899 42.1207H204.479C204.869 39.3007 205.449 35.9007 206.229 31.9107C207.979 20.9207 210.219 7.0107 210.799 1.4707H229.669L229.679 1.4807Z"
                fill="#CCB4CB"
              />
              <path
                d="M61.0395 94.8209C66.5795 94.7209 72.1295 94.6309 77.5695 94.4309C77.4695 100.461 77.4694 107.561 77.6694 113.781C72.1294 113.681 66.5795 113.591 61.0395 113.491C61.0395 125.941 61.1395 134.981 61.6195 144.511C57.0495 144.321 53.4495 144.321 49.6595 144.321C45.8695 144.321 42.2695 144.321 37.7895 144.511C38.2795 133.421 38.4695 122.921 38.4695 113.681L32.4395 113.781C32.6295 107.941 32.6295 101.041 32.4395 95.0109H38.2794C38.1794 92.4809 38.1795 89.9509 38.1795 87.6209C38.1795 76.4409 44.0194 68.1709 62.4894 68.1709C69.3994 68.1709 73.9695 68.7509 79.0195 69.7309C78.4395 74.2009 77.7594 81.9809 77.3694 87.3309C75.1294 86.5509 72.2194 85.9709 68.6194 85.9709C62.9794 85.9709 61.0294 87.6209 61.0294 92.1009V94.8209H61.0395Z"
                fill="#CCB4CB"
              />
              <path
                d="M113.999 145.781C92.1193 145.781 81.3193 134.601 81.3193 113.011C81.3193 91.4209 93.2793 82.6709 113.999 82.6709C134.719 82.6709 147.069 91.3309 147.069 113.011C147.069 134.691 135.889 145.781 113.999 145.781ZM113.999 99.7809C107.479 99.7809 103.499 102.991 103.499 113.401C103.499 123.811 107.389 127.791 113.999 127.791C120.609 127.791 124.499 123.711 124.499 113.401C124.499 103.091 120.609 99.7809 113.999 99.7809Z"
                fill="#CCB4CB"
              />
              <path
                d="M189.57 102.501C189.57 98.9008 187.62 97.1508 181.11 97.1508C174.6 97.1508 173.04 98.6108 173.04 101.141C173.04 103.861 174.69 105.911 186.85 107.361C204.65 109.891 210.09 114.951 210.09 126.811C210.09 139.361 202.12 145.771 180.52 145.771C157.08 145.771 150.76 139.451 150.76 127.581C150.76 126.511 150.86 125.251 150.95 124.081C153.67 124.271 157.37 124.571 162.33 124.571C165.35 124.571 168.26 124.471 170.3 124.281C170.3 124.771 170.2 125.161 170.2 125.541C170.2 129.241 172.44 131.081 179.54 131.081C185.67 131.081 187.61 129.721 187.61 126.801C187.61 123.591 185.08 121.941 173.99 120.671C155.32 118.431 150.75 112.211 150.75 101.221C150.75 88.1908 159.6 82.8408 180.22 82.8408C202.01 82.8408 209.2 88.3808 209.2 100.351C209.2 101.421 209.1 102.591 209.01 103.851C206.19 103.561 201.52 103.361 197.44 103.361C194.23 103.361 191.31 103.461 189.56 103.551V102.481L189.57 102.501Z"
                fill="#CCB4CB"
              />
              <path
                d="M219.169 84.0309C219.269 79.8509 219.269 75.8609 219.269 72.4609C222.769 72.6509 226.659 72.6509 230.449 72.6509C234.239 72.6509 238.229 72.6509 241.729 72.4609C241.629 76.1609 241.439 80.0509 241.339 84.1309C248.249 84.1309 255.049 84.0309 260.599 83.9409C260.409 89.9709 260.109 97.0709 260.209 103.201C256.319 103.101 248.929 102.911 241.049 102.811C240.949 107.671 240.949 112.831 240.949 118.371C240.949 122.751 242.889 124.401 248.339 124.401C252.909 124.401 256.799 123.721 259.819 122.551C260.109 128.681 261.179 137.141 261.959 143.071C256.219 144.531 251.459 145.311 244.259 145.311C224.519 145.311 218.779 136.461 218.779 123.041C218.779 117.501 218.879 110.201 218.969 102.521L213.039 102.421C213.039 96.8809 213.139 89.1009 212.939 83.9409L219.159 84.0409L219.169 84.0309Z"
                fill="#CCB4CB"
              />
              <path
                d="M325.819 124.001C326.309 138.101 321.439 145.791 296.739 145.791C275.729 145.791 265.229 136.551 265.229 114.381C265.229 91.0409 276.509 82.6709 297.419 82.6709C319.589 82.6709 326.009 91.5209 326.009 107.471C326.009 112.431 325.819 116.321 325.519 118.951C319.489 118.761 310.449 118.761 302.369 118.761C296.439 118.761 290.989 118.761 287.099 118.861C287.589 128.391 290.499 131.411 297.309 131.411C303.529 131.411 305.379 128.981 305.479 124.021C307.809 124.211 311.219 124.311 315.109 124.311C319.189 124.311 322.789 124.211 325.809 124.021L325.819 124.001ZM287.209 109.411C292.849 109.511 299.169 109.511 305.489 109.411C305.589 108.631 305.589 107.761 305.589 106.781C305.589 99.3909 303.259 96.6709 297.029 96.6709C290.799 96.6709 287.989 99.0009 287.209 109.411Z"
                fill="#CCB4CB"
              />
              <path
                d="M350.15 96.96C352.87 87.04 358.81 83.25 366.78 83.25C369.21 83.25 371.45 83.54 373.59 84.13C373.01 91.04 372.42 100.08 372.33 108.05C370.19 107.37 367.76 106.98 365.23 106.98C357.45 107.08 354.73 110.19 354.73 121.08C354.73 128.76 354.83 137.91 355.22 144.52H330.71C330.9 136.06 331 126.92 331 113.88C331 100.84 331 92.48 330.71 83.93H349.87C349.68 88.11 349.48 92.2 349.38 96.96H350.16H350.15Z"
                fill="#CCB4CB"
              />
            </svg>
          </Link>

          <button
            className={s.mobileButton}
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? "Close menu" : "Menu"}
          </button>

          <nav className={s.nav}>
            <NavLinks />
          </nav>
        </div>
      </header>

      {navOpen && (
        <div className={s.mobileMenu}>
          <NavLinks />
        </div>
      )}

      <main id="main-content">{children}</main>

      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div className={s.footerLeft}>
            <p className={s.message}>
              Now Foster exists to find and support the next generation of
              foster carers.
            </p>
            <div className={s.logoBlock}>
              <p>In partnership with</p>
              <Link href="https://www.newham.gov.uk/" className="logo">
                <svg
                  width="161"
                  height="74"
                  viewBox="0 0 161 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="161" height="74" fill="url(#pattern0)" />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_1271_191"
                        transform="matrix(0.0028169 0 0 0.00612866 0 -0.00255044)"
                      />
                    </pattern>
                    <image
                      id="image0_1271_191"
                      width="355"
                      height="164"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
          <nav className={s.footerMenu}>
            <ul>
              <li>
                <Link href="/fostering-with-us">Fostering with us</Link>
              </li>
              <li>
                <Link href="/process">The process</Link>
              </li>
              <li>
                <Link href="http://blog.nowfoster.org">Blog</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
            </ul>
          </nav>

          <div className={s.connect}>
            <div className={s.mailingList}>
              <Link href="https://tinyletter.com/NowFoster">
                Join our mailing list
              </Link>
            </div>
            <nav className={s.socials}>
              Connect
              <div>
                <Link href={linkedInUrl}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="256"
                    height="256"
                    viewBox="0 0 256 256"
                  >
                    <g fill="#000" strokeMiterlimit="10" strokeWidth="1">
                      <path
                        d="M1.48 29.91h18.657v60.01H1.48V29.91zM10.809.08c5.963 0 10.809 4.846 10.809 10.819 0 5.967-4.846 10.813-10.809 10.813C4.832 21.712 0 16.866 0 10.899 0 4.926 4.832.08 10.809.08M31.835 29.91h17.89v8.206h.255c2.49-4.72 8.576-9.692 17.647-9.692C86.514 28.424 90 40.849 90 57.007V89.92H71.357V60.737c0-6.961-.121-15.912-9.692-15.912-9.706 0-11.187 7.587-11.187 15.412V89.92H31.835V29.91z"
                        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                        fill="white"
                      ></path>
                    </g>
                  </svg>
                  LinkedIn
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
                <Link href={instaUrl}>
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <path
                      d="M11.5 0C5.159 0 0 5.159 0 11.5V26.5C0 32.841 5.159 38 11.5 38H26.5C32.841 38 38 32.841 38 26.5V11.5C38 5.159 32.841 0 26.5 0H11.5ZM29 7C30.105 7 31 7.895 31 9C31 10.104 30.105 11 29 11C27.895 11 27 10.104 27 9C27 7.895 27.895 7 29 7ZM19 9C24.514 9 29 13.486 29 19C29 24.514 24.514 29 19 29C13.486 29 9 24.514 9 19C9 13.486 13.486 9 19 9ZM19 12C18.0807 12 17.1705 12.1811 16.3212 12.5328C15.4719 12.8846 14.7003 13.4002 14.0503 14.0503C13.4002 14.7003 12.8846 15.4719 12.5328 16.3212C12.1811 17.1705 12 18.0807 12 19C12 19.9193 12.1811 20.8295 12.5328 21.6788C12.8846 22.5281 13.4002 23.2997 14.0503 23.9497C14.7003 24.5998 15.4719 25.1154 16.3212 25.4672C17.1705 25.8189 18.0807 26 19 26C19.9193 26 20.8295 25.8189 21.6788 25.4672C22.5281 25.1154 23.2997 24.5998 23.9497 23.9497C24.5998 23.2997 25.1154 22.5281 25.4672 21.6788C25.8189 20.8295 26 19.9193 26 19C26 18.0807 25.8189 17.1705 25.4672 16.3212C25.1154 15.4719 24.5998 14.7003 23.9497 14.0503C23.2997 13.4002 22.5281 12.8846 21.6788 12.5328C20.8295 12.1811 19.9193 12 19 12V12Z"
                      fill="white"
                    />
                  </svg>
                  Instagram
                </Link>
                <Link href={facebookUrl}>
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none">
                    <path
                      d="M4 24V12H0V8H4V5.852C4 1.785 5.981 0 9.361 0C10.98 0 11.836 0.12 12.241 0.175V4H9.936C8.501 4 8 4.757 8 6.291V8H12.205L11.634 12H8V24H4Z"
                      fill="white"
                    />
                  </svg>
                  Facebook
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout
