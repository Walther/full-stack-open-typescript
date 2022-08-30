import { ReactElement } from "react";
import { CoursePart } from "./types";

const Total = ({ parts }: { parts: CoursePart[] }): ReactElement => {
  const sum = parts.reduce((prev, part) => prev + part.exerciseCount, 0);
  return <p> Number of exercises: {sum}</p>;
};

export default Total;
