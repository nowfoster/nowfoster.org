// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    res.status(400).json({ fuck: "Method not allowed" })

  res.status(201).json({})
}

export default handler
