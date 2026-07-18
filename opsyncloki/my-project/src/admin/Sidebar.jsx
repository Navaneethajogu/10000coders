import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Dashboard Overview' },
    { id: 'manage-trainers', icon: Users, label: 'View Trainers & Trainees' },
    { id: 'attendance', icon: Calendar, label: 'Monitor Attendance' },
    { id: 'performance', icon: BarChart3, label: 'Analyze Performance' },
    { id: 'meetings', icon: CalendarDays, label: 'View Meeting Schedules' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'logout', icon: LogOut, label: 'Logout' },
  ];
  
  return (
    <div 
      className={`bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen fixed left-0 top-0 z-50 shadow-2xl border-r border-slate-700`}
      style={{ maxHeight: '100vh', overflowY: 'auto' }}
    >
      {/* Custom Scrollbar Styles */}
      <style>
        {`
          .sidebar::-webkit-scrollbar {
            width: 8px;
          }
          .sidebar::-webkit-scrollbar-track {
            background: #2d3748;
            border-radius: 4px;
          }
          .sidebar::-webkit-scrollbar-thumb {
            background: #4a5568;
            border-radius: 4px;
          }
          .sidebar::-webkit-scrollbar-thumb:hover {
            background: #718096;
          }
        `}
      </style>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1 shadow-lg transition-colors duration-200 z-50"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        {!isCollapsed && (
          <div className="text-center">
            <h2 className="text-xl font-bold text-blue-400">TMS Admin</h2>
            <p className="text-sm text-slate-400 mt-1">Training Management</p>
          </div>
        )}
      </div>

      {/* Scrollable Menu */}
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <item.icon 
                  size={20} 
                  className={`${isCollapsed ? 'mx-auto' : 'mr-2'} transition-colors duration-200`}
                />
                {!isCollapsed && (
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-slate-500 text-center">
            © 2025 TMS Dashboard
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;