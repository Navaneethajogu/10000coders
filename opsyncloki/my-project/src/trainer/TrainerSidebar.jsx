import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  FileText, 
  UserCheck, 
  Video,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  UserPlus
} from 'lucide-react';

const TrainerSidebar = ({ activeSection, setActiveSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Trainer Dashboard' },
    { id: 'tasks', icon: ClipboardList, label: 'Assign Tasks' },
    { id: 'assignments', icon: FileText, label: 'Assign Assignments' },
    { id: 'attendance', icon: UserCheck, label: 'Take Attendance' },
    { id: 'meetings', icon: Video, label: 'Conduct Meets' },
    { id: 'chat', icon: MessageCircle, label: 'Chat with Trainees' },
    { id: 'add-trainee', icon: UserPlus, label: 'Add Trainee' },
    // Added more items to test scrolling
    { id: 'reports', icon: FileText, label: 'Generate Reports' },
    { id: 'settings', icon: UserCheck, label: 'Configure Settings' },
    { id: 'notifications', icon: MessageCircle, label: 'Manage Notifications' },
  ];

  return (
    <div 
      className={`bg-gradient-to-b from-indigo-900 to-indigo-800 text-white transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      } min-h-screen fixed left-0 top-0 z-20 shadow-1xl border-r border-indigo-700 sidebar`}
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
            background: #f4f4f8ff; /* Darker indigo-900 shade */
            border-radius: 8px;
          }
          .sidebar::-webkit-scrollbar-thumb {
            background-color: #7d7d80ff; /* Indigo-500 for thumb */
            border-radius: 8px;
            border: 2px solid #c4c4c9ff; /* Match track color for border */
          }
          .sidebar::-webkit-scrollbar-thumb:hover {
            background-color: #606063ff; /* Indigo-600 on hover */
          }
        `}
      </style>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 shadow-lg transition-colors duration-200 z-30"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-indigo-700">
        {!isCollapsed && (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-indigo-300">CamelQ</h2>
            <p className="text-sm text-indigo-400 mt-1">Training Management</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'hover:bg-indigo-700 text-indigo-300 hover:text-white'
                }`}
              >
                <item.icon 
                  size={20} 
                  className={`${isCollapsed ? 'mx-auto' : 'mr-3'} transition-colors duration-200`}
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
        <div className="p-4 border-t border-indigo-700">
          <div className="text-xs text-indigo-500 text-center">
            © 2025 Trainer Dashboard
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerSidebar;