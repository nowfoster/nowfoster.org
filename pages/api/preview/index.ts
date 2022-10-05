import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { entryId, contentType, previewToken } = req.query

  if (previewToken !== process.env.PREVIEW_TOKEN)
    return res.status(401).send("Invalid preview token")

  if (!entryId || !contentType)
    return res.status(404).send("Missing query data")

  res.setPreviewData(
    {},
    {
      maxAge: 60 * 60,
    }
  ) // set preview cookie

  res.redirect("/?quiz_open=true") // redirect to home page
}

export default handler
