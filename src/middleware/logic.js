import { dataHandler } from "../database/database.js";
import { ObjectId } from "mongodb";

//get middleware
async function handleRead(req, res, next) {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    const data = await dataHandler([id, "findOne"]);
    if (!data)
      return res.status(404).json({ error: "Movie not found" });

    res.result = data;
    next();
  } catch (err) {
    next(err);
  }
}

export { handleRead };
