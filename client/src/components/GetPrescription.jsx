// GetPrescription.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPills, FaCalendarAlt, FaUserMd } from 'react-icons/fa'; // Importing icons
import { useUser } from '../context/UserContext';

const GetPrescription = () => {
    const { user } = useUser();
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const URL = import.meta.env.VITE_API_URL; // Ensure this is the correct endpoint for your API

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get(`${URL}/doctor/getPrescription`, {
                    withCredentials: true, // Ensure the API request is made with proper credentials
                });
                setPrescriptions(response.data.prescriptions);
            } catch (err) {
                setError(err.response?.data?.message || "An error occurred while fetching prescriptions.");
            } finally {
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, [URL]);

    // Render the component
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F1E8FF] via-[#D6C1FF] to-[#F7D6FF] text-gray-800 py-12">
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-xl">
                <h3 className="text-4xl font-bold text-center mb-8 text-teal-700">Your Prescriptions</h3>

                {loading ? (
                    <div className="text-center text-2xl text-teal-500">Loading...</div>
                ) : error ? (
                    <div className="text-red-500 text-center text-xl mb-6">{error}</div>
                ) : prescriptions.length === 0 ? (
                    <div className="text-center text-lg text-gray-600">No prescriptions found.</div>
                ) : (
                    <div className="space-y-8">
                        {prescriptions.map((prescription) => (
                            <div key={prescription._id} className="bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <h4 className="text-2xl font-semibold flex items-center mb-4">
                                    <FaUserMd className="text-teal-500 mr-3" />
                                    <span>Prescription for Patient: {user.username}</span>
                                </h4>
                                <div className="flex items-center text-lg mb-4">
                                    <FaCalendarAlt className="text-teal-500 mr-3" />
                                    <span><strong>Prescription Date:</strong> {new Date(prescription.prescriptionDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-lg mb-6">
                                    <FaUserMd className="text-teal-500 mr-3" />
                                    <span><strong>Doctor:</strong> {prescription.doctorName}</span>
                                </div>

                                <h5 className="text-xl font-semibold flex items-center mb-4">
                                    <FaPills className="text-teal-500 mr-3" />
                                    Medications
                                </h5>
                                <ul className="list-disc pl-8 space-y-3 text-lg">
                                    {prescription.medications.map((medication, index) => (
                                        <li key={index}>
                                            <strong>{medication.tabletName}</strong><br />
                                            <span>Dosage: {medication.dosage}</span><br />
                                            <span>Time: {medication.time.join(', ')}</span>
                                        </li>
                                    ))}
                                </ul>

                                {prescription.suggestions && (
                                    <div className="mt-6 text-lg">
                                        <strong>Suggestions:</strong> {prescription.suggestions}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetPrescription;
