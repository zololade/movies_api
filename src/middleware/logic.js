import {
  findDataHandler,
  postDataHandler,
  patchDataHandler,
} from "../database/database.js";
import { ObjectId } from "mongodb";

//get middleware
async function handleSingleGet(req, res, next) {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    const data = await findDataHandler(req.db, [id, "findOne"]);
    if (!data)
      return res.status(404).json({ error: "Movie not found" });

    res.result = data;
    next();
  } catch (err) {
    next(err);
  }
}

async function handleMultipleGet(req, res, next) {
  try {
    const limit = req.params.limit;
    if (+limit >= 100) {
      return res.status(400).json({ error: "Limit is too large" });
    }

    const data = await findDataHandler(req.db, [limit, "findMany"]);

    if (!data) return res.status(404).json({ error: "Data error" });

    res.result = data;
    next();
  } catch (err) {
    next(err);
  }
}

async function handlePost(req, res, next) {
  try {
    postDataHandler(req.db, req.body);
    next();
  } catch (err) {
    next(err);
  }
}

async function handlePatch(req, res, next) {
  try {
    //req.param, req.body, req.db
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }
    const data = await patchDataHandler(id, req.body, req.db);
    res.result = data;

    next();
  } catch (err) {
    next(err);
  }
}

export {
  handleSingleGet,
  handleMultipleGet,
  handlePost,
  handlePatch,
};
