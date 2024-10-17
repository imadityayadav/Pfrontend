import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100  ">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Patient Portal</h1>
        <Link to="/dashboard">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mr-5">
            Go to Patient Dashboard
          </button>
        </Link>
        <Link to="/form">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
          Prior Authorization Form
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
