import { Diagnose, Discharge, EntryWithoutId, HealthCheckRating, NewBaseEntry, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseDescription = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSpecialist = (especialist: unknown): string => {
    if (!especialist || !isString(especialist)) {
        throw new Error('Incorrect or missing especialist: ' + especialist);
    }
    return especialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object') {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnose['code']>;
    }
  
    return object as Array<Diagnose['code']>;
};


  const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;
  };

  const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };

    const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
        if (!param || !isNumber(param) || !isHealthCheckRating(param)) {
        throw new Error('Incorrect or missing health check rating: ' + param);
        }
        return param;
    };

    const parseSickLeave = (object: unknown): SickLeave => {
        if( !object || typeof object !== 'object' ){
            throw new Error('Incorrect or missing data');
        }
    
        if( 'startDate' in object
           && 'endDate' in object){
            const sickLeave: SickLeave = {
                startDate: parseDate(object.startDate),
                endDate: parseDate(object.endDate)
            };
            return sickLeave;
        }
        throw new Error('Incorrect data: a field missing');
    };

    const parseEmployerName = (employerName: unknown): string => {
        if(!employerName || !isString(employerName)){
            throw new Error('Incorrect ot missing description');
        }
        return employerName;
    };

    const parseCriteria = (criteria: unknown): string => {
        if(!criteria || !isString(criteria)){
            throw new Error('Incorrect or missing criteria');
        }
        return criteria;
    };


    const parseDischarge = (object: unknown): Discharge => {
        if( !object || typeof object !== 'object' ){
            throw new Error('Incorrect or missing data');
        }
    
        if( 'date' in object
           && 'criteria' in object){
            const discharge: Discharge = {
                date: parseDate(object.date),
                criteria: parseCriteria(object.criteria)
            };
            return discharge;
        }
        throw new Error('Incorrect data: a field missing');
    };
    

const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing object: ' + object);
    }
    if( 'description' in object
    && 'date' in object
    && 'specialist' in object){

        const newEntry: NewBaseEntry = 'diagnosisCodes' in object ?
    {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    }
    : 
    {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist)
    };

        if('type' in object){
            switch(object.type){
                case 'HealthCheck':
                   if('healthCheckRating' in object){
                      const newHealthCheckEntry: EntryWithoutId  = {
                            ...newEntry,
                            type: 'HealthCheck',
                            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                        };
                        return newHealthCheckEntry;
                   }
                     throw new Error('Incorrect or missing health check rating');
                case 'OccupationalHealthcareEntry':
                    if('employerName' in object){
                        let occupationalHealthcareEntry: EntryWithoutId;
                        'sickLeave' in object ?
                        occupationalHealthcareEntry = {
                            ...newEntry,
                            type:'OccupationalHealthcare',
                            employerName: parseEmployerName(object.employerName),
                            sickLeave: parseSickLeave(object.sickLeave)
                        }
                        :
                        occupationalHealthcareEntry = {
                            ...newEntry,
                            type:'OccupationalHealthcare',
                            employerName: parseEmployerName(object.employerName)
                        };
                        return occupationalHealthcareEntry;
                    }
                    throw new Error("Incorrect data: employer name missing");
                case 'Hospital':
                    if('discharge' in object){
                        const hospitalEntry: EntryWithoutId = {
                            ...newEntry,
                            type: 'Hospital',
                            discharge: parseDischarge(object.discharge)
                        };
                        return hospitalEntry;
                    }
                    throw new Error("Incorrect data: discharge missing");
                
                default:
                    throw new Error('Incorrect or missing type');
            }
        }

    }
    throw new Error('Incorrect data: a field missing');

};

export default toNewEntry;