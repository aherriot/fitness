import React, { useState } from "react";
import { useMutation } from "urql";
import { loader } from "graphql.macro";
import e from "express";
const loginMutation = loader("./login.graphql");

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, login] = useMutation(loginMutation);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login({ username, password });
    console.log(result.data.login);
    localStorage.setItem("token", result.data.login.jwt);
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
