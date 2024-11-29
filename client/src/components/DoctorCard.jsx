import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserAlt, FaTransgenderAlt, FaStethoscope, FaFileAlt } from "react-icons/fa"; // Importing icons

const DoctorCard = ({ doctor }) => {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        symptoms: "",
        report: null
    });

    const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const URL = import.meta.env.VITE_API_URL;

    // Handle form data changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, report: e.target.files[0] }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);

        const formDataObj = new FormData();
        formDataObj.append("age", formData.age);
        formDataObj.append("gender", formData.gender);
        formDataObj.append("symptoms", formData.symptoms);
        formDataObj.append("report", formData.report);

        try {
            const response = await axios.post(
                `${URL}/doctor/patientDetails/${doctor.userId}`,
                formDataObj,
                { withCredentials: true }
            );
            setSuccessMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Clear success or error message after a certain time
    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
                setError(null);
            }, 5000); // Hide message after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [successMessage, error]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F1E8FF] via-[#D6C1FF] to-[#F7D6FF] text-gray-800 p-6">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-center mb-4">{doctor.name}</h3>
                <div className="space-y-2">
                    <div>
                        <strong>Specialization:</strong> {doctor.specialization}
                    </div>
                    <div>
                        <strong>Experience:</strong> {doctor.experience} years
                    </div>
                    <div>
                        <strong>Contact Number:</strong> {doctor.contactNumber}
                    </div>
                    <div>
                        <strong>Email:</strong> {doctor.email}
                    </div>
                    <div>
                        <strong>Online Timings:</strong> {doctor.onlineTimings}
                    </div>
                </div>

                {/* Button to show/hide the form */}
                <button
                    onClick={() => setIsFormVisible((prev) => !prev)}
                    className="w-full bg-teal-500 text-white py-2 rounded-md mt-4 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    {isFormVisible ? "Hide Form" : "Request Appointment"}
                </button>

                {/* Conditionally render the form */}
                {isFormVisible && (
                    <div className="mt-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && <div className="text-red-500">{error}</div>}
                            {successMessage && <div className="text-green-500">{successMessage}</div>}

                            <div>
                                <label className="block font-medium">Age</label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                    <FaUserAlt className="text-teal-500 mr-2" />
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium">Gender</label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                    <FaTransgenderAlt className="text-teal-500 mr-2" />
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium">Symptoms</label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                    <FaStethoscope className="text-teal-500 mr-2" />
                                    <textarea
                                        name="symptoms"
                                        value={formData.symptoms}
                                        onChange={handleInputChange}
                                        className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium">Report</label>
                                <div className="flex items-center border border-gray-300 rounded-md p-2">
                                    <FaFileAlt className="text-teal-500 mr-2" />
                                    <input
                                        type="file"
                                        name="report"
                                        onChange={handleFileChange}
                                        className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-teal-500 text-white py-2 rounded-md mt-4 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Send Request to Doctor"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorCard;
