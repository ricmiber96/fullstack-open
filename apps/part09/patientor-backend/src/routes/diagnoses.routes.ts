import express from 'express';
import diagnosesServices from '../services/diagnoses.services';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    res.send(diagnosesServices.getDiagnoses()).status(200);
    console.log('fetching all diagnoses');
});


export default diagnosesRouter;