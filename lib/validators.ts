// import { z } from "zod"
import * as yup from "yup"
import { allowedPrefixes } from "../config"
import { ContactPreference, Question } from "../types"

export const generateApplicationSchema = (eventsAvailable: boolean) =>
  yup.object({
    email: yup
      .string()
      .required("That doesn't look like a valid email")
      .email("That doesn't look like a valid email"),
    phone: yup.string().when("contactPreference", {
      is: ContactPreference.Phone || ContactPreference.Text,
      then: yup
        .string()
        .required("That doesn't look like a valid phone number")
        .matches(
          /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/,
          "That doesn't look like a valid phone number"
        ),
    }),
    firstName: yup.string().required("You need to give your first name"),
    lastName: yup.string().required("You need to give your last name"),
    includeAnswers: yup.boolean(),
    eventId: eventsAvailable
      ? yup
          .string()
          .typeError("You need to choose a time for a call")
          .required("You need to choose a time for a call")
      : yup.string(),
    contactPreference: yup
      .string()
      .typeError("You need to tell us how you'd prefer to be contacted")
      .required("You need to tell us how you'd prefer to be contacted"),
    levelOfInterest: yup
      .string()
      .typeError("You need to tell us how interested you are")
      .required("You need to tell us how interested you are"),
    discussionTopics: yup.string(),
  })

export const generateQuestionSchema = (question: Question) => {
  let shape: { [key: string]: yup.AnySchema } = {}

  if (question.questionType === "checkbox") {
    shape[question.question] = yup.array().of(yup.string())
  } else if (question.questionType === "explorer") {
    shape[question.question] = yup
      .string()
      .required("Explore some options to continue")
  } else {
    shape[question.question] = yup
      .string()
      .required("Choose an option to continue")
  }

  return yup.object(shape)
}

export const postcodeSchema = yup.object({
  postcode: yup
    .string()
    .required("You need to give us your postcode to continue")
    .matches(
      /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/,
      "That doesn't look like a valid postcode"
    )
    .transform(val => val.toLowerCase())
    .test(
      "postcode",
      "You're not in our pilot area",
      val =>
        !!allowedPrefixes.find(prefix =>
          val?.toLowerCase().startsWith(prefix.toLowerCase())
        )
    ),
})
