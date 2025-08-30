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

// ------------------- AUTH -------------------
export const loginUser = (payload) =>
  axiosInstance.post("/auth/login", payload).then((r) => r.data);

export const signupUser = (payload) =>
  axiosInstance.post("/auth/signup", payload).then((r) => r.data);

// ------------------- ATTENDANCE -------------------
export const getClassStudents = (className) =>
  axiosInstance.get(`/attendance/class/${className}`).then((r) => r.data);

export const markAttendanceBulk = (payload) =>
  axiosInstance.post("/attendance/mark", payload).then((r) => r.data);

export const getStudentSummary = (studentId) =>
  axiosInstance.get(`/attendance/summary/${studentId}`).then((r) => r.data);

export const getStudentAttendance = (studentId) =>
  axiosInstance.get(`/attendance/student/${studentId}`).then((r) => r.data);

export const getClassAttendance = (className) =>
  axiosInstance.get(`/attendance/class/${className}`).then((r) => r.data);

// ------------------- STUDENTS -------------------

// ✅ Students list by section (sirf section ka naam do)
export const getStudentsBySection = (sectionName) =>
  axiosInstance
    .get(`/students/by-class?className=${sectionName}`)
    .then((r) => r.data);

// ✅ Paginated students list (backend me page & size support hona chahiye)
export const getPaginatedStudents = (page = 1, size = 10) =>
  axiosInstance.get(`/students?page=${page}&size=${size}`).then((r) => r.data);

// ✅ Download students list (CSV/Excel)
export const downloadStudents = async (sectionName) => {
  const res = await axiosInstance.get(
    `/students/by-class?className=${sectionName}`,
    {
      responseType: "blob", // file download ke liye zaroori
    }
  );

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `students_${sectionName}.csv`); // ya .xlsx agar backend se wahi aata hai
  document.body.appendChild(link);
  link.click();
  link.remove();
};
