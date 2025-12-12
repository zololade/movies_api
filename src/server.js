import "dotenv/config";
import express, { json } from "express";
import cors from "cors";

const port = process.env.PORT ?? 8000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
