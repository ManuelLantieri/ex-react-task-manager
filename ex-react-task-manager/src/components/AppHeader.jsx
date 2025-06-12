import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header style={{ background: "#eee", padding: "1rem" }}>
      <nav>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
};

export default AppHeader;
