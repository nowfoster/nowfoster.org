import { google } from "googleapis"
import { Application, Event } from "../types"

const { JWT } = google.auth
const {
  GOOGLE_CALENDAR_ID,
  GOOGLE_SRV_ACCT_CLIENT_EMAIL,
  GOOGLE_SRV_ACCT_PRIVATE_KEY,
} = process.env

const auth = new JWT(
  GOOGLE_SRV_ACCT_CLIENT_EMAIL,
  undefined,
  GOOGLE_SRV_ACCT_PRIVATE_KEY,
  [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ]
)

const calendar = google.calendar({ auth, version: "v3" })

export const getAvailability = async (): Promise<Event[]> => {
  await auth.authorize()

  const res = await calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    singleEvents: true,
    maxResults: 50, // only show soonest 50 slots
  })

  return (
    res.data?.items
      ?.filter(event => !event.attendees) // only return events with no attendees booked on
      .map(event => ({ id: event.id, start: event.start, end: event.end })) ||
    []
  )
}

export const bookSlot = async (
  eventId: string,
  application: Application
): Promise<void> => {
  await auth.authorize()

  const res = await calendar.events.patch({
    eventId,
    // requestBody: attendees
  })

  return
}
