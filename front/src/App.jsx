import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LoginProvider } from "./LoginContext";

import { Router } from "./Router";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // 브라우저에 다시 포커스 했을 때 refetch
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <LoginProvider>
      <QueryClientProvider client={queryClient}>
        <h1>React-query-library</h1>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </LoginProvider>
  );
};

export default React.memo(App);
