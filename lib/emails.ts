import sg from "@sendgrid/mail"
import { Answers, Application, Event } from "../types"

sg.setApiKey(process.env.SENDGRID_API_KEY as string)

export const prettyAnswersPlain = (answers: Answers): string =>
  Object.entries(answers)
    .map(
      ([sectionName, sectionAnswers]) =>
        `<h3>${sectionName}</h3>
          ${Object.entries(sectionAnswers)
            .map(
              ([question, answer]) =>
                `<p><strong>${question}</strong></p><p>${
                  Array.isArray(answer) ? answer.join(", ") : answer
                }</p>`
            )
            .join("")}`
    )
    .join("")

/** send alert to admin inbox that new application has been made */
export const notifyAdmin = async (application: Application, event?: Event) =>
  await sg.send({
    from: process.env.DEFAULT_FROM as string,
    replyTo: application.email,
    templateId: process.env.NOTIFY_ADMIN_TEMPLATE_ID as string,
    personalizations: [
      {
        to: process.env.ADMIN_MAILBOX as string,
        dynamicTemplateData: {
          ...application,
          introChatAt: new Date(
            event?.start?.dateTime as string
          ).toLocaleString("en-GB"),
          answers:
            application.answers && prettyAnswersPlain(application.answers),
        },
      },
    ],
  })

/** send copy of responses back to applicant */
export const notifyApplicant = async (
  application: Application,
  event?: Event
) => {
  await sg.send({
    from: process.env.DEFAULT_FROM as string,
    templateId: process.env.NOTIFY_APPLICANT_TEMPLATE_ID as string,
    personalizations: [
      {
        to: application.email,
        dynamicTemplateData: {
          ...application,
          introChatAt: new Date(
            event?.start?.dateTime as string
          ).toLocaleString("en-GB"),
          answers:
            application.answers && prettyAnswersPlain(application.answers),
        },
      },
    ],
  })
}

/** save a smidge of time by doing both in parallel */
export const sendNotifications = async (
  application: Application,
  event?: Event
) =>
  await Promise.all([
    notifyAdmin(application, event),
    notifyApplicant(application, event),
  ])
