import { Router } from "express";
import {
    addDoctor,
    getAllDoctors,
    addPatientDetails,
    getPatients,
    sendResponse,
    getPrescription
} from "../controllers/doctor.controller.js";
import { isLoggedIn } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const doctorRoutes = Router();

// Routes for doctors
doctorRoutes.post("/", isLoggedIn, addDoctor);
doctorRoutes.get("/", isLoggedIn, getAllDoctors);

// Route for adding patient details with file upload
doctorRoutes.post(
    "/patientDetails/:doctorId",
    isLoggedIn,
    upload.single("report"),
    addPatientDetails
);

// Route for getting all patients
doctorRoutes.get("/patientDetails", isLoggedIn, getPatients);

// Route for sending prescription to a patient
doctorRoutes.post("/sendResponse", isLoggedIn, sendResponse);

// Route for getting prescriptions
doctorRoutes.get("/getPrescription", isLoggedIn, getPrescription);

export default doctorRoutes;
