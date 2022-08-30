import express from "express";
import { getPatients } from "../services/patientService";
import { PatientPublicInfo } from "../types";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
  const patients: PatientPublicInfo[] = getPatients();
  res.send(patients);
});

export default diagnosisRouter;
