import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; 
import { MdDashboard, MdOutlineAssignment, MdPeople, MdClass, MdPerson } from "react-icons/md";

const Sidebar = () => {
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const items = [
    { name: "Dashboard", to: "/dashboard", icon: <MdDashboard size={24} /> },
    { name: "Mark Attendance", to: "/mark", icon: <MdOutlineAssignment size={24} /> },
    { name: "Student Summary", to: "/summary", icon: <MdPeople size={24} /> },
    { name: "Student Records", to: "/student", icon: <MdPeople size={24} /> },
    { name: "Class Attendance", to: "/class", icon: <MdClass size={24} /> },
    { name: "Profile", to: "/profile", icon: <MdPerson size={24} /> },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">My App</h1>
        <FiMenu size={28} onClick={() => setOpen(!open)} className="cursor-pointer" />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white shadow-lg transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 z-50`}
      >
        <nav className="flex flex-col p-4 space-y-4">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              onClick={() => setOpen(false)}
              className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 transition 
              ${loc.pathname === it.to ? "bg-gray-300 font-bold" : ""}`}
            >
              {it.icon}
              <span>{it.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black bg-opacity-30 md:hidden"></div>}
    </>
  );
};

export default Sidebar;
