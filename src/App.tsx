import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createClient, Provider as GraphqlProvider } from "urql";
import Home from "./routes/Home";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";

const client = createClient({
  url: "/graphql",
  fetchOptions: () => {
    const token = localStorage.getItem("token");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

function App() {
  return (
    <GraphqlProvider value={client}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </GraphqlProvider>
  );
}

export default App;
