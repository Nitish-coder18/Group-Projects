import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SummaryPanel from "./SummaryPanel";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main">
          <div className="card">
            <h3>Dashboard</h3>
            <p className="small">Quick links and snapshots.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <div className="card" style={{ flex: 1 }}>
                <h4>Quick Actions</h4>
                <div className="small"><a href="/mark">→ Mark Attendance</a></div>
                <div className="small"><a href="/student">→ Student Records</a></div>
                <div className="small"><a href="/summary">→ Student Summary</a></div>
              </div>
              <div className="card" style={{ flex: 1 }}>
                <h4>Recent</h4>
                <div className="small">Use Class Attendance to view recent entries</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <SummaryPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
