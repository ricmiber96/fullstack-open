
export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender
    occupation: string;
}

export type NonSensitivePatients = Omit<Patients, 'ssn'>;

export type Gender = 'male' | 'female' | 'other';

export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}