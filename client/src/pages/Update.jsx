import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Update() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchTaskById = async () => {
      try {
        const res = await fetch(`http://localhost:5000/endpoints/read/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch task");

        const data = await res.json();
        setFormData({
          title: data.title || "",
          description: data.description || "",
          status: data.status || "todo",
          dueDate: data.dueDate ? data.dueDate.slice(0, 10) : "", // keep it in yyyy-mm-dd format for <input type="date">
        });
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Could not load task. Please try again.");
      }
    };

    fetchTaskById();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/endpoints/update/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate("/tasks");
      } else {
        const msg = await res.text();
        setError(msg || "Failed to update task.");
      }
    } catch (err) {
      console.error("Request failed:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
