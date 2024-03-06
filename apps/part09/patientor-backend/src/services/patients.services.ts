import data from "../utils/patients";
import { NonSensitivePatients, Patients } from "../utils/types";

const patients: Patients[] = data;

const getPatients = ():Patients[] => {
    return patients;
};


const getPatientsWithoutSsn = ():NonSensitivePatients[] => {
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
    


const addPatient = () => {
    return null;
};


export default {
    getPatients,
    getPatientsWithoutSsn,
    addPatient
};