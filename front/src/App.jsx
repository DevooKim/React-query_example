import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Error } from "./components/Error";
import { ErrorProvider } from "./contexts/ErrorContext";
import { LoginProvider } from "./contexts/LoginContext";

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
    <ErrorProvider>
      <LoginProvider>
        <QueryClientProvider client={queryClient}>
          <h1>React-query-library</h1>
          <Error />
          <Router />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </LoginProvider>
    </ErrorProvider>
  );
};

export default React.memo(App);
