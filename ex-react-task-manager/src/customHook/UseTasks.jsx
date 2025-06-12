import { useState, useEffect } from "react";

const useTask = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const updateTask = async (id, obj) => {
    try {
      const PUTpromice = await fetch(`${url}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (!PUTpromice.ok) {
        throw new Error("impossibile cambiare la task");
      }
      setMess({
        complite: true,
        messaggio: "task modificata con successo",
        className: "alert-success",
      });

      setUpdate(!update);
    } catch (err) {
      console.error(err);
      setMess({
        complite: true,
        messaggio: "task non modificata",
        className: "alert-danger",
      });
    }
  };

  const deleteTask = async (id) => {
    try {
      const promiceDelete = await fetch(`${url}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!promiceDelete.ok) {
        throw new Error("Impossibile eliminare questa task");
      }

      setMess({
        complite: true,
        messaggio: "task eliminata con successo",
        className: "alert-success",
      });

      setUpdate(!update);
    } catch (err) {
      console.err(err);
      setMess({
        complite: false,
        messaggio: "impossibile eliminare questa task",
        className: "alert-danger",
      });
    }
  };

  return { tasks, addTask, updateTask, deleteTask, mess, setMess };
};

export default useTask;
