import TaskCards from "../components/TaskCards";
import AppContext from "../context/AppContext";
import { useContext, useEffect } from "react";

const Home = () => {
  const { tasks, mess, setMess } = useContext(AppContext);

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

  return (
    <>
      <div className="container">
        <h2 className="text-center mb-5">Ecco tutte le task</h2>
        {mess !== null && (
          <div className={`alert ${mess.className}`} role="alert">
            {mess.messaggio}
          </div>
        )}
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
