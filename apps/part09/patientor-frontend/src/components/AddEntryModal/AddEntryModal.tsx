import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import React from 'react';
import AddEntryForm from './AddEntryForm';
import { Diagnoses, EntryWithoutId } from '../../types';
import diagnoses from '../../services/diagnoses';

type Props = {
    // TODO: Define the component props
    modalOpen: boolean;
    onSubmit: (values: EntryWithoutId) => void;
    onClose: () => void;
    diagnoses: Diagnoses[];
};


export const AddEntryModal: React.FC<Props> = ({modalOpen, onSubmit, onClose, diagnoses}) => {
    return (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
            <DialogTitle>Add a new entry</DialogTitle>
            <Divider />
            <DialogContent>
                <AddEntryForm onCancel={onClose} diagnoses={diagnoses} onSubmit={onSubmit}/>
            </DialogContent>
        </Dialog>
    );
};

export default AddEntryModal;