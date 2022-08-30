import express from "express";
import { getDiagnoses } from "../services/diagnosisService";
import { Diagnosis } from "../types";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
  const diagnoses: Diagnosis[] = getDiagnoses();
  res.send(diagnoses);
});

export default diagnosisRouter;
