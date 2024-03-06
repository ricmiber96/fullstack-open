import data from "../utils/diagnoses";
import { Diagnoses } from "../utils/types";

const diagnoses: Diagnoses[] = data;
export const getDiagnoses = ():Diagnoses[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};