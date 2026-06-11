const { MongoClient } = require("mongodb")

const handler = async () => {
  const client = new MongoClient("your-connection-string-here")
  await client.connect()

  const pets = await client.db().collection("pets").find().toArray()
  client.close()

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pets)
  }
}

module.exports = { handler }