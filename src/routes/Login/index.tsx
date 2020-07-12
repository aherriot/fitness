import React, { useState } from "react";
import { useMutation } from "urql";
import { loader } from "graphql.macro";
import { useHistory } from "react-router-dom";
const loginMutation = loader("./login.graphql");

const Login = () => {
  const history = useHistory<{ referrer: string }>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, login] = useMutation(loginMutation);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login({ username, password });
    localStorage.setItem("token", result.data.login.jwt);
    if (history.location.state?.referrer) {
      history.replace(history.location.state.referrer);
    } else {
      history.replace("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
