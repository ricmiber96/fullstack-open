import { Button, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Diagnoses, EntryWithoutId, HealthCheckRating } from '../../types';

type Props = {
    // TODO: Define the component props
    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    diagnoses: Diagnoses[];
};

export const AddEntryForm: React.FC<Props> = ({onCancel, onSubmit, diagnoses }) => {

    const diagnosisOptions = diagnoses.map((diagnosis) => {
        return { code: diagnosis.code, name: diagnosis.name };
    });

    const [type, setType] = useState('HealthCheck');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<DiagnosisCodeOptions>>(diagnosisOptions);
    const [diagnosisArray, setDiagnosisArray] = useState<Array<Diagnoses["code"]>>([]);
    // HealthCheck
    const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

    // Hospital
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');

    // OccupationalHealthcare
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');


    interface HealthCheckRatingOption {
       value: number;
       label: string;
    }


    type DiagnosisCodeOptions = Omit<Diagnoses, 'latin'>;


    const healthCheckEntry: HealthCheckRatingOption[] = Object.values(HealthCheckRating).filter((value) => typeof value === 'number').map((v) => {
        return { value: v as number, label: HealthCheckRating[v as number] };
    });

    const onDiagnosisChange = ((event: SelectChangeEvent<string[]>) => {
        event.preventDefault();
        console.log('value', event.target.value);
        const value = event.target.value as Array<Diagnoses["code"]>;
        setDiagnosisArray(value);
    });

    const addNewEntry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newEntry = {
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisArray
        };

        switch (type) {
            case 'HealthCheck':
                onSubmit ({
                    type: "HealthCheck",
                    ...newEntry,
                    healthCheckRating
                }); 
                break;
            case 'Hospital':
                onSubmit ({
                    type: "Hospital",
                    ...newEntry,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                }); 
                break;
            case 'OccupationalHealthcare':
                onSubmit({
                    type:  "OccupationalHealthcare",
                    ...newEntry,
                    employerName: employerName,
                    sickLeave: sickLeaveStartDate && sickLeaveEndDate ? {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate
                    }: undefined
                });
                break;
            }
        };


    return (
        <div>

            <InputLabel style={{ marginTop: 10 }}>Entry Options</InputLabel>
            <br />
            <Select
                fullWidth
                value={type}
                onChange={({ target }) => setType(target.value)}
                >
                    <MenuItem value="HealthCheck">Health Check</MenuItem>
                    <MenuItem value="Hospital">Hospital</MenuItem>
                    <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                </Select>

            <form onSubmit={addNewEntry}>
                <TextField 
                    label="Description" 
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                    />
                <TextField 
                    label="Date" 
                    type='date'
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                    />
                <TextField 
                    label="Specialist" 
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                    />
                
                <InputLabel style={{ marginTop: 10 }}>Diagnosis Codes</InputLabel>
                <br />
                <Select
                    fullWidth
                    multiple
                    value={diagnosisArray}
                    onChange={onDiagnosisChange}
                    input={<OutlinedInput label="Multiple Select" />}
                    >
                    {diagnosisCodes.map(diagnosis =>
                        <MenuItem key={diagnosis.code} value={diagnosis.code}>
                            {diagnosis.code}
                        </MenuItem>
                    )}
                </Select>

                {type === 'HealthCheck' && 
                    (
                      <Select
                        label="Health Check Rating"
                        fullWidth
                        value={healthCheckRating}
                        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                        >
                        {healthCheckEntry.map(option =>
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        )}
                        </Select>
                    )
                }
                {
                    type === 'Hospital' && 
                    (<div>
                        <TextField 
                            label="Discharge Date" 
                            type='date'
                            fullWidth
                            value={dischargeDate}
                            onChange={({ target }) => setDischargeDate(target.value)}
                            />
                        <TextField 
                            label="Discharge Criteria" 
                            fullWidth
                            value={dischargeCriteria}
                            onChange={({ target }) => setDischargeCriteria(target.value)}
                            />
                    </div>)
                }
                {
                    type === 'OccupationalHealthcare' && 
                    (<div>
                        <TextField 
                            label="Employer Name" 
                            fullWidth
                            value={employerName}
                            onChange={({ target }) => setEmployerName(target.value)}
                            />
                        <TextField 
                            label="Sick Leave Start Date" 
                            type='date'
                            fullWidth
                            value={sickLeaveStartDate}
                            onChange={({ target }) => setSickLeaveStartDate(target.value)}
                            />
                        <TextField 
                            label="Sick Leave End Date" 
                            type='date'
                            fullWidth
                            value={sickLeaveEndDate}
                            onChange={({ target }) => setSickLeaveEndDate(target.value)}
                            />
                    </div>)
                }
                {
                    type === 'OccupationalHealthcare' && 
                    (<div>
                        <TextField 
                            label="Employer Name" 
                            fullWidth
                            value={employerName}
                            onChange={({ target }) => setEmployerName(target.value)}
                            />
                        <TextField 
                            label="Sick Leave Start Date" 
                            type='date'
                            fullWidth
                            value={sickLeaveStartDate}
                            onChange={({ target }) => setSickLeaveStartDate(target.value)}
                            />
                        <TextField 
                            label="Sick Leave End Date" 
                            type='date'
                            fullWidth
                            value={sickLeaveEndDate}
                            onChange={({ target }) => setSickLeaveEndDate(target.value)}
                            />
                    </div>)
                }
                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddEntryForm;