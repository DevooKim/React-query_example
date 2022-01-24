import React from "react";
import { useErrorState } from "../contexts/ErrorContext";

export const Error = () => {
  const message = useErrorState();

  return <>{message && <h1>ERROR: {message}</h1>}</>;
};
