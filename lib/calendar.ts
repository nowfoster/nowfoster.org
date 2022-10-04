import { calendar_v3, google } from "googleapis"
import { Application, Availability } from "../types"

const { OAuth2 } = google.auth
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_CALENDAR_ID,
} = process.env

const auth = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)

auth.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
})

const calendar = google.calendar({ auth, version: "v3" })

export const getAvailability = async (): Promise<
  calendar_v3.Schema$Event[]
> => {
  const res = await calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
  })

  return res.data.items || []
}

export const bookSlot = async (application: Application): Promise<void> => {
  // TODO: insert gcal event
  //   calendar.events..update({
  //     eventId: "...",
  // requestBody
  //   })
}
