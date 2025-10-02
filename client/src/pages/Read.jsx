import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Read() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/endpoints/read/");
        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        setTasks(data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Could not load tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/endpoints/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Could not delete task. Please try again.");
    }
  };

  const updateTask = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 border rounded-lg shadow-sm hover:bg-gray-50 flex justify-between items-center"
            >
              <span onClick={() => navigate(`/task/${task.id}`)}>
                {task.title} / {task.status} /{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "N/A"}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => updateTask(task.id)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
