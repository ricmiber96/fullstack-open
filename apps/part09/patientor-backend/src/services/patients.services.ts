import patientsData from '../data/patients';
import {  Entry, EntryWithoutId, NewPatientEntry, NonSensitivePatients, Patient } from "../utils/types";
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = ():Patient[] => {
    return patients;
};


const getPatientsWithoutSsn = (): NonSensitivePatients[] => {

    return patients.map(({ 
        id, 
        name,
        dateOfBirth,
        gender,
        occupation,
        entries}) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries
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

const addEntry = (id: string, entry: EntryWithoutId): Entry | null => {
    const patient = patients.find(p => p.id === id);
    const idEntry = uuidv4();
    const newEntry = {
        id: idEntry,
        ...entry
    };
    if (patient) {
        patient.entries.push(newEntry);
        return newEntry;
    } else {
        return null;
    }
};


export default {
    getPatients,
    getPatientsWithoutSsn,
    getPatientById,
    addPatient,
    addEntry
};