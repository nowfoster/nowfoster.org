import { Application, StoredApplication } from "./types"

export const mockApplication: Application = {
  firstName: "Foo",
  lastName: "Bar",
  email: "foo@bar.com",
  phone: "0447777777777",
}

export const mockStoredApplication: StoredApplication = {
  ...mockApplication,
  createdAt: new Date(1000000000).toString(),
}
