import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  UserCheck, 
  BarChart3, 
  CalendarDays,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Dashboard Overview' },
    { id: 'manage-trainers', icon: Users, label: 'Manage Trainers & Trainees' },
    { id: 'attendance', icon: Calendar, label: 'Monitor Attendance' },
    { id: 'assign-trainers', icon: UserCheck, label: 'View Assigned Trainers' },
    { id: 'performance', icon: BarChart3, label: 'Analyze Performance' },
    { id: 'meetings', icon: CalendarDays, label: 'View Meeting Schedules' },
    // Added more items to test scrolling
    { id: 'reports', icon: BarChart3, label: 'Generate Reports' },
    { id: 'settings', icon: Users, label: 'Configure Settings' },
    { id: 'notifications', icon: CalendarDays, label: 'Manage Notifications' },
    { id: 'support', icon: UserCheck, label: 'Customer Support' },
  ];

  return (
    <div 
      className={`bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen fixed left-0 top-0 z-20 shadow-2xl border-r border-slate-700 sidebar`}
      style={{ maxHeight: '100vh', overflowY: 'auto', overflowX: 'auto' }} // Both vertical and horizontal scrolling
    >
      {/* Custom Scrollbar Styles */}
      <style>
        {`
          .sidebar::-webkit-scrollbar {
            width: 12px; /* Thickness of vertical scrollbar */
            height: 12px; /* Thickness of horizontal scrollbar */
          }
          .sidebar::-webkit-scrollbar-track {
             background: #f2f7f7fa; /* Darker emerald shade for track */
            border-radius: 2px;
          }
          .sidebar::-webkit-scrollbar-thumb {
           background-color: #919493ff; /* Emerald-400 for thumb */
            border-radius: 8px;
            border: 1px solid #6d6d6dff; /* Match track color for border */
          }
          .sidebar::-webkit-scrollbar-thumb:hover {
             background-color: #d0e6e3ff; /* Lighter shade on hover */
          }
        `}
      </style>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1 shadow-lg transition-colors duration-200 z-30"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        {!isCollapsed && (
          <div className="text-center">
            <h2 className="text-xl font-bold text-blue-400">OPSYNC Admin</h2>
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
                className={`w-full flex items-center gap-x-2 px-2 py-3 rounded-lg transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <item.icon 
                  size={20} 
                  className={`${isCollapsed ? 'mx-auto' : ''} transition-colors duration-200`}
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