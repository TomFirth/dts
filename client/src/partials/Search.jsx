import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [formData, setFormData] = useState({ query: "" });
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/endpoints/read/${formData.query}`);
      
      if (res.ok) {
        navigate(`/task/${formData.query}`);
      } else {
        setError("Task not found. Please check the ID and try again.");
      }
    } catch (err) {
      console.error("Request failed:", err);
      setError("An error occurred while searching. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          id="search"
          name="query"
          value={formData.query}
          onChange={(e) => setFormData({ query: e.target.value })}
          placeholder="Enter task ID..."
          className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
}
