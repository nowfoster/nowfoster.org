import { mockApplication } from "../mocks"
import { applicationSchema } from "./validators"

describe("applicationSchema", () => {
  it("passes a complete application", () => {
    applicationSchema.parse(mockApplication)
  })

  it("throws on an incomplete application", () => {
    expect(() =>
      applicationSchema.parse({
        email: "blah",
      })
    ).toThrow()
  })
})
