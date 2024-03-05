import express from 'express';
import {bmiCalculator} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
const app = express();



app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { dailyExercises, target } = req.body;
        const arrayDailyExercises = dailyExercises as number[];

        if (arrayDailyExercises.length === 0 || isNaN(Number(target))) {
            res.status(400).json({ error: 'malformatted parameters' });
        } else {
            const result = calculateExercises(arrayDailyExercises, Number(target));
            res.json(result).status(200);
        }
    } catch (e: unknown) {
        const errorMessage = e as Error;
        res.status(400).json({ error: errorMessage.message });
    }
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.status(400).json({ error: 'malformatted parameters' });
    } else {
        const bmiText = bmiCalculator(height, weight);
        res.json({
            weight,
            height,
            bmi: bmiText
        }).status(200);
    }
});


const URL = 'http://localhost:3003';
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}
    Endpoints:
    ${URL}/ping
    ${URL}/hello
    ${URL}/bmi?height=180&weight=72
    `);
});
