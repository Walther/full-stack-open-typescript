export const calculateBmi = (height_cm: number, weight_kg: number): string => {
  const meters = height_cm / 100.0;
  const bmi = weight_kg / meters ** 2;
  return bmiToString(bmi);
};

const bmiToString = (bmi: number): string => {
  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  }
  if (bmi < 17.0) {
    return "Underweight (Moderate thinness)";
  }
  if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  }
  if (bmi < 25.0) {
    return "Normal range";
  }
  if (bmi < 30.0) {
    return "Overweight (Pre-obese)";
  }
  if (bmi < 35.0) {
    return "Obese (Class I)";
  }
  if (bmi < 40.0) {
    return "Obese (Class II)";
  }
  if (bmi >= 40.0) {
    return "Obese (Class III)";
  }

  throw new Error("Unsupported BMI value");
};

interface BmiCalculatorValues {
  height_cm: number;
  weight_kg: number;
}

const parseArguments = (args: Array<string>): BmiCalculatorValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height_cm: Number(args[2]),
      weight_kg: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { height_cm, weight_kg } = parseArguments(process.argv);
  console.log(calculateBmi(height_cm, weight_kg));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
