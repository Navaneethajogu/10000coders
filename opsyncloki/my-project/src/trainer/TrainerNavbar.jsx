import React from 'react';
import { Search } from 'lucide-react';

const Navbar = ({ sidebarCollapsed }) => {
  return (
    <nav
      className={`bg-white shadow-lg border-b border-gray-200 fixed top-0 right-0 z-10 transition-all duration-300 ${
        sidebarCollapsed ? 'left-16' : 'left-64'
      }`}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo & Project Name */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* Replace T with CamelQ image */}
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border border-gray-200">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyNvaZKaEZ_zp_qEeY9xYmzE83DFfdNUdk4w&s" 
                  alt="CamelQ Logo"
                  className="w-full h-full object-contain bg-white "
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Training</h1>
                <p className="text-sm text-gray-500">Management System</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search trainers, trainees, batches..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
