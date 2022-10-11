import { mockApplication } from "../mocks"
import { createApplication, listApplications } from "./db"
import faunadb, { Client } from "faunadb"

jest.mock("faunadb", () => ({
  Client: jest.fn(() => ({
    query: jest.fn(() => "example query response"),
  })),
  query: {
    Create: jest.fn(),
    Collection: jest.fn(),
    Documents: jest.fn(),
    Paginate: jest.fn(),
    Lambda: jest.fn(),
    Map: jest.fn(),
  },
}))

describe("createApplication", () => {
  it("returns the created application", async () => {
    const result = await createApplication(mockApplication)
    expect(result).toBe("example query response")
  })

  it.skip("initialises fauna correctly", async () => {
    await createApplication(mockApplication)
    // expect(Client).toBeCalledWith({
    //   domain: "db.eu.fauna.com",
    //   secret: expect.anything(),
    // })
  })

  it.skip("calls fauna correctly", async () => {
    await createApplication(mockApplication)
  })
})

describe("listApplications", () => {
  it("returns a list of applications", async () => {
    const result = await listApplications()
    expect(result).toBe("example query response")
  })

  it.skip("calls fauna correctly", () => {
    listApplications()
    // expect(mockQuery).toBeCalledWith()
  })
})
