import express from "express";
import { getPatients, newPatient } from "../services/patientService";
import { PatientPublicInfo } from "../types";
import { toNewPatient } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const patients: PatientPublicInfo[] = getPatients();
  res.send(patients);
});

patientRouter.post("/", (req, res) => {
  try {
    const patient = toNewPatient(req.body);
    const addedEntry = newPatient(patient);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
