import React from "react";
import { useTheme } from "../Components/ThemeContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

const ProfilePage = () => {
  const { teacherName, setTeacherName } = useTheme();
  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main">
          <div className="card">
            <h3>Profile</h3>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <label className="small">Teacher Name</label>
              <input className="input" value={teacherName} onChange={e => setTeacherName(e.target.value)} />
            </div>
            <div className="small" style={{ marginTop:8 }}>Name stored in localStorage for header</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
