import Doctor from "../models/doctor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import Patient from "../models/patient.model.js";
import Prescription from "../models/Prescription.model.js";


// Add a doctor
const addDoctor = asyncHandler(async (req, res) => {
    const { _id: userId, username: userName } = req.user; // Extract logged-in user details
    const { specialization, experience, contactNumber, email, onlineTimings } = req.body;

    // Validate input
    if (!specialization || !experience || !contactNumber || !email || !onlineTimings) {
        throw new ApiError(400, "All fields are required.");
    }

    // Check for duplicate email
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
        throw new ApiError(409, "A doctor with this email already exists.");
    }

    // Create and save new doctor
    const newDoctor = await Doctor.create({
        userId,
        userName,
        specialization,
        experience,
        contactNumber,
        email,
        onlineTimings,
    });

    // Send success response
    res.status(201).json(new ApiResponse(201, newDoctor, "Doctor added successfully."));
});


// Get all doctors
const getAllDoctors = asyncHandler(async (req, res) => {
    // Fetch doctors from the database
    const doctors = await Doctor.find();

    // If no doctors are found
    if (doctors.length === 0) {
        throw new ApiError(404, "No doctors found.");
    }

    // Send success response
    res.status(200).json(new ApiResponse(200, doctors, "Doctors fetched successfully."));
});


const addPatientDetails = asyncHandler(async (req, res) => {
    const { age, gender, symptoms } = req.body;
    const { doctorId } = req.params;
    const userId = req.user._id

    // Validate input
    if (!age || !gender || !symptoms || !req.file) {
        throw new ApiError(400, "All fields and a report file are required.");
    }

    // Upload the report file to Cloudinary
    const uploadedFile = await uploadOnCloudinary(req.file.path);

    if (!uploadedFile || !uploadedFile.url) {
        throw new ApiError(500, "Failed to upload file to Cloudinary.");
    }

    // Create and save patient data
    const newPatient = await Patient.create({
        userId,
        doctorId,
        age,
        gender,
        symptoms,
        report: uploadedFile.url, // Save the Cloudinary URL in the report field
    });

    // Send success response
    res.status(201).json(new ApiResponse(201, newPatient, "Patient details added successfully."));
});


const getPatients = asyncHandler(async (req, res) => {
    const doctorId = req.user._id; // Doctor's ID (logged-in user's ID)

    // Fetch the patients assigned to the doctor (using doctorId)
    const patients = await Patient.find({ doctorId });

    // If no patients are found, throw a 404 error
    if (patients.length === 0) {
        throw new ApiError(404, "No patients found for this doctor.");
    }

    // Send success response with the list of patients
    res.status(200).json(new ApiResponse(200, patients, "Patients fetched successfully."));
});




const sendResponse = asyncHandler(async (req, res) => {
    const recipient = req.body.userId; // Patient ID from the request body
    console.log(req.body);


    // Extract required fields from the request body
    const { prescriptionDate, medications, suggestions } = req.body;

    // Ensure all required fields are provided
    if (!prescriptionDate) {
        return res.status(400).json({ message: 'Prescription date is required' });
    }

    if (!medications || medications.length === 0) {
        return res.status(400).json({ message: 'At least one medication is required' });
    }

    if (!suggestions) {
        return res.status(400).json({ message: 'Suggestions are required' });
    }

    // Find the patient using the provided patient ID (recipient)
    const patient = await Patient.find({ userId: recipient });

    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    // Create a new prescription instance
    const prescription = new Prescription({
        patientId: recipient, // Patient ID
        doctorId: req.user._id, // Doctor's ID (logged-in doctor)
        prescriptionDate,
        doctorName: req.user.username, // Assuming the doctor's name is in req.user.username
        medications, // List of medications
        suggestions, // Prescription suggestions
    });

    // Save the prescription to the database
    const savedPrescription = await prescription.save();

    // Respond with the saved prescription data
    res.status(201).json({
        message: 'Prescription saved successfully',
        prescription: savedPrescription,
    });
});




const getPrescription = asyncHandler(async (req, res) => {
    const doctorId = req.user._id; // Doctor's ID (logged-in user's ID)

    console.log(doctorId);

    // Fetch prescriptions where `doctorId` matches the logged-in doctor's ID
    const prescriptions = await Prescription.find({ patientId: doctorId });

    if (!prescriptions || prescriptions.length === 0) {
        res.status(404);
        throw new Error('No prescriptions found for this doctor.');
    }

    res.status(200).json({
        message: 'Prescriptions retrieved successfully',
        prescriptions
    });
});


export { addDoctor, getAllDoctors, addPatientDetails, getPatients, sendResponse, getPrescription };
