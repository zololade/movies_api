import { MongoClient } from "mongodb";
import "dotenv/config";

async function myData() {
  const client = await MongoClient.connect(process.env.URI);
  const db = client.db("sample_mflix");
  let movies = db.collection("movies");
  try {
    let data = await movies.findOne();
    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

myData();
