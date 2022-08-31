import express from "express";
import {
  getPatient,
  getPatients,
  newEntry,
  newPatient,
} from "../services/patientService";
import { PatientPublicInfo } from "../types";
import { parseString, toNewEntry, toNewPatient } from "../utils";

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

patientRouter.post("/:id/entries", (req, res) => {
  const id = parseString(req.params.id, "id");
  const patient = getPatient(id);
  if (!patient) {
    res.status(404).send();
    return;
  }
  try {
    const entry = toNewEntry(req.body);
    const addedEntry = newEntry(id, entry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientRouter.get("/:id", (req, res) => {
  const id = parseString(req.params.id, "id");
  const patient = getPatient(id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send();
  }
});

export default patientRouter;
