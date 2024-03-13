import React from 'react';
import HeartIcon from './icons/HeartIcon';
import { Diagnoses, Entry, HealthCheckRating } from '../types';

type Props = {
    // TODO: Define the component props
    entry: Entry;
    diagnoses: Diagnoses[];
};

export const EntriesCard: React.FC<Props> = ({ entry, diagnoses}) => {

    const styleInfo: React.CSSProperties   = {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        padding: '10px',
        margin: '10px'
    };


    const EntryDetails = ({entry}:{entry:Entry}) => {
        switch (entry.type) {
            case "HealthCheck":
                return (
                    <div>
                        {HealtRatingIcon(entry.healthCheckRating)}
                    </div>
                );
            case "Hospital":
                return (
                    <div>
                        {
                            entry.discharge
                            ? <div>
                                <p>Discharge</p>
                                <p>date: {entry.discharge.date}</p>
                                <p>criteria: {entry.discharge.criteria}</p>
                            </div>
                            : null
                        }
                    </div>
                );
            case "OccupationalHealthcare":
                return (
                    <div>
                        <p>Employer: {entry.employerName}</p>
                        {
                            entry.sickLeave
                            ? <div>
                                <p>Sick leave</p>
                                <p>start date: {entry.sickLeave.startDate}</p>
                                <p>end date: {entry.sickLeave.endDate}</p>
                            </div>
                            : null
                        }
                    </div>
                );
            default:
                return null;
        }
    };

   const HealtRatingIcon = (healthRating: HealthCheckRating)=> {
    switch (healthRating) {
        case 0:
            return (<HeartIcon  fill='blue'/>);

        case 1:
            return (<HeartIcon fill='green'/>);
        
        case 2:
            return (<HeartIcon fill='orange'/>);
        
        case 3:
            return (<HeartIcon fill='red'/>);
        default: 
            return null;
        }
    };


    return (
        <div style={styleInfo}>
            <div>
                <div>
                <p>{entry.date}</p>
                <p>Type: {entry.type}</p>
                </div>
                <div>
                    { <EntryDetails  entry={entry}/>}
                </div>
                <i>{entry.description}</i>
            </div>
            {
                            entry.diagnosisCodes
                            ? <ul>
                                {entry.diagnosisCodes.map(code => {
                                    const diagnosisName = diagnoses.find(d => d.code === code)?.name;
                                    return (<li key={code}>{code} {diagnosisName ? diagnosisName : null}</li>);
                                })}
                            </ul>
                            : null
                        }
            <div>
                <b>Diagnosed by {entry.specialist}</b>
            </div>
        </div>
    );
};

export default EntriesCard;