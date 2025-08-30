import React, { useState } from "react";
import { getStudentSummary } from "../api/attendanceApi";
import { createStudent } from "../api/studentApi";

const SummaryPanel = () => {
  const [studentId, setStudentId] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    if (!studentId) return alert("Enter student ID");
    setLoading(true);
    try {
      const data = await getStudentSummary(studentId);
      setSummary(data);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch summary");
    } finally { setLoading(false); }
  };

  // Create Student Button Click
  const handleCreateStudent = async () => {
    const name = prompt("Enter Student Name:");
    const rollNo = prompt("Enter Roll No:");
    const className = prompt("Enter Class Name:");
    const section = prompt("Enter Section:");

    if (!name || !rollNo || !className || !section) {
      return alert("All fields are required!");
    }

    try {
      const newStudent = await createStudent({
        id: 0,
        name,
        rollNo,
        className,
        section,
      });
      alert(`Student Created: ${newStudent.name} (ID: ${newStudent.id})`);
    } catch {
      alert("Failed to create student");
    }
  };

  return (
    <div className="card">
      <h3>Student Attendance Summary</h3>
      <div style={{ display:"flex", gap:8, alignItems:"end", flexWrap:"wrap" }}>
        <input
          className="input"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetch} disabled={loading}>
          {loading ? "Loading..." : "Get Summary"}
        </button>
        <button className="btn btn-secondary" onClick={handleCreateStudent}>
          Create Student
        </button>
      </div>

      {summary && (
        <div style={{ display:"flex", gap:12, marginTop:12, flexWrap:"wrap" }}>
          <div className="card" style={{ textAlign:"center", flex:1, minWidth:100 }}>
            <div className="small">Present Days</div>
            <div style={{ fontSize:18, fontWeight:700 }}>{summary.presentDays}</div>
          </div>
          <div className="card" style={{ textAlign:"center", flex:1, minWidth:100 }}>
            <div className="small">Total Days</div>
            <div style={{ fontSize:18, fontWeight:700 }}>{summary.totalDays}</div>
          </div>
          <div className="card" style={{ textAlign:"center", flex:1, minWidth:100 }}>
            <div className="small">Percentage</div>
            <div style={{ fontSize:18, fontWeight:700 }}>{summary.percentage}%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryPanel;
