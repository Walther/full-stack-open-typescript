import patients from "../data/patients";
import { NewPatient, Patient, PatientPublicInfo } from "../types";
import { v1 as uuid } from "uuid";

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
