import React from "react";

import { WeightUnits } from "./types";
import { convertKgToDisplayWeight } from "./utils";

interface Props {
  currentMeasurement: {
    weight: number;
    date: string;
  };
  preferences: {
    weightUnit: WeightUnits;
  };
}

const Display = ({
  currentMeasurement,
  preferences: { weightUnit },
}: Props) => {
  if (!currentMeasurement) {
    return null;
  }
  return (
    <div className="Display">
      <h1>
        Current Weight:{" "}
        {convertKgToDisplayWeight(
          currentMeasurement.weight,
          WeightUnits[weightUnit]
        )}
      </h1>
    </div>
  );
};

export default Display;
