import React from 'react';
import { LogOut as LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Logout = ({ activeSection, onLogout }) => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    // Call the onLogout callback if provided
    if (onLogout) onLogout();
    // Navigate to the root path
    navigate('/');
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center">
        <LogOutIcon className="mr-2" size={24} /> Logout
      </h1>
      {activeSection === 'logout' && (
        <div className="mt-6">
          <p className="text-gray-600">Are you sure you want to log out?</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Confirm Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;