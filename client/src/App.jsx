import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext'; // Import useUser here
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AddDoctor from './components/AddDoctor';
import GetDoctors from './components/GetDoctors';
import GetRequests from './components/GetRequests';
import GetPrescription from './components/GetPrescription';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser(); // Now useUser is defined here
  return user ? children : <Navigate to="/login" replace />;
};

const AppWrapper = () => {
  const navigate = useNavigate(); // Get navigate from useNavigate here

  return (
    <UserProvider navigate={navigate}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/addDoctor" element={<ProtectedRoute><AddDoctor /></ProtectedRoute>} />
        <Route path="/getDoctor" element={<ProtectedRoute><GetDoctors /></ProtectedRoute>} />
        <Route path="/getRequests" element={<ProtectedRoute><GetRequests /></ProtectedRoute>} />
        <Route path="/getPrescription" element={<ProtectedRoute><GetPrescription /></ProtectedRoute>} />
        <Route path="*" element={<RedirectBasedOnUser />} />
      </Routes>
    </UserProvider>
  );
};

// Component for redirecting based on user state
const RedirectBasedOnUser = () => {
  const { user } = useUser();
  return <Navigate to={user ? "/home" : "/login"} replace />;
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
