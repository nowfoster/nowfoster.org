import s from "./BetaBanner.module.scss"

const BetaBanner = () => (
  <section className={s.betaBanner}>
    <div className={s.inner}>
        <p><strong>Beta.</strong> This is a new service - your <a href=".">feedback</a> will help us improve it.</p>
    </div>
  </section>
)

export default BetaBanner
