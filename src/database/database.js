import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

async function dataHandler(queryString) {
  const client = await MongoClient.connect(process.env.URI);
  const db = client.db("sample_mflix");
  let movies = db.collection("movies");

  let queryType = queryString[1];
  let query = queryString[0];
  let data;

  try {
    if (queryType === "findOne") {
      data = await movies.findOne({ _id: new ObjectId(query) });
    }
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
    return data;
  }
}

export { dataHandler };
