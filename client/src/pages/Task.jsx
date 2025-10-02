import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Task() {
  const [task, setTask] = useState([]);
  const [error, setError] = useState("");

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
  }, [params.id]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {task.length === 0 ? (
        <p className="text-gray-500">No task found.</p>
      ) : (
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.status}</p>
          <p>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
        </div>
      )}
    </div>
  );
}