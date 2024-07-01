# iii fostering

[![On push](https://github.com/jhackett1/iii-fostering-nextjs/actions/workflows/on-push.yml/badge.svg)](https://github.com/jhackett1/iii-fostering-nextjs/actions/workflows/on-push.yml)

[![Netlify Status](https://api.netlify.com/api/v1/badges/615e2d90-7db9-4ffe-bd6f-05b5c9e9a36c/deploy-status)](https://app.netlify.com/sites/transcendent-biscotti-d07f78/deploys)

Next.js app for the III fostering project.

## ✅ Prerequisites

- Node.js
- [FaunaDB](https://fauna.com/) account (free tier is fine)
- [Contentful](https://www.contentful.com) account (free tier is fine)
- Google account and calendar (free)

## 🧱 How it works

### Quiz

The quiz is a series of sections, each of which has several questions, which in tern has several possible answers.

The content comes in dynamically from Contentful. We have some type-safety for the returned content by using `contentful-typescript-codegen` and the [Contentful management API](https://www.contentful.com/developers/docs/references/content-management-api/) to automatically generate types for it.

As the user completes the quiz, it is saved to their browser's local storage.

### Applying

When the user finishes the quiz, they can choose to convert their quiz answers into a full application.

They can also choose an interview slot, powered by fetching all events on a Google calendar with zero attendees. The logic is stored in `lib/calendar.ts`.

Google recommends using a service account for this, but instead we use an OAuth2 refresh token to impersonate a normal user. This is because you seem to need a paid GSuite subscription in order to add attendees to an event with a service account.

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

Most values are required for normal functionality.

| Key                                  | Required?                 | Description                                                                                                                                                                                                             |
| ------------------------------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FAUNADB_SECRET`                     | Yes, to apply             | Allows applications to be stored to a Fauna database                                                                                                                                                                    |
| `CONTENTFUL_SPACE_ID`                | Yes                       | Allows content to be fetched from Contentful                                                                                                                                                                            |
| `CONTENTFUL_ACCESS_TOKEN`            | Yes                       | Allows content to be fetched from Contentful                                                                                                                                                                            |
| `CONTENTFUL_PREVIEW_TOKEN`           | No                        | Allows access to the Contentful preview API                                                                                                                                                                             |
| `PREVIEW_TOKEN`                      | No                        | Must match the token passed in with Contentful-generated preview URLs                                                                                                                                                   |
| `CONTENTFUL_MANAGEMENT_ACCESS_TOKEN` | Yes                       | For automatically generating types from Contentful content model, via the content management API                                                                                                                        |
| `SENDGRID_API_KEY`                   | Yes, to apply             | Allows email sending via Sendgrid                                                                                                                                                                                       |
| `NOTIFY_ADMIN_TEMPLATE_ID`           | Yes, to apply             | Allows emails to be sent to admin user                                                                                                                                                                                  |
| `NOTIFY_APPLICANT_TEMPLATE_ID`       | Yes, to apply             | Allows emails to be sent to applicants                                                                                                                                                                                  |
| `ADMIN_MAILBOX`                      | Yes, to apply             | Address to reach admin user at                                                                                                                                                                                          |
| `DEFAULT_FROM_ADDRESS`               | Yes, to apply             | Where will emails be shown as coming from                                                                                                                                                                               |
| `GOOGLE_CALENDAR_ID`                 | Yes, to apply             | Which calendar will we use to find available interview slots? Find it in the calendar settings under "Integrate calendar"                                                                                               |
| `GOOGLE_CLIENT_ID`                   | Yes, to apply             | Google cloud project credentials, with the calendar API enabled                                                                                                                                                         |
| `GOOGLE_CLIENT_SECRET`               | Yes, to apply             | Google cloud project credentials, with the calendar API enabled                                                                                                                                                         |
| `GOOGLE_REFRESH_TOKEN`               | Yes, to apply             | OAuth2 refresh token for a user who has read/write access to the calendar above, and scopes to access the calendar API. You can generate one with the [OAuth playground](https://developers.google.com/oauthplayground) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`      | Yes, for google analytics | Google Analytics Measurement ID "G-XXXXXXXXXX"                                                                                                                                                                          |

## Google calendar integration

Integrating successfully with Google Calendar needs four things:

- `GOOGLE_CALENDAR_ID`, which can be found in the calendar settings, under "Integrate calendar". It might be the email address of the account the calendar is on.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from [console.cloud.google.com](https://console.cloud.google.com), which are:
  - able to access the Google Calendar API
  - has `https://developers.google.com/oauthplayground` as an authorised redirect URI
- `GOOGLE_REFRESH_TOKEN`, generated at [developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)
  - authorised for the relevant Google Calendar API scopes
  - has "Use your own OAuth credentials" checked, with the client ID and secret from earlier
