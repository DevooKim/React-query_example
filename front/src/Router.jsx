import React, { memo } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from "react-router-dom";

import { useLoginState, useLoginAction } from "./LoginContext";
import TodoQuery from "./pages/TodoQuery";
import Todo from "./pages/Todo";
import Login from "./components/Login";

const AuthRoute = ({ isLogin }) => <>{isLogin ? <Outlet /> : <Navigate to="/login" />}</>;

const Header = memo(() => {
  const { setIsLogin } = useLoginAction();
  const logout = () => {
    sessionStorage.removeItem("name");
    setIsLogin(false);
  };
  return (
    <div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <Link to="/">Home</Link> | <Link to="todo">Todo</Link> | <Link to="todoQuery">TodoQuery</Link>
        </div>
        <button onClick={logout}>logout</button>
      </nav>
    </div>
  );
});
export const Router = () => {
  const { isLogin } = useLoginState();
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
