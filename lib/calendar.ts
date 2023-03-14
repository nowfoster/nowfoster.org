import { calendar_v3, google } from "googleapis"
import { DateTime } from "luxon"
import { Application, Event } from "../types"

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

export const convertEvent = (event: calendar_v3.Schema$Event): Event => ({
  id: event.id,
  start: event.start,
  end: event.end,
})

export const getAvailability = async (): Promise<Event[]> => {
  const res = await calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    singleEvents: true,
    maxResults: 50, // only show soonest 50 slots
    orderBy: "starttime",
    timeMin: DateTime.now().plus({ hours: 24 }).toString(),
  })

  return (
    res.data?.items
      ?.filter(event => !event.attendees) // only return events with no attendees booked on
      .map(event => convertEvent(event)) || []
  )
}

export const bookSlot = async (application: Application): Promise<Event> => {
  const res = await calendar.events.get({
    calendarId: GOOGLE_CALENDAR_ID,
    eventId: application.eventId,
  })
  const event = res.data

  const newEvent: calendar_v3.Schema$Event = {
    ...event,
    attendees: event.attendees
      ? event.attendees?.concat({ email: application.email })
      : [{ email: application.email }],
    summary: `${event.summary} (BOOKED)`, // append title
    description: buildEventDescription(application),
  }

  const res2 = await calendar.events.update({
    calendarId: GOOGLE_CALENDAR_ID,
    eventId: application.eventId,
    requestBody: newEvent,
  })

  if (res2.status !== 200) throw "Failed to book slot"

  return convertEvent(res2.data)
}

const buildEventDescription = (application: Application): string =>
  `<strong>Name:</strong> ${application.firstName} ${
    application.lastName
  }\n<strong>Email:</strong> ${application.email}\n${
    application.phone ? `<strong>Phone:</strong> ${application.phone}` : ""
  }\n\n<strong>Made at:</strong> ${new Date(
    "2022-11-19T21:10:07.208Z"
  ).toLocaleString()}\n<strong>Contact preference:</strong> ${
    application.contactPreference
  }\n<strong>Level of interest:</strong> ${
    application.levelOfInterest
  }\n<strong>Topics to discuss:</strong> ${
    application.discussionTopics
  }\n<hr/>${
    application.answers
      ? Object.entries(application.answers)
          .map(
            ([sectionName, sectionAnswers]) =>
              `<h3>${sectionName}</h3>${Object.entries(sectionAnswers)
                .map(
                  ([question, answer]) =>
                    `<strong>${question}</strong>\n${
                      Array.isArray(answer) ? answer.join(", ") : answer
                    }\n`
                )
                .join("")}`
          )
          .join("")
      : ""
  }`
