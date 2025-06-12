import { useParams, useNavigate } from "react-router-dom";
import { useContext, useStat, useEffect } from "react";
import AppContext from "../context/AppContext";
import Modal from "../components/Modal";
import UpdateModal from "../components/UpdateModal";

function TaskDetail() {
  const [showModal, setShowModal] = useState(false);
  const [showModalMod, setShowModalMod] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, deleteTask, updateTask, mess, setMess } =
    useContext(AppContext);

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

  const task = tasks.find((curElem) => curElem.id === parseInt(id));

  return (
    <>
      <div className="container">
        {mess !== null && (
          <div className={`alert ${mess.className}`} role="alert">
            {mess.messaggio}
          </div>
        )}
        <div className="row row-cols-1 justify-content-center">
          <div className="card w-50">
            <div className="card-body text-center">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
              <p className="card-text">{task.status}</p>
              <p className="card-text">aggiunta il: {task.createdAt}</p>
              <div className="row row-cols-5 justify-content-center gap-2">
                <button
                  className="btn btn-danger"
                  onClick={() => setShowModal(true)}
                >
                  Elimina Task
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowModalMod(true)}
                >
                  Modifica Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Conferma eliminazione"
        content={`Sei sicuro di voler eliminare la task "${task.title}"?`}
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          deleteTask(task.id);
          setShowModal(false);
          navigate("/");
        }}
        confirmText="Elimina"
      />

      <UpdateModal
        title="Conferma modifica"
        content={task}
        show={showModalMod}
        onClose={() => setShowModalMod(false)}
        onConfirm={(objNew) => {
          updateTask(task.id, objNew);
        }}
      />
    </>
  );
}

export default TaskDetail;
