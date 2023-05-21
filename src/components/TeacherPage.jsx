import axios from "axios";
import React, { useEffect, useState } from "react";

// const initialState = {
//   parent: "",
//   student: "",
//   batch: "",
//   mark: "",
// };
function TeacherPage() {
  console.log(process.env.REACT_APP_BACKEND_URL, "DDDDDDDD");

  const [allstudent, setAllstudent] = useState([]);

  const fetchBatches = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacher/getAllStudent`
      );
      setAllstudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBatches();
  }, []);

  const handleMarkChange = (studentId, event) => {
    const updatedStudents = allstudent.map((student) => {
      if (student._id === studentId) {
        return { ...student, mark: event.target.value };
      }
      return student;
    });
    setAllstudent(updatedStudents);
  };

  const handleSubmit = async (studentId) => {
    const student = allstudent.find((student) => student._id === studentId);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacher/addResult`,
        {
          studentId: student._id,
          batchId: student.batch,
          marks: student.mark,
        }
      );
      setAllstudent(response.data);
      fetchBatches();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Parent Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Student Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Batches
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Add Marks
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {allstudent.map((student) => (
                    <tr key={student._id}>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {student.parent}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        <select
                          className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                          value={student.batch}
                          onChange={(e) =>
                            setAllstudent((prev) =>
                              prev.map((prev) =>
                                prev._id === student._id
                                  ? { ...prev, batch: e.target.value }
                                  : prev
                              )
                            )
                          }
                        >
                          <option>Select Batches</option>
                          {student.batches.map((batch) => (
                            <option key={batch} value={batch}>
                              {batch}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        <input
                          type="text"
                          class="peer block min-h-[auto] w-full rounded border  bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary"
                          placeholder="Enter Mark"
                          value={student.mark || ""}
                          onChange={(e) => handleMarkChange(student._id, e)}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="text-green-500 hover:text-green-700"
                          onClick={() => handleSubmit(student._id)}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherPage;
