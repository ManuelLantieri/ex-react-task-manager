import { useState, useEffect } from "react";

const useTask = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const tasksPromise = await fetch(`${url}/tasks`);
        const dataTasks = await tasksPromise.json();
        setTasks(dataTasks);
      })();
    } catch (err) {
      console.err(err);
    }
  }, []);

  const addTask = () => {};

  const updateTask = () => {};

  const deleteTask = () => {};

  return { tasks, addTask, updateTask, deleteTask };
};

export default useTask;
