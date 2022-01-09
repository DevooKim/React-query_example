import React, { useState } from "react";
import { useLoginAction } from "../contexts/LoginContext";
import { useErrorAction } from "../contexts/ErrorContext";
import { addUser, getUser } from "../apis";

const Login = () => {
  const [name, setName] = useState("");
  const setError = useErrorAction();
  const { dispatchLogin } = useLoginAction();

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
      setError("already exists name");
      return;
    }
    setError("");
    dispatchLogin(name);
  };

  const onLogin = async () => {
    const result = await getUser(name);
    if (!result) {
      setError("not exists name");
      return;
    }
    setError("");
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
    </>
  );
};

export default Login;
