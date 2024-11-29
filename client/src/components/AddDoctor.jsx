import React, { useState } from "react";
import axios from "axios";
import { FaUserMd, FaPhoneAlt, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const AddDoctor = () => {
    const [doctorData, setDoctorData] = useState({
        specialization: "",
        experience: "",
        contactNumber: "",
        email: "",
        onlineTimings: "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL; // Assuming you have this URL in your .env file

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to add a new doctor
            const response = await axios.post(`${API_URL}/doctor`, doctorData, { withCredentials: true });

            // Handle success response
            setSuccessMessage(response.data.message);
            setError(null);
            setDoctorData({
                specialization: "",
                experience: "",
                contactNumber: "",
                email: "",
                onlineTimings: "",
            });
        } catch (err) {
            // Handle error response
            setError(err.response?.data?.message || "An error occurred.");
            setSuccessMessage(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F1E8FF] via-[#D6C1FF] to-[#F7D6FF] text-gray-800 flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Add Doctor</h2>

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Specialization */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="specialization">
                            Specialization
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-2">
                            <FaUserMd className="text-teal-500 mr-2" />
                            <input
                                type="text"
                                id="specialization"
                                name="specialization"
                                value={doctorData.specialization}
                                onChange={handleChange}
                                required
                                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="experience">
                            Experience (years)
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-2">
                            <FaCalendarAlt className="text-teal-500 mr-2" />
                            <input
                                type="number"
                                id="experience"
                                name="experience"
                                value={doctorData.experience}
                                onChange={handleChange}
                                required
                                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    {/* Contact Number */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="contactNumber">
                            Contact Number
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-2">
                            <FaPhoneAlt className="text-teal-500 mr-2" />
                            <input
                                type="text"
                                id="contactNumber"
                                name="contactNumber"
                                value={doctorData.contactNumber}
                                onChange={handleChange}
                                required
                                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email Address
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-2">
                            <FaEnvelope className="text-teal-500 mr-2" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={doctorData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    {/* Online Timings */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="onlineTimings">
                            Online Timings
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-2">
                            <FaCalendarAlt className="text-teal-500 mr-2" />
                            <input
                                type="text"
                                id="onlineTimings"
                                name="onlineTimings"
                                value={doctorData.onlineTimings}
                                onChange={handleChange}
                                required
                                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Add Doctor
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;
