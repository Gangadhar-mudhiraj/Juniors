// GetDoctors.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';

const GetDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL; // Assuming this URL is stored in your .env file

    useEffect(() => {
        // Fetch the list of doctors when the component is mounted
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${API_URL}/doctor`, { withCredentials: true });
                setDoctors(response.data.data); // Assuming the response structure has 'data' as an array of doctors
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || "An error occurred while fetching doctors.");
            }
        };

        fetchDoctors();
    }, [API_URL]); // Re-run the effect if the API_URL changes

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F1E8FF] via-[#D6C1FF] to-[#F7D6FF] text-gray-800">
            <div className="max-w-7xl mx-auto p-6">
                <h2 className="text-3xl font-semibold text-center mb-6">Doctors List</h2>

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                {doctors.length === 0 ? (
                    <p className="text-center text-gray-600">No doctors found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((doctor) => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetDoctors;
