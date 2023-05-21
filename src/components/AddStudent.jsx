import React, { useEffect, useState } from "react";
import axios from "axios";

function AddStudent() {
  const [studentName, setStudentName] = useState("");
  const [parentName, setParenName] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);

  const fetchBatches = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacher/getAllBatches`
      );
      setBatches(response.data);
    } catch (error) {
      console.log("Error fetching batches:", error);
    }
  };
  useEffect(() => {
    fetchBatches();
  }, []);

  const handleBatchSelection = (batchId, e) => {
    if (e.target.checked) {
      setSelectedBatches((prev) => [...prev, batchId]);
    } else {
      setSelectedBatches((prev) => prev.filter((id) => id !== batchId));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacher/createStudent`,
        {
          name: studentName,
          parent: parentName,
          batches: selectedBatches,
        }
      );
    } catch (error) {
      console.log(error);
    }
    setStudentName("");
    setParenName("");
    setSelectedBatches([]);
  };

  return (
    <div className="m-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Parent Name:
            </label>
            <input
              type="text"
              id="name"
              value={parentName}
              onChange={(e) => setParenName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Student Name:
            </label>
            <input
              type="text"
              id="name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Batches:
            </label>
            {batches.map((batch) => (
              <label key={batch._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={batch._id}
                  onChange={(e) => handleBatchSelection(batch._id, e)}
                  checked={selectedBatches.includes(batch._id)}
                  className="form-checkbox border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span>{batch.name}</span>
              </label>
            ))}
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
