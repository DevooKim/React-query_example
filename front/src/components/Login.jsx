import React, { useState } from "react";
import { useLoginAction } from "../LoginContext";
import { addUser, getUser } from "../apis";

const Login = () => {
  const [name, setName] = useState("");
  const { dispatchLogin } = useLoginAction();
  const [status, setStatus] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      return;
    }
    setName(value);
  };

  const onSignup = async () => {
    const result = await addUser(name);

    if (!result) {
      setStatus("already exists name");
      return;
    }
    setStatus("");
    dispatchLogin(name);
  };

  const onLogin = async () => {
    const result = await getUser(name);
    if (!result) {
      setStatus("not exists name");
      return;
    }
    setStatus("");
    dispatchLogin(name);
  };

  return (
    <>
      <input type="text" placeholder="input name" value={name} onChange={onChange} />
      <button type="submit" onClick={onSignup}>
        signup
      </button>
      <button type="submit" onClick={onLogin}>
        login
      </button>
      <h1>{status}</h1>
    </>
  );
};

export default Login;
