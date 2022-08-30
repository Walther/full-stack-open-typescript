export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string; // could be uuid
  name: string;
  dateOfBirth: string; // not sure if worth to make an rfc3339 compatible thing
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientPublicInfo = Omit<Patient, "ssn">;
