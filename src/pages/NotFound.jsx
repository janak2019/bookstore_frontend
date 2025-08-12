import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6 text-center">
      {/* SVG Illustration */}
      <div className="w-64 md:w-80 mb-6">
        <svg
          className="w-full h-full"
          viewBox="0 0 700 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="350" cy="250" r="200" fill="#3B82F6" opacity="0.1" />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="120"
            fill="#3B82F6"
            fontFamily="Arial, sans-serif"
          >
            404
          </text>
        </svg>
      </div>

      {/* Message */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
        Page not found
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
