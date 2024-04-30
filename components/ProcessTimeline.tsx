import s from "./ProcessTimeline.module.scss";

const ProcessTimeline = () => (
  <ol className={s.timeline}>
    <li>
      <h3>Step 1: Intro Chat (30 min)</h3>
      <p>A short virtual chat to ask us anything about fostering.</p>
    </li>
    <li>
      <h3>Step 2: Home visit (2 hours)</h3>
      <p>A conversation about your circumstances.</p>
    </li>
    <li>
      <h3>Step 3: Train and apply (12 weeks)</h3>
      <p>Get the paperwork done and train to become a foster carer.</p>
    </li>
    <li>
      <h3>Step 4: Approval panel (1 day)</h3>
      <p>A panel to decide if you can become a foster carer.</p>
    </li>
  </ol>
);

export default ProcessTimeline;
