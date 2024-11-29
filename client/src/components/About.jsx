import { useUser } from '../context/UserContext'; // Adjust the path as needed

const About = () => {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F1E8FF] via-[#D6C1FF] to-[#F7D6FF] text-gray-800">
            <div className="container mx-auto px-8 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        About Us
                    </h1>
                    <p className="text-xl mt-4 text-gray-600">This is a protected page for logged-in users only. If you're logged in, welcome! Otherwise, please log in to explore our services further.</p>
                </div>

                {/* About Content Section */}
                <div className="bg-white p-12 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-600">
                        We provide easy access to certified doctors who can consult with you online. Our goal is to make healthcare more accessible and convenient for everyone.
                    </p>
                    <p className="text-lg text-gray-600 mt-4">
                        Whether you're looking for a consultation, needing advice on your reports, or simply want to ensure you're leading a healthy lifestyle, we're here to support you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
