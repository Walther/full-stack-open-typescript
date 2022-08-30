interface exerciseAnalysis {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const sum = (list: number[]): number =>
  list.reduce((previous, current) => previous + current, 0);

export const calculateExercises = (
  target: number,
  exerciseHours: number[]
): exerciseAnalysis => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const average = sum(exerciseHours) / periodLength;
  const success = average > target;
  const percentage = (average / target) * 100.0;
  let rating: number;
  let ratingDescription: string;
  if (percentage < 50.0) {
    rating = 1;
    ratingDescription =
      "maybe consider using a smaller target to set yourself up for success";
  } else if (percentage < 100.0) {
    rating = 2;
    ratingDescription = "good job! keep up the work";
  } else {
    rating = 3;
    ratingDescription =
      "excellent work! you may consider increasing your target";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (
  args: Array<string>
): { target: number; exerciseHours: number[] } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error("Provided values were not numbers!");
  }

  const exerciseHours: number[] = [];
  for (const arg of args.slice(3)) {
    const hours = Number(arg);
    if (isNaN(target)) {
      break;
    }
    exerciseHours.push(hours);
  }
  return { target, exerciseHours };
};

try {
  const { target, exerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(target, exerciseHours));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
