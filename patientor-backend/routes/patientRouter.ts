/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { getPatients, newPatient } from "../services/patientService";
import { PatientPublicInfo } from "../types";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const patients: PatientPublicInfo[] = getPatients();
  res.send(patients);
});

patientRouter.post("/", (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const p: PatientPublicInfo = newPatient({
    ssn,
    name,
    dateOfBirth,
    gender,
    occupation,
  });
  res.json(p);
});

export default patientRouter;
