import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FaUser, FaLock } from 'react-icons/fa'; // Importing icons

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useUser();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!username || !password) {
            setErrorMessage('Both fields are required.');
            return;
        }

        setErrorMessage(''); // Clear previous error message
        await loginUser(username, password);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F1E8FF] via-[#D6C1FF] to-[#F7D6FF] text-gray-800">
            <div className="flex items-center justify-center min-h-screen">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-sm">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Login</h1>

                    {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}

                    {/* Username Input */}
                    <div className="flex items-center border border-gray-300 p-2 mb-4 rounded-md focus-within:ring-2 focus-within:ring-blue-400">
                        <FaUser className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex items-center border border-gray-300 p-2 mb-4 rounded-md focus-within:ring-2 focus-within:ring-blue-400">
                        <FaLock className="text-gray-400 mr-3" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-md w-full hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
