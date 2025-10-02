import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/endpoints/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate("/tasks"); // ✅ go to tasks page after success
      } else {
        const msg = await res.text();
        setError(msg || "Failed to create task.");
      }
    } catch (err) {
      console.error("Request failed:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            placeholder="Title"
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
            placeholder="Description"
            onChange={handleChange}
            rows={10}
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
            placeholder="Due Date"
            onChange={handleChange}
            className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
