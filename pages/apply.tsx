import { NextPageContext } from "next"
import ApplicationForm from "../components/ApplicationForm"
import { getAvailability } from "../lib/calendar"
import { Event } from "../types"

interface Props {
  availability: Event[]
}

const ApplyPage = ({ availability }: Props) => {
  return (
    <>
      <h1>Apply to foster</h1>
      <ApplicationForm availability={availability} />
    </>
  )
}

export default ApplyPage

export const getServerSideProps = async (context: NextPageContext) => {
  const availability = await getAvailability()

  return {
    props: { availability },
  }
}
