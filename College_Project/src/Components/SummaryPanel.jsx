import React, { useState } from "react";
import { getStudentSummary } from "../api/attendanceApi";

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

  return (
    <div className="card">
      <h3>Student Attendance Summary</h3>
      <div style={{ display:"flex", gap:8, alignItems:"end" }}>
        <input className="input" placeholder="Student ID" value={studentId} onChange={e=>setStudentId(e.target.value)} />
        <button className="btn btn-primary" onClick={fetch} disabled={loading}>{loading ? "Loading..." : "Get Summary"}</button>
      </div>

      {summary && (
        <div style={{ display:"flex", gap:12, marginTop:12 }}>
          <div className="card" style={{ textAlign:"center", flex:1 }}>
            <div className="small">Present Days</div>
            <div style={{ fontSize:18, fontWeight:700 }}>{summary.presentDays}</div>
          </div>
          <div className="card" style={{ textAlign:"center", flex:1 }}>
            <div className="small">Total Days</div>
            <div style={{ fontSize:18, fontWeight:700 }}>{summary.totalDays}</div>
          </div>
          <div className="card" style={{ textAlign:"center", flex:1 }}>
            <div className="small">Percentage</div>
            <div style={{ fontSize:18, fontWeight:700 }}>{summary.percentage}%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryPanel;
