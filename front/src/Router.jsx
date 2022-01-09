import React, { memo } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from "react-router-dom";

import { useLoginState, useLoginAction } from "./LoginContext";
import TodoQuery from "./pages/TodoQuery";
import Todo from "./pages/Todo";
import Login from "./components/Login";

import { initTodos } from "./apis.js";

const AuthRoute = ({ isLogin }) => <>{isLogin ? <Outlet /> : <Navigate to="/login" />}</>;

const Header = memo(() => {
  const { dispatchLogout } = useLoginAction();
  const logout = () => {
    dispatchLogout();
  };

  const init = async () => {
    const name = sessionStorage.getItem("name");
    const result = await initTodos(name);
  };
  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        <div>
          <Link to="/">Home</Link> | <Link to="todo">Todo</Link> | <Link to="todoQuery">TodoQuery</Link>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={logout}>logout</button>
          <button onClick={init}>init</button>
        </div>
      </nav>
    </div>
  );
});
export const Router = () => {
  const isLogin = useLoginState();
  return (
    <BrowserRouter>
      {isLogin ? <Header /> : <Login />}
      <Routes>
        <Route element={<AuthRoute isLogin={isLogin} />}>
          <Route path="todo" element={<Todo />} />
          <Route path="todoQuery/*" element={<TodoQuery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
