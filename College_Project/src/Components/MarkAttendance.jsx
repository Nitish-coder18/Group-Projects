import React, { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getClassStudents, markAttendanceBulk } from "../api/attendanceApi";

const todayISO = () => new Date().toISOString().slice(0,10);

const MarkAttendance = () => {
  const [className, setClassName] = useState("");
  const [date, setDate] = useState(todayISO());
  const [students, setStudents] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!className) { setStudents([]); setStatusMap({}); return; }
    setLoading(true);
    getClassStudents(className)
      .then(raw => {
        const normalized = Array.isArray(raw) ? raw.map(item => {
          if (item.student && item.student.id !== undefined) return { id: item.student.id, name: item.student.name || `Student ${item.student.id}` };
          if (item.id !== undefined && !item.student) return { id: item.id, name: item.name || `Student ${item.id}` };
          return { id: item.student?.id ?? item.id ?? Math.random(), name: item.student?.name ?? item.name ?? "Unknown" };
        }) : [];
        setStudents(normalized);
        const initial = {};
        normalized.forEach(s => initial[s.id] = "ABSENT");
        setStatusMap(initial);
      })
      .catch(e => { console.error(e); alert("Failed to load students"); })
      .finally(() => setLoading(false));
  }, [className]);

  const entries = useMemo(() => Object.entries(statusMap).map(([sid, status]) => ({ studentId: Number(sid), status })), [statusMap]);

  const presentCount = useMemo(() => Object.values(statusMap).filter(v => v === "PRESENT").length, [statusMap]);
  const absentCount = useMemo(() => Object.values(statusMap).filter(v => v === "ABSENT").length, [statusMap]);

  const toggleAll = (to) => {
    const next = {};
    students.forEach(s => next[s.id] = to);
    setStatusMap(next);
  };

  const updateStatus = (id, v) => setStatusMap(m => ({ ...m, [id]: v }));

  const submit = async () => {
    if (!className) return alert("Select class");
    if (!date) return alert("Select date");
    if (!entries.length) return alert("No entries to send");
    try {
      await markAttendanceBulk({ className, date, entries });
      alert("Attendance submitted.");
    } catch (e) {
      console.error(e);
      alert("Failed to submit attendance. See console.");
    }
  };

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main">
          <div className="card">
            <h3>Mark Attendance</h3>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <div>
                <label className="small">Class</label>
                <select className="select" value={className} onChange={e=>setClassName(e.target.value)}>
                  <option value="">Select Section</option>
                  {["A","B","C","D","E","F"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="small">Date</label>
                <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
              </div>
              <div style={{ marginLeft: "auto", display:"flex", gap:8 }}>
                <button className="btn btn-primary" onClick={()=>toggleAll("PRESENT")}>All Present</button>
                <button className="btn" onClick={()=>toggleAll("ABSENT")}>All Absent</button>
                <button className="btn btn-primary" onClick={submit}>Submit Attendance</button>
              </div>
            </div>

            <div style={{ marginTop:12 }}>
              {loading ? <div className="small">Loading students…</div> : (
                <>
                  <div className="small">Present: <b>{presentCount}</b> · Absent: <b>{absentCount}</b> · Total: <b>{students.length}</b></div>
                  <table className="table">
                    <thead><tr><th>ID</th><th>Name</th><th>Status</th></tr></thead>
                    <tbody>
                      {students.map(s => (
                        <tr key={s.id}>
                          <td>{s.id}</td>
                          <td>{s.name}</td>
                          <td>
                            <select className="select" value={statusMap[s.id] || "ABSENT"} onChange={e => updateStatus(s.id, e.target.value)}>
                              <option value="PRESENT">PRESENT</option>
                              <option value="ABSENT">ABSENT</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkAttendance;
