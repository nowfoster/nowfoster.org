import s from "./ProcessTimeline.module.scss";

const ProcessTimeline = () => (
  <ol className={s.timeline}>
    <li>
      <h3>Check suitability</h3>
      <p>
        If you’re motivated to make a difference, want to support children and
        have a spare room then you could be a great Weekender.
      </p>
    </li>
    <li>
      <h3>Get trained</h3>
      <p>
        We need to make sure you are well prepared and have all the skills you
        need to foster. The training and assessment will help you start
        confidently.
      </p>
    </li>
    <li>
      <h3>Get matched</h3>
      <p>
        As part of your fostering approval, we’ll work with you and our partner
        local authorities to match you with a child or a young person.
      </p>
    </li>
    <li>
      <h3>Have fun</h3>
      <p>
        You’ll get an allowance to do exciting things – e.g. going to the park
        for ice cream, enjoying a show or going swimming.
      </p>
    </li>
  </ol>
);

export default ProcessTimeline;
