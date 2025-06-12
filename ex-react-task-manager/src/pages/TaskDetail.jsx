import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

function TaskDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, deleteTask } = useContext(AppContext);

  const handleDelite = async () => {
    deleteTask(task.id);
    navigate("/");
  };

  const task = tasks.find((curElem) => curElem.id === parseInt(id));

  return (
    <>
      <div className="container">
        <div className="row row-cols-1 justify-content-center">
          <div className="card w-50">
            <div className="card-body text-center">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
              <p className="card-text">{task.status}</p>
              <p className="card-text">aggiunta il: {task.createdAt}</p>
              <a
                href="#"
                className="btn btn-danger"
                onClick={() => handleDelite()}
              >
                Elimina Task
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetail;
