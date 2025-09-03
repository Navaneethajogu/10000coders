import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Video,
  UserCheck,
  MessageCircle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Book,
  Settings,
  HelpCircle,
  Bell
} from 'lucide-react';

const TraineeSidebar = ({ activeSection, setActiveSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Trainee Dashboard' },
    { id: 'schedule', icon: Calendar, label: 'View Training Schedule' },
    { id: 'submissions', icon: FileText, label: 'Submit Tasks ' },
    { id: 'submissions', icon: FileText, label: 'Submit Assignments' },
    { id: 'meetings', icon: Video, label: 'Join Meets' },
    { id: 'attendance', icon: UserCheck, label: 'Mark/View Attendance' },
    { id: 'chat', icon: MessageCircle, label: 'Chat with All Login Users' },
    { id: 'performance', icon: BarChart3, label: 'Track Performance' },
    { id: 'resources', icon: Book, label: 'Access Resources' },
    { id: 'settings', icon: Settings, label: 'Account Settings' },
    
    { id: 'notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <div 
      className={`bg-gradient-to-b from-emerald-900 to-emerald-800 text-white transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      } min-h-screen fixed left-0 top-0 z-20 shadow-2xl border-r border-emerald-700`}
      style={{ maxHeight: '100vh', overflowY: 'auto', overflowX: 'auto' }} // Both vertical and horizontal scrolling
    >
      {/* Custom Scrollbar Styles */}
      <style>
        {`
          .trainee-sidebar::-webkit-scrollbar {
            width: 12px; /* Thickness of vertical scrollbar */
            height: 12px; /* Thickness of horizontal scrollbar */
          }
          .trainee-sidebar::-webkit-scrollbar-track {
            background: #1a2f2f; /* Darker emerald shade for track */
            border-radius: 8px;
          }
          .trainee-sidebar::-webkit-scrollbar-thumb {
            background-color: #34d399; /* Emerald-400 for thumb */
            border-radius: 8px;
            border: 2px solid #1a2f2f; /* Match track color for border */
          }
          .trainee-sidebar::-webkit-scrollbar-thumb:hover {
            background-color: #2dd4bf; /* Lighter shade on hover */
          }
        `}
      </style>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-1 shadow-lg transition-colors duration-200 z-30"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-emerald-700">
        {!isCollapsed && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-400">CamelQ</h2>
            <p className="text-sm text-yellow-400 mt-1">Training Management</p>
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
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'hover:bg-emerald-700 text-emerald-300 hover:text-white'
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
        <div className="p-4 border-t border-emerald-700">
          <div className="text-xs text-emerald-500 text-center">
            © 2025 Trainee Dashboard
          </div>
        </div>
      )}
    </div>
  );
};

export default TraineeSidebar;