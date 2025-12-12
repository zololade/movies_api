import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { handleRead } from "./middleware/logic.js";

const port = process.env.PORT ?? 8000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/movie/:id", handleRead, (req, res) => {
  res.json({
    result: "done",
    data: res.result,
  });
});

app.get("/movies", handleRead, (req, res) => {
  res.json({
    result: "done",
    data: res.result,
  });
});

app.post("/:movies", (req, res) => {
  res.send("hello");
});

app.patch("/:movie", (req, res) => {
  res.send(req.params);
});

app.delete("/:movie", (req, res) => {
  res.send("hello");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Movies app listening at http://localhost:${port}`);
});
