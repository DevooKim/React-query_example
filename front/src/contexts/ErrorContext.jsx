import React, { createContext, useState, useContext } from "react";

const ErrorStateContext = createContext();
const ErrorActionContext = createContext();

export const useErrorState = () => {
  const value = useContext(ErrorStateContext);
  return value;
};
export const useErrorAction = () => {
  const value = useContext(ErrorActionContext);
  return value;
};

export const ErrorProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  return (
    <ErrorStateContext.Provider value={message}>
      <ErrorActionContext.Provider value={setMessage}>{children}</ErrorActionContext.Provider>
    </ErrorStateContext.Provider>
  );
};
