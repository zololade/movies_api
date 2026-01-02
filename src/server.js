import "dotenv/config";
import express from "express";
import cors from "cors";
import schema from "./schema/validator.js";
import * as zodSchema from "./schema/zodSchema.js";
import {
  handleSingleGet,
  handleMultipleGet,
  handlePost,
  handlePatch,
} from "./middleware/logic.js";
import { MongoClient } from "mongodb";
import "dotenv/config";

const port = process.env.PORT ?? 8000;
const app = express();
app.use(express.json());
app.use(cors());
const client = new MongoClient(process.env.URI);
let collection;

async function connectDB() {
  await client.connect();
  let db = client.db("sample_mflix");
  collection = db.collection("movies");
  console.log("Database connected");
}
app.use((req, res, next) => {
  req.db = collection;
  next();
});

app.get("/movie/:id", handleSingleGet, (req, res) => {
  res.json({
    result: "done",
    data: res.result,
  });
});

app.get("/movies/:limit", handleMultipleGet, (req, res) => {
  res.json({
    result: "done",
    data: res.result,
  });
});

app.post("/movie", schema(zodSchema), handlePost, (req, res) => {
  res.json({
    body: req.body,
    status: "added successfully",
  });
});

app.patch(
  "/movie/:id",
  schema(zodSchema),
  handlePatch,
  (req, res) => {
    res.json({
      param: req.params,
      body: req.body,
      response: res.result,
    });
  }
);

app.delete("/movies/:id", (req, res) => {
  res.json({ greeting: "hello from delete" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

async function startServer() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Movies app listening at http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Closing database connection...");
  await client.close();
  process.exit();
});
