import React, { memo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import TodoQuery from "./TodoQuery";
import Todo from "./Todo";
import TodoPlaceholder from "./TodoPlaceholder";

const Home = () => <h1>HOME2</h1>;

const Comp = memo(() => {
  console.log("render2");
  return (
    <div>
      <h1>Home1</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="todo">Todo</Link> | <Link to="todoQuery">TodoQuery</Link>
        <br></br>
        <br></br>
        <Link to="placeholder">TodoPlaceholder</Link>
      </nav>
    </div>
  );
});

const App = () => {
  console.log("render");
  const queryClient1 = new QueryClient({
    defaultOptions: {
      queries: {
        // 브라우저에 다시 포커스 했을 때 refetch
        refetchOnWindowFocus: false,
      },
    },
  });
  const queryClient2 = new QueryClient();

  return (
    <QueryClientProvider client={queryClient1}>
      <BrowserRouter>
        <Comp />
        <Routes>
          <Route path="todo" element={<Todo />}></Route>
          <Route path="todoQuery/*" element={<TodoQuery />}></Route>
          <Route path="placeholder" element={<TodoPlaceholder />}></Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default React.memo(App);
