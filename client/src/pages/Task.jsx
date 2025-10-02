import { useEffect, useState, useParams } from "react";
import { useNavigate } from "react-router";

export default function Task() {
  const [task, setTask] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  let params = useParams();

  useEffect(() => {
    const fetchTaskById = async () => {
      try {
        const res = await fetch(`http://localhost:5000/endpoints/read/${params.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await res.json();
        setTask(data || []);
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Could not load task. Please try again.");
      }
    };

    fetchTaskById();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {task.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {task.map((task, index) => (
            <li
              key={index}
              className="p-4 border rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/task/${index}`)}
            >
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>{task.status}</p>
              <p>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}