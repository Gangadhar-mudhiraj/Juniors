import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPills, FaCalendarAlt, FaUserMd, FaCheckCircle } from "react-icons/fa"; // Importing icons

const GetRequests = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [prescriptionData, setPrescriptionData] = useState({
        prescriptionDate: new Date().toISOString().split("T")[0], // Default to today's date
        tablets: [], // Array to store tablets information
        suggestions: "", // Single suggestion from radio buttons
    });
    const [currentPatient, setCurrentPatient] = useState(null); // Track the patient to send the prescription

    const URL = import.meta.env.VITE_API_URL; // Ensure this is the correct endpoint for your API

    // List of medications and suggestions
    const medicationsList = [
        "Aspirin", "Ibuprofen", "Paracetamol", "Amoxicillin", "Cetirizine", "Loratadine"
    ];

    const suggestionsList = [
        { label: "Take with food", value: "take_with_food" },
        { label: "Take before bed", value: "take_before_bed" },
        { label: "Follow-up in 2 weeks", value: "follow_up" },
        { label: "Take with water", value: "take_with_water" },
    ];

    // Fetch patients assigned to the doctor
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${URL}/doctor/patientDetails`, {
                    withCredentials: true, // Ensure the API request is made with proper credentials
                });
                setPatients(response.data.data); // Assuming the response contains an array of patients in the 'data' field
            } catch (err) {
                setError(err.response?.data?.message || "An error occurred while fetching patients.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, [URL]);

    // Handle input changes for prescription form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPrescriptionData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle tablet information (tablet name, time, dosage)
    const handleAddTablet = () => {
        const tabletName = document.getElementById("tabletName").value;
        const tabletTime = Array.from(document.querySelectorAll('input[name="tabletTime"]:checked')).map(
            (checkbox) => checkbox.value
        );
        const tabletDosage = document.getElementById("tabletDosage").value;

        if (tabletName && tabletTime.length > 0 && tabletDosage) {
            setPrescriptionData((prev) => ({
                ...prev,
                tablets: [
                    ...prev.tablets,
                    { name: tabletName, time: tabletTime, dosage: tabletDosage },
                ],
            }));

            // Clear the input fields
            document.getElementById("tabletName").value = "";
            document.getElementById("tabletDosage").value = "";
            document.querySelectorAll('input[name="tabletTime"]:checked').forEach((checkbox) => {
                checkbox.checked = false;
            });
        } else {
            setError("Please fill in all tablet information.");
        }
    };

    // Handle prescription submission
    const handleSendResponse = async () => {
        if (!prescriptionData.prescriptionDate || prescriptionData.tablets.length === 0) {
            setError("Prescription Date and Tablets are required.");
            return;
        }

        // Map tablets to medications
        const medications = prescriptionData.tablets.map((tablet) => ({
            tabletName: tablet.name,
            time: tablet.time, // Send the array of times as is
            dosage: tablet.dosage,
        }));

        // Ensure medications array is not empty
        if (medications.length === 0) {
            setError("At least one medication is required.");
            return;
        }

        try {
            const response = await axios.post(
                `${URL}/doctor/sendResponse`,
                {
                    userId: currentPatient.userId, // Send patient ID
                    prescriptionDate: prescriptionData.prescriptionDate, // Send prescription date
                    medications, // Send medications array
                    suggestions: prescriptionData.suggestions, // Send suggestions
                },
                { withCredentials: true }
            );
            alert("Prescription sent successfully.");
            // Reset form and patient selection after success
            setPrescriptionData({
                prescriptionDate: new Date().toISOString().split("T")[0], // Reset to today's date
                tablets: [],
                suggestions: "",
            });
            setCurrentPatient(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send prescription.");
        }
    };

    // Render the component
    return (
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <h3 className="text-2xl font-semibold text-center mb-6">
                <FaUserMd className="inline-block mr-3 text-teal-500" /> Patients Assigned to You
            </h3>

            {loading ? (
                <div className="text-center text-lg">Loading...</div>
            ) : error ? (
                <div className="text-red-500 text-center text-lg">{error}</div>
            ) : patients.length === 0 ? (
                <div className="text-center text-lg">No patients found.</div>
            ) : (
                <div className="space-y-6">
                    {patients.map((patient) => (
                        <div key={patient._id} className="bg-gray-100 p-6 rounded-md shadow-md">
                            <h4 className="text-xl font-semibold">
                                <FaUserMd className="inline-block mr-3 text-teal-500" />
                                Patient: {patient.name}
                            </h4>
                            <div className="mt-2">
                                <strong>Age:</strong> {patient.age}
                            </div>
                            <div className="mt-2">
                                <strong>Gender:</strong> {patient.gender}
                            </div>
                            <div className="mt-2">
                                <strong>Symptoms:</strong> {patient.symptoms}
                            </div>
                            <div className="mt-2">
                                <strong>Report:</strong> {patient.report ? <a href={patient.report} target="_blank" rel="noopener noreferrer">View Report</a> : "No report available"}
                            </div>
                            <button
                                onClick={() => setCurrentPatient(patient)}
                                className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                            >
                                <FaPills className="inline-block mr-2" /> Send Prescription
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {currentPatient && (
                <div className="mt-8 bg-gray-50 p-8 rounded-md shadow-lg">
                    <h4 className="text-2xl font-semibold mb-6">
                        <FaPills className="inline-block mr-3" />
                        Send Prescription for {currentPatient.name}
                    </h4>

                    <div className="mb-6">
                        <label className="block text-lg mb-2"><FaCalendarAlt className="inline-block mr-2" /> Prescription Date</label>
                        <input
                            type="date"
                            name="prescriptionDate"
                            value={prescriptionData.prescriptionDate}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm mb-4"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg mb-2"><FaPills className="inline-block mr-2" /> Add Tablet</label>
                        <input
                            id="tabletName"
                            type="text"
                            placeholder="Tablet Name"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm mb-4"
                        />
                        <div className="flex items-center space-x-6 mb-4">
                            <div>
                                <input
                                    type="checkbox"
                                    name="tabletTime"
                                    value="morning"
                                />
                                <label className="ml-2 text-lg">Morning</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="tabletTime"
                                    value="afternoon"
                                />
                                <label className="ml-2 text-lg">Afternoon</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="tabletTime"
                                    value="evening"
                                />
                                <label className="ml-2 text-lg">Evening</label>
                            </div>
                        </div>
                        <input
                            id="tabletDosage"
                            type="text"
                            placeholder="Dosage (e.g., 1 tablet)"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm mb-4"
                        />
                        <button
                            onClick={handleAddTablet}
                            className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                        >
                            <FaCheckCircle className="inline-block mr-2" /> Add Tablet
                        </button>
                    </div>

                    {/* Show added tablets */}
                    {prescriptionData.tablets.length > 0 && (
                        <div className="mt-6">
                            <h5 className="text-lg font-semibold">Added Tablets:</h5>
                            <ul className="space-y-4">
                                {prescriptionData.tablets.map((tablet, index) => (
                                    <li key={index} className="bg-gray-200 p-4 rounded-md shadow-sm">
                                        <strong>{tablet.name}</strong><br />
                                        Dosage: {tablet.dosage}<br />
                                        Time: {tablet.time.join(", ")}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-6">
                        <label className="block text-lg mb-2">Suggestions</label>
                        {suggestionsList.map((suggestion) => (
                            <div key={suggestion.value} className="flex items-center mb-4">
                                <input
                                    type="radio"
                                    id={suggestion.value}
                                    name="suggestions"
                                    value={suggestion.value}
                                    onChange={handleInputChange}
                                    className="mr-3"
                                />
                                <label htmlFor={suggestion.value} className="text-lg">{suggestion.label}</label>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleSendResponse}
                        className="mt-8 bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                    >
                        <FaPills className="inline-block mr-2" /> Send Prescription
                    </button>
                </div>
            )}
        </div>
    );
};

export default GetRequests;
