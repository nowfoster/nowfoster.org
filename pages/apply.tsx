import { NextPageContext } from "next"
import ApplicationForm from "../components/ApplicationForm"
import { getAvailability } from "../lib/calendar"
import { Availability } from "../types"

const ApplyPage = (availability: Availability) => {
  return (
    <>
      <h1>Apply to foster</h1>
      <ApplicationForm availability={availability} />
    </>
  )
}

export default ApplyPage

export const getStaticProps = async (context: NextPageContext) => {
  const availability = await getAvailability()

  return {
    props: availability,
  }
}
