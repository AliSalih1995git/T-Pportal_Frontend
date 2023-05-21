import axios from "axios";
import React, { useState } from "react";

function AddBatches() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacher/createBatches`,
        name
      );
    } catch (error) {
      console.log(error);
    }
    setName("");
  };
  console.log(name);
  return (
    <div className="m-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add Batches</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none"
            >
              Add Batches
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBatches;
