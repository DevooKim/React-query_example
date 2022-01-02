import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTable } from "react-table";
import { useSearchParams, Routes, Route, Link } from "react-router-dom";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

import { fetchTodos } from "./apis";
import TodoPlaceholder from "./TodoPlaceholder";

const columns = [
  {
    Header: "title",
    accessor: "title",
  },
  {
    Header: "name",
    accessor: "name",
  },
  {
    Header: "content",
    accessor: "content",
  },
  {
    Header: "clear",
    accessor: "clear",
  },
  {
    Header: "show",
    accessor: "show",
  },
];

const prepareData = (data) => {
  return data.map((v) => ({
    ...v,
    clear: v.clear ? "O" : "X",
    show: <Link to={v.index.toString()}>show</Link>,
  }));
};

const useFetch = ({ limit, page }) => {
  // pagination에 유용
  // 새로운 데이터를 fetch하면 마지막으로 success된 데이터를 먼저 가져오고
  // 새로운 데이터가 도착하면 교체한다. => loading상태를 보여주지 않는다.
  return useQuery(["todos", page, limit], () => fetchTodos({ page, limit }), { keepPreviousData: true });
  // return useQuery(["fetch", page], () => fetchTodos({ page, limit }));
};

const TodoQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page", 10)) > -1 ? parseInt(searchParams.get("page", 10)) : 0;
  const limit = parseInt(searchParams.get("limit", 10)) || 10;
  const { isLoading: loading, data: { data, total } = {}, error, isFetching } = useFetch({ page, limit });
  const maxPage = Math.floor(total / limit);

  const nextPage = () => {
    setSearchParams({ page: page + 1, limit: limit });
  };

  const previousPage = () => {
    setSearchParams({ page: page - 1, limit: limit });
  };

  const onChangePageSize = (e) => {
    const { value } = e.target;
    setSearchParams({ page: 0, limit: value });
  };

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data: prepareData(data || []),
    initialState: { page: 0 },
  });

  return (
    <>
      <h1>Todo-Query</h1>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex: page,
              pageSize: limit,
              total: total,
              maxPage: maxPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <Routes>
        <Route path=":index" element={<TodoPlaceholder />} />
      </Routes>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 3px red",
                        background: "aliceblue",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "10px",
                            border: "solid 1px gray",
                            background: "papayawhip",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding: "0.5rem" }}>
            <button onClick={() => previousPage()} disabled={page === 0}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={page === maxPage}>
              {">"}
            </button>
            <select value={limit} onChange={onChangePageSize}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
};

TodoQuery.propTypes = {};

export default TodoQuery;
