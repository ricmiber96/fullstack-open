interface MultiplyValues
{
    value1: number,
    value2: number
}

const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

export const bmiCalculator = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(bmiCalculator(value1, value2));
}catch (e: unknown) {
    let errorMessage = e as Error;
    console.log('Error, something bad happened, message: ', errorMessage.message);
}

// console.log(bmiCalculator(180,74)); // Normal (healthy weight)