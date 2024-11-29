// models/doctor.model.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the logged-in user
    userName: { type: String, required: true }, // Name of the logged-in user
    specialization: { type: String, required: true }, // Specialization of the doctor
    experience: { type: Number, required: true }, // Years of experience
    contactNumber: { type: String, required: true }, // Contact number
    email: { type: String, required: true, unique: true }, // Email of the doctor
    onlineTimings: { type: String, required: true } // Online availability timings
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
