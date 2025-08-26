import axios from "axios";

const BASE = "http://localhost:8080"; // change if backend at different URL

const axiosInstance = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Auth
export const loginUser = (payload) => axiosInstance.post("/auth/login", payload).then(r => r.data);
export const signupUser = (payload) => axiosInstance.post("/auth/signup", payload).then(r => r.data);

// Attendance
export const getClassStudents = (className) => axiosInstance.get(`/attendance/class/${className}`).then(r => r.data);
export const markAttendanceBulk = (payload) => axiosInstance.post("/attendance/mark", payload).then(r => r.data);
export const getStudentSummary = (studentId) => axiosInstance.get(`/attendance/summary/${studentId}`).then(r => r.data);
export const getStudentAttendance = (studentId) => axiosInstance.get(`/attendance/student/${studentId}`).then(r => r.data);
export const getClassAttendance = (className) => axiosInstance.get(`/attendance/class/${className}`).then(r => r.data);
