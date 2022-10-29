import { mockApplication } from "../mocks"
import { generateApplicationSchema } from "./validators"

describe("applicationSchema", () => {
  it("does not throw on a complete application", () => {
    generateApplicationSchema(false).parse(mockApplication)
  })

  it("throws on an incomplete application", () => {
    expect(() =>
      generateApplicationSchema(false).parse({
        email: "blah",
      })
    ).toThrow()
  })
})
