import { Link } from "react-router-dom";

function SideBar({ children }) {
  return (
    <div className="flex">
      <div className="w-60 h-screen bg-slate-500 ">
        <h1 className="m-6 text-center text-2xl font-semibold">
          Teacher Portal
        </h1>
        <ul className="pt-6 font-semibold text-center">
          <li className="mt-4 cursor-pointer">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="mt-4 cursor-pointer">
            <Link to="/addStudent">Add Student</Link>
          </li>
          <li className="mt-4 cursor-pointer">
            <Link to="/addBatches">Add Batches</Link>
          </li>{" "}
          <li className="mt-4 cursor-pointer text-orange-50">
            <Link to="/parent">Parent Portal</Link>
          </li>
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default SideBar;
