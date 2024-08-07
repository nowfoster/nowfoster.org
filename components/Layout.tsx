import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  blogUrl,
  linkedInUrl,
  facebookUrl,
  instaUrl,
  twitterUrl,
} from "../config";
import { useQuiz } from "../contexts/quiz";
import { Quiz } from "../types";
import s from "./Layout.module.scss";
import QuizLayout from "./QuizLayout";
import BetaBanner from "./BetaBanner";
import CookieBanner from "./CookieBanner";

interface Props {
  quiz?: Quiz;
  children: React.ReactNode;
}

const NavLinks = () => {
  const { quizStarted, lastVisitedPage } = useQuiz();

  return (
    <ul>
      <li>
        <Link href="/weekenders">Weekenders</Link>
      </li>
      <li>
        <Link href="/about-us">About us</Link>
      </li>
      <li>
        <Link href={blogUrl}>Our blog</Link>
      </li>
      <li>
        <Link href="mailto:hello@nowfoster.org" target="_blank">
          Contact us
        </Link>
      </li>
      <li>
        <Link href={lastVisitedPage} className={s.primary}>
          Get started
        </Link>
      </li>
    </ul>
  );
};

const Layout = ({ children, quiz }: Props) => {
  const { asPath } = useRouter();
  const [navOpen, setNavOpen] = useState<boolean>(false);

  if (asPath.includes("/could-you-foster") && quiz)
    return <QuizLayout quiz={quiz}>{children}</QuizLayout>;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>Now Foster · Forget everything you know about fostering</title>
      </Head>

      <a className={s.skip} href="#main-content">
        Skip to main content
      </a>
      <CookieBanner />
      {/* <BetaBanner></BetaBanner> */}
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
              Fostering reimagined. Now Foster is a Registered Charity in
              England and Wales number 1207932.
            </p>
          </div>
          <nav className={s.footerMenu}>
            <ul>
              <li>
                <Link href="/about-us">About us</Link>
              </li>
              <li>
                <Link href="/weekenders">Weekenders</Link>
              </li>
              <li>
                <Link href="http://blog.nowfoster.org">Our blog</Link>
              </li>
              <li>
                <Link href="mailto:hello@nowfoster.org" target="_blank">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/privacy">Privacy policy</Link>
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
  );
};

export default Layout;
