import React, { createContext, useState, useContext, useEffect } from "react";

const LoginStateContext = createContext();
const LoginActionContext = createContext();

export const useLoginState = () => {
  const value = useContext(LoginStateContext);
  return value;
};
export const useLoginAction = () => {
  const value = useContext(LoginActionContext);
  return value;
};

export const LoginProvider = ({ children }) => {
  const _name = sessionStorage.getItem("name");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (_name === null || _name === undefined || _name?.length === 0) {
      return;
    }
    setName(_name);
    setIsLogin(true);
  }, []);

  useEffect(() => {
    if (isLogin) {
      sessionStorage.setItem("name", name);
    }
  }, [isLogin, name]);

  return (
    <LoginStateContext.Provider value={{ name, isLogin }}>
      <LoginActionContext.Provider value={{ setIsLogin, setName }}>{children}</LoginActionContext.Provider>
    </LoginStateContext.Provider>
  );
};
