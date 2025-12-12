import { ObjectId } from "mongodb";

async function dataHandler(collection, queryString) {
  let queryType = Array.isArray(queryString)
    ? queryString[1]
    : queryString;

  try {
    if (queryType === "findOne") {
      const id = queryString[0];
      return await collection.findOne({ _id: new ObjectId(id) });
    } else if (queryType === "findMany") {
      const limit = Number(queryString[0]);
      return await collection.find().limit(limit).toArray();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { dataHandler };
