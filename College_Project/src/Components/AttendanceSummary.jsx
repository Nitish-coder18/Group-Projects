import React from "react";
import SummaryPanel from "./SummaryPanel";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AttendanceSummary = () => {
  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="main">
          <SummaryPanel />
        </div>
      </div>
    </>
  );
};

export default AttendanceSummary;
