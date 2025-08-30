// src/api/studentApi.js
import axios from "axios";

const API_URL = "http://localhost:8080/students";

export const createStudent = async (studentData) => {
  try {
    const token = localStorage.getItem("token"); // Login ke baad save kiya hua JWT token

    const res = await axios.post(API_URL, studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return res.data;
  } catch (err) {
    console.error("Error creating student:", err);
    throw err;
  }
};
