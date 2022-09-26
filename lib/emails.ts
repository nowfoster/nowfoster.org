import sg from "@sendgrid/mail"
import { Application } from "../types"

sg.setApiKey(process.env.SENDGRID_API_KEY as string)

/** send alert to admin inbox that new application has been made */
export const notifyAdmin = async (application: Application) =>
  await sg.send({
    from: process.env.DEFAULT_FROM as string,
    replyTo: application.email,
    templateId: process.env.NOTIFY_ADMIN_TEMPLATE_ID as string,
    personalizations: [
      {
        to: process.env.ADMIN_MAILBOX as string,
        dynamicTemplateData: application,
      },
    ],
  })

/** send copy of responses back to applicant */
export const notifyApplicant = async (application: Application) =>
  await sg.send({
    from: process.env.DEFAULT_FROM as string,
    templateId: process.env.NOTIFY_APPLICANT_TEMPLATE_ID as string,
    personalizations: [
      {
        to: application.email,
        dynamicTemplateData: application,
      },
    ],
  })

/** save a smidge of time by doing both in parallel */
export const sendNotifications = async (application: Application) =>
  await Promise.all([notifyAdmin(application), notifyApplicant(application)])
