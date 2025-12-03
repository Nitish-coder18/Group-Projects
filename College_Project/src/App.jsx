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

// ProtectedRoute function
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

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

        {/* Wrap all secure pages with ProtectedRoute */}
        <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
        <Route path="/mark" element={<ProtectedRoute><AppLayout><MarkAttendance /></AppLayout></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><AppLayout><AttendanceSummary /></AppLayout></ProtectedRoute>} />
        <Route path="/student" element={<ProtectedRoute><AppLayout><StudentAttendance /></AppLayout></ProtectedRoute>} />
        <Route path="/class" element={<ProtectedRoute><AppLayout><ClassAttendance /></AppLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><AppLayout><ProfilePage /></AppLayout></ProtectedRoute>} />
      </ Routes>
    </Router>
  );
}

export default App;
