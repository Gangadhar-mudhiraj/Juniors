import mongoose from 'mongoose';

// Define the Patient Schema
const patientSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Assuming you have a User model for user information
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Doctor', // Reference to the Doctor model
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other'], // You can modify this as needed
        },
        symptoms: {
            type: String,
            required: true,
        },
        report: {
            type: String, // This will store the URL of the uploaded report from Cloudinary
            required: true,
        },
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Create and export the Patient model
const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
