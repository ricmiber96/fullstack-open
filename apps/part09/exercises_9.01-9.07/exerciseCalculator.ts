interface WeeklyGoal
{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface CommandArgs
{
    dailyExercises: number[],
    target: number
}

const parseArgs= (args: string[]): CommandArgs => {
    if (args.length < 7) throw new Error('Not enough arguments');
    if (args.slice(2).every(a => !isNaN(Number(a)))) {
        return {
            dailyExercises: args.slice(2, -1).map(a => Number(a)),
            target: Number(args[args.length - 1])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};


export const calculateExercises = (dailyExercises: number[] , target: number):WeeklyGoal => {
    const average = dailyExercises.reduce((a, b) => a + b, 0) / dailyExercises.length;
    console.log(dailyExercises);
    const ratingDescription = (average: number, target: number): string => {
        if (average < target) {
            return 'not too bad but could be better';
        } else if (average === target) {
            return 'good job';
        } else {
            return 'excellent';
        }
    };

    const rates = (average: number, target: number): number => {
        const myRating = average / target;
        if (myRating < 0.5) {
            return 1;
        } else if (myRating >= 0.5 && myRating < 1) {
            return 2;
        } else {
            return 3;
        }
    };

    const ratingText = ratingDescription(dailyExercises.reduce((a, b) => a + b, 0) / dailyExercises.length, target);
    const rating =  rates(average, target);
    return {
        periodLength: dailyExercises.length,
        trainingDays: dailyExercises.filter(d => d > 0).length,
        success: dailyExercises.every(d => d >= target),
        rating,
        ratingDescription: ratingText,
        target,
        average
    };
 };

 try {
    const { dailyExercises, target } = parseArgs(process.argv);
    console.log(calculateExercises(dailyExercises, target));
 }catch (e: unknown) {
    const errorMessage = e as Error;
    console.log('Error, something bad happened, message: ', errorMessage.message);
 }
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)); // { periodLength: 7, trainingDays: 5, success: false, rating: 3, ratingDescription: 'good job', target: 2, average: 2.0714285714285716 }