import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}`
        );
        if (response.data) {
          setUserDetails(response.data);
        } else {
          console.error("User not found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserDetails(null);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-2xl">
        {userDetails ? (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-800">
              UserId: {userDetails.id}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Username: {userDetails.username}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              First Name: {userDetails.firstname}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Last Name: {userDetails.lastname}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Email: {userDetails.email}
            </p>
          </div>
        ) : (
          <p className="text-lg text-red-600">User details not found.</p>
        )}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
