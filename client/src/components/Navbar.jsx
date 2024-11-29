import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaHome, FaInfoCircle, FaUserPlus, FaStethoscope, FaNotesMedical, FaVideo } from 'react-icons/fa'; // Importing icons

const Navbar = () => {
    const { user, logoutUser } = useUser();

    return (
        <nav className="bg-gradient-to-r from-[#F1E8FF] via-[#D6C1FF] to-[#F7D6FF] text-gray-800 flex justify-between items-center p-6">
            {/* Left Side: Brand/Logo or Navigation Links */}
            <div className="flex items-center space-x-6 lg:space-x-8">
                <Link to="/home" className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600">
                    <FaHome className="mr-2" /> Home
                </Link>
                <Link to="/about" className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600">
                    <FaInfoCircle className="mr-2" /> About
                </Link>
                <Link to="/addDoctor" className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600">
                    <FaUserPlus className="mr-2" /> Add Doctor
                </Link>
                <Link to="/getDoctor" className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600">
                    <FaStethoscope className="mr-2" /> Get Doctor
                </Link>
                <Link to="/getRequests" className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600">
                    <FaNotesMedical className="mr-2" /> Get Requests
                </Link>
                <Link to="/getPrescription" className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600">
                    <FaNotesMedical className="mr-2" /> Get Prescription
                </Link>
                <Link to="/video conferencing" className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600">
                    <FaVideo className="mr-2" /> Video Conference
                </Link>
            </div>

            {/* Right Side: User Actions */}
            <div className="flex items-center space-x-6">
                {user ? (
                    <>
                        <span className="text-sm font-medium text-gray-800">Welcome, {user.username}!</span>
                        <button
                            onClick={logoutUser}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-lg font-semibold text-gray-800 hover:text-blue-600">Login</Link>
                        <Link to="/signin" className="text-lg font-semibold text-gray-800 hover:text-blue-600">Sign In</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
