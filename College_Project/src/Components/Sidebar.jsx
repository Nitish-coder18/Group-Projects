import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const loc = useLocation();
  const items = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Mark Attendance", to: "/mark" },
    { name: "Student Summary", to: "/summary" },
    { name: "Student Records", to: "/student" },
    { name: "Class Attendance", to: "/class" },
    { name: "Profile", to: "/profile" },
  ];
  return (
    <aside className="sidebar card">
      <nav className="nav-links">
        {items.map(it => (
          <Link key={it.to} to={it.to} className="link" style={{ fontWeight: loc.pathname === it.to ? 700 : 400 }}>
            {it.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
