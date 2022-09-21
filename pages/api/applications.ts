import type { NextApiRequest, NextApiResponse } from "next"
import faunadb, { query, values } from "faunadb"
import { Application, ApiResponseBody, StoredApplication } from "../../types"
import { applicationSchema } from "../../lib/validators"
import {
  notifyAdmin,
  notifyApplicant,
  sendNotifications,
} from "../../lib/emails"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseBody>
) => {
  try {
    if (req.method !== "POST") throw "Method not allowed"

    applicationSchema.parse(req.body)

    const db = new faunadb.Client({
      secret: process.env.FAUNADB_SECRET as string,
      domain: "db.eu.fauna.com",
    })

    const result: values.Document<StoredApplication> = await db.query(
      query.Create(query.Collection("applications"), {
        data: {
          createdAt: new Date().toString(),
          ...req.body,
        },
      })
    )

    await sendNotifications(result.data)

    res.status(201).json(result)
  } catch (e: any) {
    console.error(e.response.body.errors)
    // TODO: improve types, send whole zod error back
    res.status(400).json({ error: e?.name || e })
  }
}

export default handler
