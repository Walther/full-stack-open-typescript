import { ReactElement } from "react";
import { CoursePart } from "./types";
import { assertNever } from "./utils";

const Part = ({ part }: { part: CoursePart }): ReactElement => {
  switch (part.type) {
    case "normal":
      return (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <em>{part.description}</em>
        </>
      );
    case "groupProject":
      return (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      );
    case "submission":
      return (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <em>{part.description}</em>
          <p>submit exercises at {part.exerciseSubmissionLink}</p>
        </>
      );
    case "special":
      return (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <em>{part.description}</em>
          <p>requirements: {part.requirements.join(", ")}</p>
        </>
      );
    default:
      assertNever(part);
  }
  return <></>;
};

export default Part;
