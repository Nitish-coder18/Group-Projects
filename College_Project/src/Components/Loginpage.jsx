import { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => setDarkMode(!darkMode);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <div className="w-full max-w-md p-8 bg-whi00
        
        te dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-500 tran
        
        
        
        
        
        sform">
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleMode}
            className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-gray-800 dark:text-gray-200"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6 transition-all duration-500">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {/* Form */}
          <form className="flex flex-col space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Switch Form */}
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
