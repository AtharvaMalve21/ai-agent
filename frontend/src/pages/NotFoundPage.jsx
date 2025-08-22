import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 p-4">
      <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">
        Oops! It looks like you've stumbled upon a broken link.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to="/"
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go to Homepage
        </Link>
        <Link
          to="/dashboard" // Adjust this link based on your app's structure
          className="px-6 py-3 text-lg font-semibold text-blue-600 bg-white rounded-lg border border-blue-600 shadow-md hover:bg-gray-50 transition duration-300"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;