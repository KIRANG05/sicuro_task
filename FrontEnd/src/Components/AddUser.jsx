import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState({
    id: "",
    userName: "",    // Use 'userName' instead of 'username'
    firstName: "",   // Use 'firstName' instead of 'firstname'
    lastName: "",    // Use 'lastName' instead of 'lastname'
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userWithId = {
        ...user,
        id: Math.random().toString(36).substr(2, 9),
      };

      // Check if all fields are filled
      if (!user.userName || !user.firstName || !user.lastName || !user.email || !user.password) {
        console.error("Please fill out all the fields");
        return;
      }

      const response = await axios.post(`http://localhost:1234/api/users`, userWithId);
      console.log("User added successfully:", response.data);
      
      // Show success message on successful submission
      setSuccessMessage("User added successfully!");

      setUser({
        id: "",
        userName: "",   // Reset field names accordingly
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        setSuccessMessage(""); // Clear the message after a few seconds
        navigate("/");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <button
        onClick={handleBack}
        className="p-3 mb-4 text-sm text-white transition-all duration-200 transform bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105"
      >
        Back
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 transition-all duration-500 transform bg-white rounded-lg shadow-2xl hover:scale-105"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Add New User
        </h2>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Username:</label>
          <input
            type="text"
            name="userName"   // Use 'userName' to match backend
            value={user.userName}
            onChange={handleChange}
            className="w-full p-3 mt-1 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">First Name:</label>
          <input
            type="text"
            name="firstName"  // Use 'firstName' to match backend
            value={user.firstName}
            onChange={handleChange}
            className="w-full p-3 mt-1 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Last Name:</label>
          <input
            type="text"
            name="lastName"   // Use 'lastName' to match backend
            value={user.lastName}
            onChange={handleChange}
            className="w-full p-3 mt-1 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 mt-1 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 mt-1 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 text-sm text-white transition-all duration-200 rounded-full bg-gradient-to-r from-green-400 to-teal-500 hover:scale-105"
        >
          Add User
        </button>

        {/* Success message popup */}
        {successMessage && (
          <div className="p-4 mt-4 text-green-700 bg-green-100 border border-green-400 rounded-lg">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddUser;
