import TaskCards from "../components/TaskCards";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const Home = () => {
  const { tasks } = useContext(AppContext);

  return (
    <>
      <div className="container">
        <h2 className="text-center mb-5">Ecco tutte le task</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titolo</th>
              <th scope="col">Aggiunta il</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 &&
              tasks.map((curTask, i) => (
                <TaskCards task={curTask} index={i} key={i} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
