import { mockApplication } from "../mocks"
import { generateApplicationSchema } from "./validators"

describe("applicationSchema", () => {
  it.skip("does not throw on a complete application", () => {
    generateApplicationSchema(false).parse(mockApplication)
  })

  it.skip("throws on an incomplete application", () => {
    expect(() =>
      generateApplicationSchema(false).parse({
        email: "blah",
      })
    ).toThrow()
  })
})
