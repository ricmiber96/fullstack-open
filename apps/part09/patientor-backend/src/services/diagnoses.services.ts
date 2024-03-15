import diagnosesData from "../data/diagnoses";
import { Diagnose } from "../utils/types";

const diagnoses = diagnosesData as Diagnose[];
export const getDiagnoses = ():Diagnose[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};