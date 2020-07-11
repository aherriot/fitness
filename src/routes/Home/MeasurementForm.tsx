import React, { useState } from "react";
import { useMutation } from "urql";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { loader } from "graphql.macro";

import { WeightUnits } from "./types";
import { convertDisplayWeightToKg } from "./utils";

const addMeasurementMutation = loader("./addMeasurement.graphql");

interface Props {
  preferences: {
    weightUnit: WeightUnits;
  };
}

const MeasurementForm = ({ preferences: { weightUnit } }: Props) => {
  const [weight, setWeight] = useState<number>(0);
  const [specifyDate, setSpecifyDate] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const [, addMeasurement] = useMutation(addMeasurementMutation);

  return (
    <form
      className="MeasurementForm"
      onSubmit={(e) => {
        e.preventDefault();
        addMeasurement({
          weight: convertDisplayWeightToKg(weight, WeightUnits[weightUnit]),
          date: date.toISOString(),
        });
      }}
    >
      <div>
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <input
          id="speficyDate"
          type="checkbox"
          checked={specifyDate}
          onChange={(e) => setSpecifyDate(e.target.checked)}
        />
        <label htmlFor="speficyDate">Specify Date</label>
      </div>
      {specifyDate && (
        <div>
          <DatePicker
            selected={date}
            onChange={(date: Date) => setDate(date)}
            showTimeSelect
          />
        </div>
      )}
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default MeasurementForm;
