import React from "react";
import axios from "axios";
import { Box, Typography, List, ListItemText } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { setDiagnosesList, setPatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Patient } from "../types";
import EntryElement from "../EntryElement";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <p>invalid id</p>;
  }
  const [state, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosesList(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  const patient: Patient = state.patients[id];
  if (!patient) {
    return <p>could not fetch patient</p>;
  }
  const entries = patient.entries;
  if (!entries) {
    return <p>could not fetch patient entries</p>;
  }
  const diagnoses = state.diagnoses;
  if (!diagnoses) {
    return <p>could not fetch diagnoses</p>;
  }

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient
        </Typography>
      </Box>
      <List>
        {/* I am skipping the material ui styles and icons due to time constraints */}
        <ListItemText primary={patient.name} />
        <ListItemText primary={patient.gender} />
        <ListItemText primary={patient.occupation} />
        <ListItemText primary={patient.dateOfBirth} />
        <ListItemText primary={patient.ssn} />
      </List>
      <h2>entries</h2>
      {entries.map((entry) => (
        <EntryElement key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
