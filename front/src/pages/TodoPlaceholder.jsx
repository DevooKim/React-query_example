import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTable } from "react-table";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import PropTypes from "prop-types";

import { fetchTodo } from "../apis";

const TodoPlaceholder = () => {
  const { index } = useParams();
  const queryClient = useQueryClient();
  const { data } = useQuery(["todo", index], () => fetchTodo(index), {
    placeholderData: () => {
      return queryClient.getQueryData(["todos"])?.find((d) => d.index === index);
    },
  });

  useEffect(() => {
    // 라우팅되면 캐시(?)가 사라진다???
    console.log("old: ", queryClient.getQueryData(["todos"]));
  }, []);
  return (
    <>
      <h1>TodoPlaceholder</h1>
      <pre>
        <code>
          {JSON.stringify(
            {
              ...data,
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
};

TodoPlaceholder.propTypes = {};

export default TodoPlaceholder;
