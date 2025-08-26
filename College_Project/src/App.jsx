import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Loginpage from "./Components/Loginpage";
import Dashboard from "./Components/Dashboard";
import MarkAttendance from "./Components/MarkAttendance";
import AttendanceSummary from "./Components/AttendanceSummary";
import StudentAttendance from "./Components/StudentAttendance";
import ClassAttendance from "./Components/ClassAttendance";
import ProfilePage from "./Components/ProfilePage";

import "./App.css";

const AppLayout = ({ children }) => (
  <div className="container">
    {children}
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/mark" element={<AppLayout><MarkAttendance /></AppLayout>} />
        <Route path="/summary" element={<AppLayout><AttendanceSummary /></AppLayout>} />
        <Route path="/student" element={<AppLayout><StudentAttendance /></AppLayout>} />
        <Route path="/class" element={<AppLayout><ClassAttendance /></AppLayout>} />
        <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
