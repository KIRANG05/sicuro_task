import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen space-y-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <h1 className="text-6xl font-extrabold text-white drop-shadow-lg animate__animated animate__fadeIn">
       Users Task
      </h1>
      <div className="flex space-x-6">
        <Link to="/adduser">
          <button className="p-4 px-10 text-lg font-semibold text-white transition duration-300 transform rounded-full shadow-xl bg-gradient-to-r from-green-400 to-teal-500 hover:scale-105 hover:shadow-2xl focus:outline-none">
            Add User
          </button>
        </Link>
        <Link to="/fetchuser">
          <button className="p-4 px-10 text-lg font-semibold text-white transition duration-300 transform rounded-full shadow-xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:scale-105 hover:shadow-2xl focus:outline-none">
            Fetch User
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
