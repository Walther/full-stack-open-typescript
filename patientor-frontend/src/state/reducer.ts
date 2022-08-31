import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      patientId: string;
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          [action.payload.id]: { ...action.payload },
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.patientId];
      patient.entries = [...patient.entries, action.payload];
      return {
        ...state,
        patients: {
          [action.patientId]: patient,
          ...state.patients,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload };
};

export const addPatient = (payload: Patient): Action => {
  return { type: "ADD_PATIENT", payload };
};

export const setPatient = (payload: Patient): Action => {
  return { type: "SET_PATIENT", payload };
};

export const setDiagnosesList = (payload: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES_LIST", payload };
};

export const addEntry = (patientId: string, payload: Entry): Action => {
  return { type: "ADD_ENTRY", patientId, payload };
};
