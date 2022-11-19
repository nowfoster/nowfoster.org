import type { NextApiRequest, NextApiResponse } from "next"
import { ApiResponseBody } from "../../types"
import { generateApplicationSchema } from "../../lib/validators"
import { sendNotifications } from "../../lib/emails"
import { bookSlot } from "../../lib/calendar"
import { createApplication, listApplications } from "../../lib/db"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseBody>
) => {
  try {
    switch (req.method) {
      case "POST":
        const data = JSON.parse(req.body)
        generateApplicationSchema(!!req.body.eventId).validate(data)
        const result = await createApplication(data)
        if (result.data.eventId) await bookSlot(result.data)
        await sendNotifications(result.data)
        res.status(201).json(result)
        break

      case "GET":
        const results = await listApplications()
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
