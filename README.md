# React 라이브러리 연습장

## react-router-dom V6

- [react-router-dom v6](https://reactrouter.com)
- switch => routes
  - `component={} / render={() => ()}` 삭제
    - `element={}`로 변경
- exact가 default
  - 서브 경로는 `todo/*`로 대체
- 중첩 라우팅 변경

  ```javascript
  //router.js
  <BrowserRouter>
    <Routes>
      <Route path="todo/*" element={<Todos />}>
        <Route path=":index" element={<Todo />} />
      </Route>
    </Routes>
  </BrowserRouter>;

  //Todo.jsx
  return (
    <>
      <Link to={index}>show</Link> // 상대경로 사용 가능 => useRouteMatch 사용 안해도 됨 ...
      <Outlet /> // 자식 라우터
    </>
  );
  ```

- `useHistory` => `useNavigate`

  - history.push() => navigate()
  - history.replace() => navigate(url, {replace: true})
  - history.go() / goBack() / goForward() => navigate(1) / navigate(-1) ...

- `useSearchParams`

  ```javascript
  import { useSearchParams } from "react-router-dom";

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const nextPage = () => {
    setSearchParams({ page: page + 1, limit: limit });
  };

  //기존
  const { page, limit } = qs.parse(location.search.subString(1));
  const nextPage = () => {
    history.push(`/todo/?page=${page + 1}&limit=${limit}`);
  };
  ```

## react-table

- [react-table](https://react-table.tanstack.com)

## react-query

- [react-query](https://react-query.tanstack.com)
