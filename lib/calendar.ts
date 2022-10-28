import { google } from "googleapis"
import { ApplicationInput, Event } from "../types"

const { OAuth2 } = google.auth
const {
  GOOGLE_CALENDAR_ID,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
} = process.env

const auth = new OAuth2({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
})

auth.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
})

const calendar = google.calendar({ auth, version: "v3" })

export const getAvailability = async (): Promise<Event[]> => {
  const res = await calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    singleEvents: true,
    maxResults: 50, // only show soonest 50 slots
    orderBy: "starttime",
  })

  return (
    res.data?.items
      ?.filter(event => !event.attendees) // only return events with no attendees booked on
      .map(event => ({ id: event.id, start: event.start, end: event.end })) ||
    []
  )
}

export const bookSlot = async (
  application: ApplicationInput
): Promise<void> => {
  const res = await calendar.events.get({
    calendarId: GOOGLE_CALENDAR_ID,
    eventId: application.eventId,
  })
  const event = res.data

  const newEvent = {
    ...event,
    attendees: event.attendees
      ? event.attendees?.concat({ email: application.email })
      : [{ email: application.email }],
    summary: `${event.summary} (BOOKED)`, // append title
  }

  const res2 = await calendar.events.update({
    calendarId: GOOGLE_CALENDAR_ID,
    eventId: application.eventId,
    requestBody: newEvent,
  })

  if (res2.status !== 200) throw "Failed to book slot"

  return
}
