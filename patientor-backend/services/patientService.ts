import patientData from "../data/patients.json";
import { Patient, PatientPublicInfo } from "../types";
const patients: Array<Patient> = patientData;

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
