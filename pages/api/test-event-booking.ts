import { NextApiRequest, NextApiResponse } from "next"
import { bookSlot } from "../../lib/calendar"

const data = {
  includeAnswers: true,
  firstName: "foo",
  lastName: "bar",
  email: "jaye.hackett@gmail.com",
  phone: "07777777777",
  eventId: "6aen99kkqk2u235kj83k7bfpkg_20221006T180000Z",
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await bookSlot(data)

  res.send("done")
}

export default handler
