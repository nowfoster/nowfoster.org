import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData() // clear preview cookie

  res.redirect("/") // redirect to home page
}

export default handler
