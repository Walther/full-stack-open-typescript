import {
  BaseEntry,
  Entry,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewPatient,
  OccupationalHealthcareEntry,
} from "./types";
import { v1 as uuid } from "uuid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    gender: parseGender(object.gender),
    ssn: parseString(object.ssn, "ssn"),
    name: parseString(object.name, "name"),
    occupation: parseString(object.occupation, "occupation"),
    dateOfBirth: parseString(object.dateOfBirth, "dateOfBirth"),
    entries: [],
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): Entry => {
  const type = parseString(object.type, "type");
  const base: BaseEntry = toNewBaseEntry(object);
  switch (type) {
    case "Hospital":
      return toNewHospitalEntry(base, object);
    case "OccupationalHealthcare":
      return toNewOccupationalHealthcareEntry(base, object);
    case "HealthCheck":
      return toNewHealthCheckEntry(base, object);
    default:
      throw new Error(`Incorrect or missing entry type: ${type}`);
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewBaseEntry = (object: any): BaseEntry => {
  const id: string = uuid();
  const date = parseString(object.date, "date");
  const description = parseString(object.description, "description");
  const specialist = parseString(object.specialist, "specialist");
  // TODO: diagnosisCodes
  return {
    id,
    date,
    description,
    specialist,
  };
};
export const toNewHospitalEntry = (
  base: BaseEntry,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _object: any
): HospitalEntry => {
  return {
    ...base,
    type: "Hospital",
    // TODO: discharge
  };
};
export const toNewOccupationalHealthcareEntry = (
  base: BaseEntry,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any
): OccupationalHealthcareEntry => {
  const employerName = parseString(object.employerName, "employerName");
  return {
    ...base,
    type: "OccupationalHealthcare",
    employerName,
  };
};
export const toNewHealthCheckEntry = (
  base: BaseEntry,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any
): HealthCheckEntry => {
  const healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
  return {
    ...base,
    type: "HealthCheck",
    healthCheckRating,
  };
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseString = (text: unknown, name: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing value for field ${name}: ${text}`);
  }
  return text;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

export const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing healthcheck rating: " + rating);
  }
  return rating;
};
