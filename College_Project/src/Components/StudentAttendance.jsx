import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getStudentAttendance } from "../api/attendanceApi";

const StudentAttendance = () => {
  const [studentId, setStudentId] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    if (!studentId) return alert("Enter student ID");
    setLoading(true);
    try {
      const data = await getStudentAttendance(studentId);
      setRecords(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch student records");
    } finally { setLoading(false); }
  };

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main">
          <div className="card">
            <h3>Student Records</h3>
            <div style={{ display:"flex", gap:8, alignItems:"end" }}>
              <input className="input" placeholder="Student ID" value={studentId} onChange={e=>setStudentId(e.target.value)} />
              <button className="btn btn-primary" onClick={fetch} disabled={loading}>{loading ? "Loading..." : "Fetch"}</button>
            </div>

            {records.length > 0 ? (
              <table className="table" style={{ marginTop:12 }}>
                <thead><tr><th>Date</th><th>Status</th><th>Name</th><th>Roll No</th><th>Class</th><th>Section</th></tr></thead>
                <tbody>
                  {records.map((r, idx) => (
                    <tr key={idx}>
                      <td>{r.date}</td>
                      <td style={{ color: r.status==="PRESENT" ? "green":"red", fontWeight:700 }}>{r.status}</td>
                      <td>{r.student?.name}</td>
                      <td>{r.student?.rollNo}</td>
                      <td>{r.student?.className}</td>
                      <td>{r.student?.section}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <div className="small" style={{ marginTop:12 }}>No records found</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentAttendance;
