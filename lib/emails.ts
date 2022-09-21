import sg from "@sendgrid/mail"
import { StoredApplication } from "../types"

sg.setApiKey(process.env.SENDGRID_API_KEY as string)

const ADMIN_MAILBOX = "foo@bar.com"
const DEFAULT_FROM = "foo@bar.com"

/** send alert to admin inbox that new application has been made */
export const notifyAdmin = async (application: StoredApplication) =>
  await sg.send({
    to: ADMIN_MAILBOX,
    from: DEFAULT_FROM,
    subject: "A new application has been made",
    text: "foo bar",
    html: "content",
  })

/** send copy of responses back to applicant */
export const notifyApplicant = async (application: StoredApplication) =>
  await sg.send({
    to: application.email,
    from: DEFAULT_FROM,
    subject: "Your application to foster",
    text: "foo bar",
    html: "foo bar",
  })

/** save a smidge of time by doing both in parallel */
export const sendNotifications = async (application: StoredApplication) =>
  await Promise.all([notifyAdmin(application), notifyApplicant(application)])
