import express from 'express';
import patientServices from '../services/patients.services';
import toNewPatientEntry from '../utils/toNewPatientEntry';
import toNewEntry from '../utils/toNewEntry';
import { Request, Response } from 'express';


const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(patientServices.getPatientsWithoutSsn()).status(200);
    console.log('fetching all patients');
});

patientsRouter.get('/:id', (req, res) => {
    const patient = patientServices.getPatientById(req.params.id );
    if (patient) {
        res.send(patient).status(200);
    } else {
        res.status(404).send('Patient not found');
    }
    console.log('fetching a patient');
});

patientsRouter.post('/', (req: Request, res: Response) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedPatient = patientServices.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

patientsRouter.post('/:id/entries', (req: Request, res: Response) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientServices.addEntry(req.params.id, newEntry);
        console.log('added entry',addedEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
}); 



export default patientsRouter;