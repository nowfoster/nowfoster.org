import type { NextApiRequest, NextApiResponse } from "next"
import { ApiResponseBody, EventResponseBody } from "../../types"
import { getAvailability } from "../../lib/calendar"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<EventResponseBody>
) => {
  try {
    switch (req.method) {
      case "GET":
        const slots = await getAvailability()
        res.status(200).json(slots)
        break

      default:
        throw "Method not allowed"
        break
    }
  } catch (e: any) {
    console.error(e)
    res.status(400).json({ error: e?.name || e })
  }
}

export default handler
