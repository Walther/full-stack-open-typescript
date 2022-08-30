import { ReactElement } from "react";
import { CoursePart } from "./types";

const Content = ({ parts }: { parts: CoursePart[] }): ReactElement => {
  return (
    <>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
