import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getClassAttendance } from "../api/attendanceApi";

const ClassAttendance = () => {
  const [className, setClassName] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!className) return;
    setLoading(true);
    getClassAttendance(className)
      .then(data => setRecords(Array.isArray(data) ? data : []))
      .catch(e => { console.error(e); alert("Failed to fetch class attendance"); })
      .finally(() => setLoading(false));
  }, [className]);

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main">
          <div className="card">
            <h3>Class Attendance</h3>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <select className="select" value={className} onChange={e=>setClassName(e.target.value)}>
                <option value="">Select Class</option>
                {["A","B","C","D","E","F"].map(s=> <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {loading ? <div className="small">Loading…</div> : (
              <>
                {records.length===0 ? <div className="small" style={{ marginTop:12 }}>No records</div> : (
                  <table className="table" style={{ marginTop:12 }}>
                    <thead><tr><th>ID</th><th>Student</th><th>Date</th><th>Status</th></tr></thead>
                    <tbody>
                      {records.map((r, i) => (
                        <tr key={i}>
                          <td>{r.id}</td>
                          <td>{r.student?.name}</td>
                          <td>{r.date}</td>
                          <td style={{ color: r.status==="PRESENT" ? "green":"red", fontWeight:700 }}>{r.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassAttendance;
