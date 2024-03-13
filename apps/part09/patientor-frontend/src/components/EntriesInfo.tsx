import React from 'react';
import { Diagnoses, Entry } from '../types';
import EntriesCard from './EntriesCard';

type Props = {
    // TODO: Define the component props
    entries: Entry[];
    diagnoses: Diagnoses[];
};

export const EntriesInfo: React.FC<Props> = ({ entries, diagnoses}) => {

    return (
        <div>
            <ul>
                {
                    entries.map(entry => (
                        <EntriesCard key={entry.id} entry={entry} diagnoses={diagnoses}  />
                        )
                    )
                } 
            </ul>
        </div>
    );
};

export default EntriesInfo;