import { Box, List, ListItemText } from "@material-ui/core";
import { Entry, Diagnosis } from "../types";
import { assertNever } from "../utils";

const EntryElement = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: { [code: string]: Diagnosis };
}) => {
  return (
    <Box
      key={entry.id}
      sx={{
        border: "1px solid #222",
        margin: "1rem 0",
        padding: "1rem",
      }}
    >
      <h3>
        {entry.date} - {entry.type} {/* TODO: icons */}
      </h3>
      <EntryDetails entry={entry} />
      {entry.diagnosisCodes && (
        <>
          <strong>diagnoses</strong>
          <List>
            {entry.diagnosisCodes?.map((code: string) => (
              <ListItemText key={code}>
                {code} {diagnoses[code]?.name}
              </ListItemText>
            ))}
          </List>
        </>
      )}
      entry created by: {entry.specialist}
    </Box>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <>
          <p>{entry.description}</p>
          <p>healthcheck rating: {entry.healthCheckRating}</p>
        </>
      );
    case "Hospital":
      return (
        <>
          <p>{entry.description}</p>
          {entry.discharge && (
            <p>
              discharged: {entry.discharge.date} - {entry.discharge.criteria}
            </p>
          )}
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <p>{entry.description}</p>
          <p>employer: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>
              sick leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </p>
          )}
        </>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryElement;
