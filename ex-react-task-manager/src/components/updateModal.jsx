import { useState, useRef } from "react";

function UpdateModal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Modifica",
}) {
  if (!show) return null;

  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`;

  const copy = { ...content };

  const [formData, setFormData] = useState({
    title: copy.title,
    status: copy.status,
  });

  const descRef = useRef(copy.description);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newObj = { ...formData, description: descRef.current.value };

    if (
      newObj.title.trim().length > 0 &&
      newObj.description.trim().length > 0 &&
      newObj.status !== ""
    ) {
      onConfirm(newObj);
      setFormData({
        title: "",
        status: "",
      });
      descRef.current.value = "";
      onClose();
    } else {
      console.log("errore con il submit");
      setMess({
        complite: false,
        messaggio: "impossibile Modificare questa task",
        className: "alert-danger",
      });
      onClose();
    }
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Titolo</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                />
                {(formData.title
                  .trim()
                  .split("")
                  .some((char) => symbols.includes(char)) ||
                  formData.title.trim().length === 0) && (
                  <p className="m-2 text-danger">
                    Il titolo del task non puo contenere caratteri speciali e
                    non puo essere vuoto
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Stato</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="To do">To do</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Descrizione</label>
                <textarea
                  defaultValue={descRef.current}
                  ref={(el) => (descRef.current = el)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Annulla
              </button>
              <button type="submit" className="btn btn-primary">
                {confirmText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
