import { useState, useEffect } from "react";

const useTask = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(true);
  const [mess, setMess] = useState(null);

  useEffect(() => {
    try {
      (async () => {
        const tasksPromise = await fetch(`${url}/tasks`);
        const dataTasks = await tasksPromise.json();
        setTasks(dataTasks);
      })();
    } catch (err) {
      console.error(err);
    }
  }, [update]);

  const addTask = async (data) => {
    try {
      const postPromice = await fetch(`${url}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!postPromice.ok) {
        throw new Error("Errore nella chiamata POST");
      }

      setMess({
        complite: true,
        messaggio: "task aggiunta con successo",
        className: "alert-success",
      });
    } catch (err) {
      console.err(err);
      setMess({
        complite: false,
        messaggio: "impossibile aggiungere questa task",
        className: "alert-danger",
      });
    } finally {
      setUpdate(!update);
    }
  };

  const updateTask = () => {};

  const deleteTask = () => {};

  return { tasks, addTask, updateTask, deleteTask, mess, setMess };
};

export default useTask;
