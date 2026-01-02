import { ObjectId } from "mongodb";

async function findDataHandler(collection, queryString) {
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

async function postDataHandler(collection, postBody) {
  try {
    if (!Array.isArray(postBody)) {
      await collection.insertOne(postBody);
      console.log("done");
    } else {
      await collection.insertMany(postBody);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function patchDataHandler(id, body, collection) {
  try {
    let ID = new ObjectId(id);
    let myQuery = { _id: ID };
    let newValue = { $set: body };
    let result = await collection.updateOne(myQuery, newValue);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { findDataHandler, postDataHandler, patchDataHandler };
