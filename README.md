# iii fostering

[![On push](https://github.com/jhackett1/iii-fostering-nextjs/actions/workflows/on-push.yml/badge.svg)](https://github.com/jhackett1/iii-fostering-nextjs/actions/workflows/on-push.yml)

Next.js app for the III fostering project.

## ✅ Prerequisites

- Node.js
- FaunaDB account
- Contentful account
- Calendly account
- Google account and calendar

## 🧱 How it works

### Quiz

The quiz is a series of sections, each of which has several questions, which in tern has several possible answers.

The content comes in dynamically from Contentful. We have some type-safety for the returned content by using `contentful-typescript-codegen` and the Contentful management API to automatically generate types for it.

As the user completes the quiz, it is saved to their browser's local storage.

### Applying

When the user finishes the quiz, they can choose to convert their quiz answers into a full application.

They can also choose an interview slot, powered by fetching all events on a Google calendar with zero attendees.

Applying will:

- Save the user's details to FaunaDB
- Email the admin to let them know about the application
- Email a receipt to the applicant
- Add an attendee to the event they chose, therefore making it "unavailable" for the next applicant

## 💻 Running it locally

First, run `cp .env.example .env` and fill in the values in the new .env file.

To run locally, do `npm run dev`

To lint, do `npm run lint`.

To run jest and cypress tests, do `npm test`.

## 🌍 Running it on the web

It's suitable for deploying anywhere a normal Next.js app is, like Netlify, Heroku or Vercel.

## 🏕 Environment

All values are required for normal functionality.

| Key                                  | Required? | Description                                                                                      |
| ------------------------------------ | --------- | ------------------------------------------------------------------------------------------------ |
| `FAUNADB_SECRET`                     | Yes       | Allows applications to be stored to a Fauna database                                             |
| `CONTENTFUL_SPACE_ID`                | Yes       | Allows content to be fetched from Contentful                                                     |
| `CONTENTFUL_ACCESS_TOKEN`            | Yes       | Allows content to be fetched from Contentful                                                     |
| `CONTENTFUL_MANAGEMENT_ACCESS_TOKEN` | Yes       | For automatically generating types from Contentful content model, via the content management API |
| `SENDGRID_API_KEY`                   | Yes       | Allows email sending via Sendgrid                                                                |
| `NOTIFY_ADMIN_TEMPLATE_ID`           | Yes       | Allows emails to be sent to admin user                                                           |
| `NOTIFY_APPLICANT_TEMPLATE_ID`       | Yes       | Allows emails to be sent to applicants                                                           |
| `ADMIN_MAILBOX`                      | Yes       | Address to reach admin user at                                                                   |
| `DEFAULT_FROM_ADDRESS`               | Yes       | Where will emails be shown as coming from                                                        |
| `GOOGLE_CALENDAR_ID`                 | Yes       | Which calendar will we use to find available interview slots?                                    |
| `GOOGLE_CLIENT_ID`                   | Yes       | Google cloud project credentials                                                                 |
| `GOOGLE_CLIENT_SECRET`               | Yes       | Google cloud project credentials                                                                 |
| `GOOGLE_REFRESH_TOKEN`               | Yes       | OAuth2 refresh token for a user who has read/write access to the calendar above                  |
