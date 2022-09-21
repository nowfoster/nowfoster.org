import { applicationSchema } from "./validators"

describe("applicationSchema", () => {
  it("passes a complete application", () => {
    applicationSchema.parse({
      firstName: "foo",
      lastName: "bar",
      email: "foo@bar.com",
    })
  })

  it("throws on an incomplete application", () => {
    expect(() =>
      applicationSchema.parse({
        email: "blah",
      })
    ).toThrow()
  })
})
