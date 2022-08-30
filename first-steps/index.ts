import express from "express";
import { calculateBmi } from "./bmiCalculator";
import bodyParser from "body-parser";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(bodyParser.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  const parsed_target = Number(target);

  if (isNaN(parsed_target)) {
    res.status(400).send({ error: "malformatted target" });
    return;
  }

  const parsed_daily_exercises = [];
  for (const hour of daily_exercises) {
    const parsed_hour = Number(hour);
    if (isNaN(parsed_hour)) {
      res.status(400).send({ error: "malformatted daily exercises" });
      return;
    }
    parsed_daily_exercises.push(parsed_hour);
  }
  const exerciseAnalysis = calculateExercises(
    parsed_target,
    parsed_daily_exercises
  );
  res.send(exerciseAnalysis);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
