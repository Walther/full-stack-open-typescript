import express from "express";
const app = express();
import cors from "cors";
app.use(cors());
app.use(express.json());

const PORT = 3001;

import diagnosisRouter from "./routes/diagnosisRouter";
app.use("/api/diagnoses", diagnosisRouter);
import patientRouter from "./routes/patientRouter";
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
