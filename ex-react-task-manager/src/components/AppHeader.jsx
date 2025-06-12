import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header style={{ background: "#eee", padding: "1rem" }}>
      <nav>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Lista delle tasks
        </Link>
        <Link to="/add-task" style={{ marginRight: "1rem" }}>
          Aggiungi task
        </Link>
      </nav>
    </header>
  );
};

export default AppHeader;
