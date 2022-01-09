import axios from "axios";

const URL = "http://localhost:3000";

axios.defaults({
  url: URL,
});
export const addUser = async (name) => {
  const { data } = await axios({ method: "post", user: `/user`, data: { name } });

  return data;
};

export const getUser = async (name) => {
  const { data } = await axios({ method: "get", user: `/user?name=${name}` });
  return data;
};

export const fetchTodos = async ({ page, limit, name }) => {
  const {
    data: { data, total },
  } = await axios({ method: "get", url: `/todos?name=${name}&limit=${limit}&skip=${page * limit}` });
  return { data, total };
};

export const fetchTodo = async (title, name) => {
  const { data } = await axios({ method: "get", url: `/todo?name=${name}&title=${title}` });
  return data;
};
