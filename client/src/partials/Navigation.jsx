  import { Link } from "react-router-dom";

  export default function Navigation() {
    return (
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/tasks">Show all Tasks</Link>
        <Link to="/create">Create new task</Link>
      </nav>
    );
  }
