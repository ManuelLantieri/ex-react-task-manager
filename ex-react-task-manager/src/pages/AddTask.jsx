import { useRef, useState } from "react";

const AddTask = () => {
  const defaultForm = {
    title: "",
    description: "",
    status: "",
  };

  const [form, setForm] = useState(defaultForm);

  const areaDes = useRef();

  const status = ["Doing", "Done", "To do"];

  return (
    <>
      <div className="container">
        <h1 className="text-center mb-5">
          Aggiungi una task a quelle precedenti
        </h1>
        <form>
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
            <select class="form-select" aria-label="Default select example">
              <option selected value="">
                Seleziona uno Status
              </option>
              {status.map((curElem, i) => (
                <option value={curElem} key={i}>
                  {curElem}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTask;
