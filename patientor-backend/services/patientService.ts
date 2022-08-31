import { patients as patientData } from "../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  Patient,
  PatientPublicInfo,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

export const getPatients = (): Array<PatientPublicInfo> => {
  const patientsPublic: PatientPublicInfo[] = patients.map(
    (p: Patient): PatientPublicInfo => {
      return {
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        occupation: p.occupation,
      };
    }
  );
  return patientsPublic;
};

export const getPatient = (id: string): Patient | undefined => {
  return patients.find((p: Patient) => p.id === id);
};

export const newPatient = (newPatient: NewPatient): PatientPublicInfo => {
  const id: string = uuid();
  const { name, dateOfBirth, gender, occupation } = newPatient;
  const patient: Patient = {
    ...newPatient,
    id,
  };
  patients.push(patient);
  const patientPublic: PatientPublicInfo = {
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  };
  return patientPublic;
};

export const newEntry = (
  patientId: string,
  newEntry: EntryWithoutId
): Entry => {
  const id: string = uuid();
  const entry: Entry = {
    ...newEntry,
    id,
  };
  const patient = getPatient(patientId);
  if (!patient) {
    throw new Error("Unable to find patient to add the entry to");
  }
  patient.entries = [...patient.entries, entry];
  return entry;
};
