import React from 'react';
import { Search, Bell, Settings, LogOut } from 'lucide-react';

const TraineeNavbar = ({ sidebarCollapsed }) => {
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
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CQ</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Opsync Training</h1>
                <p className="text-sm text-gray-500"> Management System</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses, assignments, schedules..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Right Side - Profile & Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                4
              </span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200">
              <Settings size={20} />
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Trainee Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">CamelQ</p>
                <p className="text-xs text-gray-500">Trainee Portal</p>
              </div>
              <div className="relative group">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyNvaZKaEZ_zp_qEeY9xYmzE83DFfdNUdk4w&s"
                  alt="Companny Logo"
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-200 shadow-sm cursor-pointer group-hover:border-emerald-400 transition-colors duration-200"
                />
                
                {/* Profile Dropdown */}
                <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">Alex Kumar</p>
                    <p className="text-sm text-gray-500">alex.kumar@email.com</p>
                  </div>
                  <ul className="py-2">
                    <li>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                        <Settings size={16} className="mr-3" />
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                        <LogOut size={16} className="mr-3" />
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TraineeNavbar;