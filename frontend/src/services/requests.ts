import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/tasks",
});

export const getTasks = () => api.get("/");
export const createTask = (title: string) => api.post("/", {title: title} );
export const toggleTask = (id: number, title: string, completed: boolean) => api.put(`/${id}`, { title, completed });
export const deleteTask = (id: number) => api.delete(`/${id}`);