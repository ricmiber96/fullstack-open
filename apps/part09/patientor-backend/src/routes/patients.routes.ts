import express from 'express';
import patientServices from '../services/patients.services';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(patientServices.getPatientsWithoutSsn()).status(200);
    console.log('fetching all patients');
});


export default patientsRouter;