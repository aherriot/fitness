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
  const [weight, setWeight] = useState<string>("");
  const [specifyDate, setSpecifyDate] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState<string>("");

  const [, addMeasurement] = useMutation(addMeasurementMutation);

  return (
    <form
      className="MeasurementForm"
      onSubmit={(e) => {
        e.preventDefault();
        const weightAsNumber = Number(weight);
        if (Number.isNaN(weightAsNumber)) {
          setError("Not a valid number");
          return;
        }

        if (weightAsNumber < 20 || weightAsNumber > 400) {
          setError("Weight out of valid range");
          return;
        }

        if (date > new Date()) {
          setError("Date cannot be in the future");
          return;
        }

        addMeasurement({
          weight: convertDisplayWeightToKg(
            parseFloat(weight),
            WeightUnits[weightUnit]
          ),
          date: date.toISOString(),
        });
      }}
    >
      <div>
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
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
      {error && <div className="error">{error}</div>}
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default MeasurementForm;
