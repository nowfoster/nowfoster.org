import s from "./ProcessTimeline.module.scss"

const ProcessTimeline = () => (
  <ol className={s.timeline}>
    <li>
      <h3>Step 1: Intro Chat (30 min)</h3>
      <p>A short virtual chat to ask us anything about fostering. </p>
    </li>
    <li>
      <h3>Step 2: Introductory training (3 days)</h3>
      <p>A virtual Training session about the basics of fostering. </p>
    </li>
    <li>
      <h3>Step 3: Application phase (12 weeks)</h3>
      <p>Application phase that includes home visits and background checks. </p>
    </li>
    <li>
      <h3>Step 4: Empathy Training (4 days) </h3>
      <p>A training course to raise empathy for children in care. </p>
    </li>
    <li>
      <h3>Step 5: Approval panel (1 day)</h3>
      <p>A panel to decide if you can become a foster carer. </p>
    </li>
  </ol>
)

export default ProcessTimeline
