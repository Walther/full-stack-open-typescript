import { Gender, NewPatient } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    gender: parseGender(object.gender),
    ssn: parseString(object.ssn, "ssn"),
    name: parseString(object.name, "name"),
    occupation: parseString(object.occupation, "occupation"),
    dateOfBirth: parseString(object.dateOfBirth, "dateOfBirth"),
  };

  return newPatient;
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
