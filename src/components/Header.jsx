import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex justify-around p-8 bg-slate-500 shadow-xl">
      <h1 className="text-2xl font-semibold">Parent Portal</h1>
      <span>
        <Link to="/">Go Teacher Portal</Link>
      </span>
    </nav>
  );
}

export default Header;
