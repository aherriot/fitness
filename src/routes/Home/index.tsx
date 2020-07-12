import React from "react";
import { useQuery } from "urql";
import { loader } from "graphql.macro";
import { Redirect } from "react-router-dom";
import MeasurementForm from "./MeasurementForm";
import Display from "./Display";
import HistoryChart from "./HistoryChart";
const userDataQuery = loader("./userData.graphql");

const Home = () => {
  const [result] = useQuery({
    query: userDataQuery,
  });

  const { fetching, error, data } = result;

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (error?.graphQLErrors.some((err) => err?.extensions?.code)) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { referrer: window.location.pathname },
        }}
      />
    );
  }
  // if (error) {
  //   return <div>error: {JSON.stringify(result.error)}</div>;
  // }
  return (
    <div className="Home">
      <h1 className="Home__title">Fitness Tracking</h1>
      {error && <pre>{JSON.stringify(error, null, " ")}</pre>}
      {data && data.user && (
        <>
          <HistoryChart
            preferences={data.user.preferences}
            measurements={data.user.measurements}
          />
          <Display
            preferences={data.user.preferences}
            currentMeasurement={data.user.currentMeasurement}
          />
          <MeasurementForm preferences={data.user.preferences} />
        </>
      )}
    </div>
  );
};

export default Home;
