import React from "react";
import axios from "axios";
import { Box, Typography, List, ListItemText } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

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
  }, [dispatch]);

  const patient: Patient = state.patients[id];
  if (!patient) {
    return <p>could not fetch patient</p>;
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
      </List>
    </div>
  );
};

export default PatientPage;
