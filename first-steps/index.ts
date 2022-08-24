import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  const params = req.query;
  const weight = Number(params.weight);
  if (isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }
  const height = Number(params.height);
  if (isNaN(height)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }
  const bmi = calculateBmi(height, weight);
  res.send({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
