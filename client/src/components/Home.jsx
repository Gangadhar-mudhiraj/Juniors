import { useUser } from '../context/UserContext'; // Adjust the path as needed
import { FaUserMd, FaStethoscope, FaVideo } from 'react-icons/fa'; // Importing the video conferencing icon

const Home = () => {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F1E8FF] via-[#D6C1FF] to-[#F7D6FF] text-gray-800">
            <div className="container mx-auto px-8 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        Welcome, <span className="text-teal-600">{user?.username || 'Guest'}</span>!
                    </h1>
                    <p className="text-xl mt-4 text-gray-600">Explore our services below to get started with your online consultation. Your health is our priority.</p>
                </div>

                {/* Services Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {/* Consultation Service */}
                    <div className="flex flex-col items-center bg-white p-12 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <FaUserMd className="text-6xl text-teal-500 mb-6" />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Consult a Doctor</h3>
                        <p className="text-center text-gray-600 mb-4">Get quick consultations with certified doctors from the comfort of your home.</p>
                        <a
                            href="/consultation"
                            className="text-teal-600 hover:text-teal-800 text-lg font-medium"
                        >
                            Start Now
                        </a>
                    </div>

                    {/* Upload Reports Service */}
                    <div className="flex flex-col items-center bg-white p-12 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <FaStethoscope className="text-6xl text-pink-500 mb-6" />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Upload Your Reports</h3>
                        <p className="text-center text-gray-600 mb-4">Easily upload your medical reports for a professional review from our experts.</p>
                        <a
                            href="/upload-reports"
                            className="text-pink-600 hover:text-pink-800 text-lg font-medium"
                        >
                            Upload Now
                        </a>
                    </div>

                    {/* Video Conferencing Service */}
                    <div className="flex flex-col items-center bg-white p-12 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                        <FaVideo className="text-6xl text-blue-500 mb-6" />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Video Conferencing</h3>
                        <p className="text-center text-gray-600 mb-4">Join a live video consultation with a doctor from anywhere, at any time.</p>
                        <a
                            href="/video-conferencing"
                            className="text-blue-600 hover:text-blue-800 text-lg font-medium"
                        >
                            Start Video Call
                        </a>
                    </div>
                </div>

                {/* Health Advice Section */}
                <div className="mt-16 bg-white p-12 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Health Tips for You</h2>
                    <ul className="space-y-4 text-lg text-gray-600">
                        <li>💧 Stay hydrated: Drink at least 8 glasses of water daily for optimal health.</li>
                        <li>🍏 Eat a balanced diet: Include plenty of fruits, vegetables, and whole grains in your meals.</li>
                        <li>🏃‍♂️ Exercise regularly: Aim for at least 30 minutes of moderate exercise, 5 days a week.</li>
                        <li>😴 Get enough sleep: Aim for 7-8 hours of sleep each night to support mental and physical well-being.</li>
                        <li>🧠 Take care of your mental health: Practice mindfulness, meditation, and seek support when needed.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
