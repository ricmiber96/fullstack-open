export interface ID {
    id: `${string}-${string}-${string}-${string}-${string}`
}

export interface Entry {

}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender
    occupation: string;
    entries: Entry[];
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NonSensitivePatients = Omit<Patient, 'ssn' | 'entries'  >;

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