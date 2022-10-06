import faunadb, { query as q, values } from "faunadb"
import { Application, ApplicationInput } from "../types"

const db = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET as string,
  domain: "db.eu.fauna.com",
})

/** save a new application to the db */
export const createApplication = async (data: ApplicationInput) => {
  const result: values.Document<Application> = await db.query(
    q.Create(q.Collection("applications"), {
      data: {
        createdAt: new Date().toISOString(),
        ...data,
      },
    })
  )
  return result
}

/** get a list of all applications back from the db */
export const listApplications = async () => {
  const results: values.Document<Application> = await db.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("applications"))),
      q.Lambda(doc => q.Get(doc))
    )
  )
  return results
}
