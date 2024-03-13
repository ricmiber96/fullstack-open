import diagnosesData from "../data/diagnoses";
import { Diagnoses } from "../utils/types";

const diagnoses: Diagnoses[] = diagnosesData;
export const getDiagnoses = ():Diagnoses[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};