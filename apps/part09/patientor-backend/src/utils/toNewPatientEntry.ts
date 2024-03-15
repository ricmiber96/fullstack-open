import { Gender, NewPatientEntry } from "./types";


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const isGender = (str: string): str is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(str);
};

const parseGender = (gender: unknown): Gender => { 
    if(!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};



const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    console.log(object);
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing object: ' + object);
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object &&  'gender' in object && 'occupation' in object ) { 
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseName(object.occupation),
        entries: []
        };
    return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
