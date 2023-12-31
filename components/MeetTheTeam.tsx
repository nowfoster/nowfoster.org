/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { TeamMember } from "../types"
import s from "./MeetTheTeam.module.scss"

const Card = (teamMember: TeamMember) => (
  <div className={s.card}>
    <img
      src={teamMember.portrait?.fields.file.url}
      alt={teamMember.portrait?.fields.title || ""}
      width={250}
    />
    <h3>
      <Link href={teamMember.link || "/"}>{teamMember.name}</Link>
    </h3>
    <p>{teamMember.role}</p>
    <p>{teamMember.biography}</p>
  </div>
)

const MeetTheTeam = ({ teamMembers }: { teamMembers: TeamMember[] }) => (
  <section className={s.meetTheTeam}>
    <div className={s.container} id="team">
      <div className={s.heading}>
        <h1 className="section-heading">Meet the team</h1>
        <p className="section-caption">
          Now Foster is a team of innovative social workers, designers and
          entrepreneurs who want to change how fostering is done.
        </p>
      </div>
      <div className={s.cards}>
        <div className={s.row}>
          {teamMembers
            .filter(m => m.type === "Team")
            .map(m => (
              <Card {...m} key={m.id} />
            ))}
        </div>
      </div>
    </div>
    <div className={s.container} id="team">
      <div className={s.heading}>
        <h1 className="section-heading">Advisors</h1>
        <p className="section-caption"></p>
      </div>
      <div className={s.cards}>
        <div className={s.row}>
          {teamMembers
            .sort((a,b) => a.name!.localeCompare(b.name!)) //sort alphabetically
            .filter(m => m.type === "Board")
            .map(m => (
              <Card {...m} key={m.id} />
            ))}
        </div>
      </div>
    </div>

    <div className={s.container} id="team">
      <div className={s.heading}>
        <h1 className="section-heading">Supporters</h1>
      </div>
      <div className={s.cards}>
        <div className={s.supporters}>
          <Link href="https://thefrontline.org.uk/">
            <img src="/supporters/1.png" alt="Frontline" />
          </Link>
          <Link href="https://www.timpson-group.co.uk/alex-timpson-trust/ ">
            <img src="/supporters/2.jpg" alt="The Alex Timpson Trust" />
          </Link>
          <Link href="https://ideasimpossible.org/">
            <img src="/supporters/3.png" alt="Impossible Ideas, Inc" />
          </Link>
          <Link href="https://www.newham.gov.uk/">
            <img src="/supporters/4.jpg" alt="Newham London" />
          </Link>
        </div>
      </div>
    </div>
  </section>
)

export default MeetTheTeam
