const fetch = require("node-fetch")
require("dotenv").config()

const run = async () => {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=question&include=10`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
      }
    )
    const data = await res.json()

    const forms = data.items
    const linkedEntries = data?.includes?.Entry

    // TODO: process and save data somehow

    console.log(`✅ ${forms.length} forms done!`)
  } catch (e) {
    console.error(e)
  }
}

run()
