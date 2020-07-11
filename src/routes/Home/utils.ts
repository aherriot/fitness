import { WeightUnits } from "./types";

const KG_TO_LBS = 2.20462;
const KG_TO_ST = 0.157472857135078;

export const convertDisplayWeightToKg = (
  weight: number,
  weightUnit: WeightUnits
) => {
  if (weightUnit === WeightUnits.POUND) {
    return weight / KG_TO_LBS;
  } else if (weightUnit === WeightUnits.STONE) {
    return weight / KG_TO_ST;
  } else {
    return weight;
  }
};

export const convertKgToDisplayWeight = (
  weight: number,
  weightUnit: WeightUnits
) => {
  if (weightUnit === WeightUnits.POUND) {
    return (weight * KG_TO_LBS).toFixed(1) + " lbs";
  } else if (weightUnit === WeightUnits.STONE) {
    return (weight * KG_TO_ST).toFixed(1) + " st";
  } else {
    return weight.toFixed(1) + " kg";
  }
};

export const convertKgToPreferredWeight = (
  weight: number,
  weightUnit: WeightUnits
) => {
  if (weightUnit === WeightUnits.POUND) {
    return weight * KG_TO_LBS;
  } else if (weightUnit === WeightUnits.STONE) {
    return weight * KG_TO_ST;
  } else {
    return weight;
  }
};
