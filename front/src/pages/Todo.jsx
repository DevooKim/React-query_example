import React, { useEffect, useState, useRef } from "react";
import { useTable } from "react-table";
import { useSearchParams } from "react-router-dom";

import { fetchTodos } from "../apis";

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
];

const prepareData = (data) => {
  return data.map((v) => ({
    ...v,
    clear: v.clear ? "O" : "X",
  }));
};

const Todo = () => {
  const name = sessionStorage.getItem("name");
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const maxPageRef = useRef(0);
  const totalRef = useRef(0);
  const page = parseInt(searchParams.get("page", 10)) > -1 ? parseInt(searchParams.get("page", 10)) : 0;
  const limit = parseInt(searchParams.get("limit", 10)) || 10;

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
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, total } = await fetchTodos({ page, limit, name });
      setData(data);
      totalRef.current = total;
      maxPageRef.current = Math.floor(total / limit);
      setLoading(false);
    };
    fetch();
  }, [page, limit]);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data: prepareData(data || []),
    initialState: { page: 0 },
  });

  return (
    <>
      <h1>Todo</h1>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex: page,
              pageSize: limit,
              total: totalRef.current,
              maxPage: maxPageRef.current,
            },
            null,
            2
          )}
        </code>
      </pre>
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
            <button onClick={() => nextPage()} disabled={page === maxPageRef.current}>
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

Todo.propTypes = {};

export default Todo;
