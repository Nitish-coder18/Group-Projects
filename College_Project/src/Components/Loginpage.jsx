import { useState } from "react";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => setDarkMode(!darkMode);
  const toggleForm = () => setIsLogin(!isLogin);

  // API base URL
  const API_URL = "http://localhost:8080/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login API Call
        const response = await axios.post(`${API_URL}/login`, {
          username: email, // backend expects username field
          password: password
        });
        console.log("Login Success:", response.data);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        alert("Login Successful!");
      } else {
        // Signup API Call with ADMIN role
        const response = await axios.post(`${API_URL}/signup`, {
          username: email,
          password: password,
          role: "ADMIN", // changed USER to ADMIN
          fullName: name,
          email: email
        });
        console.log("Signup Success:", response.data);
        alert("Signup Successful!");
        setIsLogin(true); // switch to login after signup
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else {
        console.error("Request Error:", error.message);
      }
      alert("Failed! Check console for details.");
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-500 transform">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleMode}
            className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-gray-800 dark:text-gray-200"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6 transition-all duration-500">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
