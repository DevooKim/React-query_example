import axios from "axios";

const URL = "http://localhost:3000";

export const fetchTodos = async ({ page, limit }) => {
  const {
    data: { data, total },
  } = await axios({ method: "get", url: `${URL}/todos?limit=${limit}&skip=${page * limit}` });
  return { data, total };
};

export const fetchTodo = async (index) => {
  const { data } = await axios({ method: "get", url: `${URL}/todo?index=${index}` });
  return data;
};
