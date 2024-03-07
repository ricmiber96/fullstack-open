export type ID = {
    id: `${string}-${string}-${string}-${string}-${string}`
};

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender
    occupation: string;
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NonSensitivePatients = Omit<Patient, 'ssn'>;

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}