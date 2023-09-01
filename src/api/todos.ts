import axios from "axios";

const API_BASE = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = async () => {
  const { data } = await axios.get(`${API_BASE}`);
  return data;
}
