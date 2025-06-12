import { useRef, useState, useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

const AddTask = () => {
  const defaultForm = {
    title: "",
    status: "",
  };
  const { addTask, mess, setMess } = useContext(AppContext);

  useEffect(() => {
    if (mess !== null) {
      const timer = setTimeout(() => {
        setMess(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
        setMess(null);
      };
    }
  }, [mess]);

  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`;

  const [form, setForm] = useState(defaultForm);

  const areaDes = useRef();

  const status = ["Doing", "Done", "To do"];
  const handleSubmit = (e) => {
    e.preventDefault();

    const newObj = { ...form, description: areaDes.current.value };

    if (
      newObj.title.trim().length > 0 &&
      newObj.description.trim().length > 0 &&
      newObj.status !== ""
    ) {
      addTask(newObj);
      setForm(defaultForm);
      areaDes.current.value = "";
    } else {
      console.log("errore con il submit");
    }
  };

  return (
    <>
      <div className="container">
        {mess !== null && (
          <div className={`alert ${mess.className}`} role="alert">
            {mess.messaggio}
          </div>
        )}

        <h1 className="text-center mb-5">
          Aggiungi una task a quelle precedenti
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-control text-center">Titolo</label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            {(form.title
              .trim()
              .split("")
              .some((char) => symbols.includes(char)) ||
              form.title.trim().length === 0) && (
              <p className="m-2 text-danger">
                Il titolo del task non puo contenere caratteri speciali e non
                puo essere vuoto
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-control text-center">Destrizione</label>
            <textarea
              name="description"
              ref={areaDes}
              className="w-100"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-control text-center">Status</label>
            <select
              class="form-select"
              name="status"
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option selected value="" disabled>
                Seleziona uno Status
              </option>
              {status.map((curElem, i) => (
                <option value={curElem} key={i}>
                  {curElem}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Aggiungi
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
