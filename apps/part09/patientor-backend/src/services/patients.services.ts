import data from "../utils/patients";
import {  NewPatientEntry, NonSensitivePatients, Patient,  } from "../utils/types";
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = data;

const getPatients = ():Patient[] => {
    return patients;
};


const getPatientsWithoutSsn = (): NonSensitivePatients[] => {

    return patients.map(({ 
        id, 
        name,
        dateOfBirth,
        gender,
        occupation}) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }));
};

const getPatientById = (id: string):Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};
    


const addPatient = (patientEntry: NewPatientEntry): Patient | null => { 
    const id = uuidv4();
    const newPatient = {
        id,
        ...patientEntry
    };
    patients.push(newPatient);
    return newPatient;
};


export default {
    getPatients,
    getPatientsWithoutSsn,
    getPatientById,
    addPatient
};