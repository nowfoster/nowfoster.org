import type { NextApiRequest, NextApiResponse } from "next"
import faunadb, { query as q, values } from "faunadb"
import { ApiResponseBody, StoredApplication } from "../../types"
import { applicationSchema } from "../../lib/validators"
import { sendNotifications } from "../../lib/emails"

const db = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET as string,
  domain: "db.eu.fauna.com",
})

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseBody>
) => {
  try {
    switch (req.method) {
      case "POST":
        const data = JSON.parse(req.body)
        applicationSchema.parse(data) // check payload is correctly formed
        const result: values.Document<StoredApplication> = await db.query(
          q.Create(q.Collection("applications"), {
            data: {
              createdAt: new Date().toISOString(),
              ...data,
            },
          })
        )
        await sendNotifications(result.data)
        res.status(201).json(result)
        break

      case "GET":
        const results: values.Document<StoredApplication> = await db.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("applications"))),
            q.Lambda(doc => q.Get(doc))
          )
        )
        res.status(200).json(results)
        break

      default:
        throw "Method not allowed"
        break
    }
  } catch (e: any) {
    console.error(e)
    // TODO: improve types, send whole zod error back
    res.status(400).json({ error: e?.name || e })
  }
}

export default handler
