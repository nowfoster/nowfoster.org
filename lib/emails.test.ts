import { mockApplication } from "../mocks"
import { notifyAdmin, notifyApplicant } from "./emails"
import sg from "@sendgrid/mail"

jest.mock("@sendgrid/mail")

describe("notifyAdmin", () => {
  process.env.DEFAULT_FROM = "foo@bar.com"
  process.env.NOTIFY_ADMIN_TEMPLATE_ID = ""
  process.env.NOTIFY_APPLICANT_TEMPLATE_ID = ""
  process.env.ADMIN_MAILBOX = "foo@bar.com"

  it("calls sendgrid correctly", async () => {
    await notifyAdmin(mockApplication)
    expect(sg.send).toBeCalledWith({
      from: expect.anything(),
      personalizations: [
        {
          dynamicTemplateData: {
            createdAt: expect.anything(),
            email: "foo@bar.com",
            firstName: "Foo",
            lastName: "Bar",
            phone: "0777 777 7777",
            includeAnswers: true,
            eventId: "123abc",
          },
          to: expect.anything(),
        },
      ],
      replyTo: expect.anything(),
      templateId: expect.anything(),
    })
  })
})

describe("notifyApplicant", () => {
  it("calls sendgrid correctly", async () => {
    await notifyApplicant(mockApplication)
    expect(sg.send).toBeCalledWith({
      from: expect.anything(),
      personalizations: [
        {
          dynamicTemplateData: {
            createdAt: expect.anything(),
            email: "foo@bar.com",
            firstName: "Foo",
            lastName: "Bar",
            phone: "0777 777 7777",
            includeAnswers: true,
            eventId: "123abc",
          },
          to: "foo@bar.com",
        },
      ],
      templateId: expect.anything(),
    })
  })
})
