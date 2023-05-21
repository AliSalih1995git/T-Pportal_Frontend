import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

function ParentPage() {
  const [allStudents, setAllStudents] = useState([]);
  const [batch, setBatch] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6001/api/parents/getAllStudentData"
      );
      setAllStudents(response.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  console.log(allStudents);
  return (
    <div>
      <Header />
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
                        Result
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {allStudents.map((student) => (
                      <tr key={student._id}>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {student.parent}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {student.batches}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {student.marks}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {student.mark}
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
