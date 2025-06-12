import TaskCards from "../components/TaskCards";
import AppContext from "../context/AppContext";
import {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";

const Home = () => {
  const { tasks, mess, setMess } = useContext(AppContext);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const debounceTimeoutRef = useRef(null);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => -prev);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const handleSearchChange = useCallback((e) => {
    const inputValue = e.target.value;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setSearchQuery(inputValue.toLowerCase());
    }, 500);
  }, []);

  const orderedTasks = useMemo(() => {
    const statusOrder = { "To do": 1, Doing: 2, Done: 3 };

    return [...tasks]
      .filter((task) => task.title.toLowerCase().includes(searchQuery))
      .sort((a, b) => {
        let valA, valB;

        if (sortBy === "title") {
          valA = a.title.toLowerCase();
          valB = b.title.toLowerCase();
          return valA.localeCompare(valB) * sortOrder;
        }

        if (sortBy === "status") {
          valA = statusOrder[a.status] || 0;
          valB = statusOrder[b.status] || 0;
          return (valA - valB) * sortOrder;
        }

        if (sortBy === "createdAt") {
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
          return (valA - valB) * sortOrder;
        }
        return 0;
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);

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

        <input
          type="text"
          placeholder="Cerca per titolo..."
          className="form-control mb-3"
          onChange={handleSearchChange}
        />

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th
                scope="col"
                onClick={() => handleSort("title")}
                style={{ cursor: "pointer" }}
              >
                Titolo {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
              </th>
              <th
                scope="col"
                onClick={() => handleSort("createdAt")}
                style={{ cursor: "pointer" }}
              >
                Aggiunta il{" "}
                {sortBy === "createdAt" ? (sortOrder === 1 ? "▲" : "▼") : ""}
              </th>
              <th
                scope="col"
                onClick={() => handleSort("status")}
                style={{ cursor: "pointer" }}
              >
                Status{" "}
                {sortBy === "status" ? (sortOrder === 1 ? "▲" : "▼") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {orderedTasks.length > 0 &&
              orderedTasks.map((curTask, i) => (
                <TaskCards task={curTask} index={i} key={curTask.id || i} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
