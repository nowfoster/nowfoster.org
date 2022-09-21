import { mockStoredApplication } from "../mocks"
import { notifyAdmin, notifyApplicant } from "./emails"
import sg from "@sendgrid/mail"

jest.mock("@sendgrid/mail")

describe("notifyAdmin", () => {
  it("calls sendgrid correctly", async () => {
    await notifyAdmin(mockStoredApplication)
    expect(sg.send).toBeCalledWith({
      from: expect.anything(),
      personalizations: [
        {
          dynamicTemplateData: {
            createdAt:
              "Mon Jan 12 1970 14:46:40 GMT+0100 (Greenwich Mean Time)",
            email: "foo@bar.com",
            firstName: "Foo",
            lastName: "Bar",
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
    await notifyApplicant(mockStoredApplication)
    expect(sg.send).toBeCalledWith({
      from: "jaye.hackett@gmail.com",
      personalizations: [
        {
          dynamicTemplateData: {
            createdAt:
              "Mon Jan 12 1970 14:46:40 GMT+0100 (Greenwich Mean Time)",
            email: "foo@bar.com",
            firstName: "Foo",
            lastName: "Bar",
          },
          to: "foo@bar.com",
        },
      ],
      templateId: expect.anything(),
    })
  })
})
