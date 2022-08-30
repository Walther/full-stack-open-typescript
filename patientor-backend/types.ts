// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

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
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientPublicInfo = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
