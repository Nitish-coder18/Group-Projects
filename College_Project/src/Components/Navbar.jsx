import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = ({ teacherName }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div>
        <h1 className="font-bold text-xl">Welcome, {teacherName}</h1>
      </div>
      <div className="flex gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/mark-attendance">Mark Attendance</Link>
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
