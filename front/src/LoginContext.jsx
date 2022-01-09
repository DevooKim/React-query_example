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
  const name = sessionStorage.getItem("name");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (name === null || name === undefined || name?.length === 0) {
      return;
    }
    setIsLogin(true);
  }, []);

  const dispatchLogin = (name) => {
    sessionStorage.setItem("name", name);
    setIsLogin(true);
  };

  const dispatchLogout = () => {
    sessionStorage.removeItem("name");
    setIsLogin(false);
  };

  return (
    <LoginStateContext.Provider value={isLogin}>
      <LoginActionContext.Provider value={{ dispatchLogin, dispatchLogout }}>{children}</LoginActionContext.Provider>
    </LoginStateContext.Provider>
  );
};
