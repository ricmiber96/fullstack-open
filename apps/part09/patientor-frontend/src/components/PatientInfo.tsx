import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnoses, Patient, RouteParams } from '../types';
import patientService from '../services/patients';
import FemaleIcon from './icons/FemaleIcon';
import MaleIcon from './icons/MaleIcon';
import EntriesInfo from './EntriesInfo';
import diagnosesService from '../services/diagnoses';

export const PatientInfo: React.FC = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnoses[] | null>(null);

    const { id } = useParams<RouteParams>();

    const styleInfo: React.CSSProperties   = {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        margin: '10px'
    };

    useEffect(() => {
        console.log('id', id);
        const fetchPatient = async (id:string) => {
            const patient = await patientService.getOne(id);
            console.log('Patient',patient);
            setPatient(patient);
        };
        
        const fetchDiagnoses = async () => {
            const diagnoses = await diagnosesService.getAll();
            console.log('Diagnoses',diagnoses);
            setDiagnoses(diagnoses);
        };
        
        if (id){
        void fetchPatient(id);
        void fetchDiagnoses();
        }
    }, [id]);

    if (!patient || !diagnoses) {
        return <div>Loading...</div>;
    }


    return (
        <div style={styleInfo}>
            <div style={{display:'flex',flexDirection:'row'}}>
                <h2>{patient.name}</h2>
                <p>{patient.gender== 'male' ? <MaleIcon width={50} height={50} /> : <FemaleIcon width={50} height={50}/> }</p>
            </div>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            <EntriesInfo entries={patient.entries} diagnoses={diagnoses} />
        </div>
    );
};

export default PatientInfo;