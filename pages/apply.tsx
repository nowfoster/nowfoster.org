import { NextPageContext } from "next"
import ApplicationForm from "../components/ApplicationForm"
import { getAvailability } from "../lib/calendar"
import { Event } from "../types"

const ApplyPage = () => {
  return (
    <div className="container">
      <h1>Apply to foster</h1>
      <ApplicationForm />
    </div>
  )
}

export default ApplyPage
