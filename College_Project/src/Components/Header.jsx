import React from "react";
import { useTheme } from "../Components/ThemeContext";

const Header = () => {
  const { toggleTheme, teacherName, darkMode } = useTheme();
  return (
    <div className="card header" style={{ marginBottom: 12 }}>
      <div>
        <h2 style={{margin:0}}>Attendance System</h2>
        <div className="small">Manage attendance for your college</div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div className="small">Signed in: <b>{teacherName || "Teacher"}</b></div>
        <button className="btn" onClick={toggleTheme}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
      </div>
    </div>
  );
};

export default Header;
