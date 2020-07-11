import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory";
import { convertKgToPreferredWeight } from "./utils";
import { WeightUnits } from "./types";

interface Props {
  preferences: {
    weightUnit: WeightUnits;
  };
  measurements: [
    {
      id: string;
      date: string;
      weight: number;
    }
  ];
}

const HistoryChart = ({ measurements, preferences: { weightUnit } }: Props) => {
  const data = measurements.map((m) => {
    return {
      x: new Date(m.date),
      y: convertKgToPreferredWeight(m.weight, WeightUnits[weightUnit]).toFixed(
        1
      ),
    };
  });
  return (
    <div className="HistoryChart">
      <VictoryChart>
        <VictoryLine data={data} />
        {/* <VictoryAxis crossAxis theme={VictoryTheme.material} fixLabelOverlap />
        <VictoryAxis
          dependentAxis
          crossAxis
          domain={[0, 200]}
          theme={VictoryTheme.material}
          standalone={false}
        /> */}
      </VictoryChart>
    </div>
  );
};

export default HistoryChart;
