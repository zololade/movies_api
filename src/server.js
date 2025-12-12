import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import {
  handleSingleGet,
  handleMultipleGet,
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

app.post("/movies", (req, res) => {
  res.send("hello");
});

app.patch("/movies/:id", (req, res) => {
  res.send(req.params);
});

app.delete("/movies/:id", (req, res) => {
  res.send("hello");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

await connectDB();
// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Closing database connection...");
  await client.close();
  process.exit();
});

app.listen(port, () => {
  console.log(`Movies app listening at http://localhost:${port}`);
});
