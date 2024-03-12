import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, RouteParams } from '../types';
import patientService from '../services/patients';
import FemaleIcon from './icons/FemaleIcon';
import MaleIcon from './icons/MaleIcon';

export const PatientInfo: React.FC = () => {
    const [patient, setPatient] = useState<Patient | null>(null);

    const { id } = useParams<RouteParams>();

    const styleInfo: React.CSSProperties   = {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
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
        if (id){
        void fetchPatient(id);
        }
    }, [id]);

    if (!patient) {
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
        </div>
    );
};

export default PatientInfo;