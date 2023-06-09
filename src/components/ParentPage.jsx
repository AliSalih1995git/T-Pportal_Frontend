import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

function ParentPage() {
  const [allStudents, setAllStudents] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [singleStudent, setSingleStudent] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/parents/getAllParentData`
      );
      setAllStudents(response.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const uniqueParents = [...new Set(allStudents.map((obj) => obj.parent))];

  const handleDropdown = async (e) => {
    const query = e.target.value;
    setSelectedParent(query);
  };

  const handleClick = async () => {
    if (selectedParent) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/parents/getAllStudentData?parent=${selectedParent}`
        );
        setSingleStudent(response.data);
      } catch (error) {
        console.log("Error fetching students:", error);
      }
    }
  };
  // console.log(selectedParent, "str");
  // console.log(singleStudent, "AAAAAAAAAA");
  return (
    <div>
      <Header />
      <div className="m-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <div className="relative  flex justify-between ">
                  <select
                    className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                    onChange={(e) => handleDropdown(e)}
                  >
                    <option>Select Parent</option>
                    {uniqueParents.map((student) => (
                      <option key={student} value={student}>
                        {student}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none"
                    onClick={handleClick}
                  >
                    Go
                  </button>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        Parent Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        Student Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        Batches
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                      >
                        Semester Result
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {singleStudent.map((item) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.student.parent}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.student.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.batch.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.marks}
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
    </div>
  );
}

export default ParentPage;
