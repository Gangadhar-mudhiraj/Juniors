import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const prescriptionSchema = new Schema({
    patientId: { // Patient ID field (updated from `id` for clarity)
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: { // Doctor ID field
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    prescriptionDate: {
        type: Date,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    medications: [
        {
            tabletName: {
                type: String,
                required: true
            },
            dosage: {
                type: String,
                required: true
            },
            time: {
                type: [String], // Store time as an array of strings
                required: true
            }
        }
    ],
    suggestions: {
        type: String
    }
});

export default model('Prescription', prescriptionSchema);
