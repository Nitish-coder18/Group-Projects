// src/Components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import {
  MdDashboard,
  MdOutlineAssignment,
  MdPeople,
  MdClass,
  MdPerson,
} from "react-icons/md";
import { useTheme } from "../Components/ThemeContext"; // <-- apne path ke hisaab se

const Sidebar = () => {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme(); // ThemeContext se

  const items = [
    { name: "Dashboard", to: "/dashboard", icon: <MdDashboard size={22} /> },
    { name: "Mark Attendance", to: "/mark", icon: <MdOutlineAssignment size={22} /> },
    { name: "Student Summary", to: "/summary", icon: <MdPeople size={22} /> },
    { name: "Student Records", to: "/student", icon: <MdPeople size={22} /> },
    { name: "Class Attendance", to: "/class", icon: <MdClass size={22} /> },
    { name: "Profile", to: "/profile", icon: <MdPerson size={22} /> },
  ];

  const shell = darkMode
    ? "bg-slate-900 text-slate-100 border-slate-800"
    : "bg-white text-slate-900 border-slate-200";

  const hoverItem = darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100";
  const activeItem = darkMode ? "bg-slate-800" : "bg-slate-200";

  return (
    <>
      {/* Mobile Top Bar (hamburger) */}
      <div
        className={`md:hidden px-4 py-3 flex justify-between items-center border-b ${shell}`}
      >
        <h1 className="text-lg font-semibold">Attendance</h1>
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-md outline-none focus:ring"
        >
          <FiMenu size={26} />
        </button>
      </div>

      {/* Sidebar Drawer */}
      <aside
        className={`fixed md:fixed top-0 left-0 h-screen w-64 border-r ${shell}
        transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Brand (desktop) */}
        <div className="hidden md:flex items-center justify-between px-4 py-4 border-b border-inherit">
          <span className="font-semibold">Attendance System</span>
          {/* Theme toggle (optional) */}
          <button
            onClick={toggleTheme}
            className={`text-xs px-2 py-1 rounded border ${
              darkMode
                ? "border-slate-700 hover:bg-slate-800"
                : "border-slate-300 hover:bg-slate-100"
            }`}
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col p-4 gap-2">
          {items.map((it) => {
            const active = loc.pathname === it.to;
            return (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)} // mobile: link click -> close
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${hoverItem} ${active ? activeItem + " font-semibold" : ""}`}
              >
                {it.icon}
                <span>{it.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Dark overlay (mobile only) */}
      {open && (
        <button
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-40"
        />
      )}

      {/* NOTE:
         - Desktop pe sidebar fixed h-screen hai. 
         - Content area ko left margin (ml-64) do apne layout me, e.g. wrapper div me md:ml-64.
      */}
    </>
  );
};

export default Sidebar;
