import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FetchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (searchType) => {
        try {
            let url;
            if (searchType === 'id') {
                url = `http://localhost:1234/api/users/${encodeURIComponent(searchTerm)}`; // For ID, use path parameter
            } else {
                url = `http://localhost:1234/api/users?${searchType}=${encodeURIComponent(searchTerm)}`; // For other searches, use query string
            }

            const response = await axios.get(url, {
                auth: {
                    username: 'iamkiran',
                    password: 'Kiran@123',
                },
                maxRedirects: 0,  // Disable automatic following of redirects
                validateStatus: function (status) {
                    return status >= 200 && status < 400;  // Accept any status code less than 400
                },
            });

            if (response.status === 302) {
                const redirectUrl = response.headers.location;
                console.log('Redirected to:', redirectUrl);
                alert(`Redirecting to: ${redirectUrl}`);
            } else if (response.data) {
                navigate('/details', { state: { userData: response.data } });
            } else {
                alert('User not found');
            }
        } catch (error) {
            if (error.response && error.response.status === 302) {
                const redirectUrl = error.response.headers.location;+
                console.log('Redirected to:', redirectUrl);
                alert(`Redirecting to: ${redirectUrl}`);
            } else {
                console.error('Error fetching user:', error);
                alert('Error fetching user details');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">Fetch User Details</h1>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter search term..."
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleSearch('username')}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                        Search by Username
                    </button>
                    <button
                        onClick={() => handleSearch('firstname')}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                    >
                        Search by First Name
                    </button>
                    <button
                        onClick={() => handleSearch('lastname')}
                        className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                    >
                        Search by Last Name
                    </button>
                    <button
                        onClick={() => handleSearch('email')}
                        className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
                    >
                        Search by Email
                    </button>
                    <button
                        onClick={() => handleSearch('id')}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                    >
                        Search by ID
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FetchUser;
