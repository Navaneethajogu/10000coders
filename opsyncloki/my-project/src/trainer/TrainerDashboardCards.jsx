import React from 'react';
import { 
  Users, 
  ClipboardList, 
  FileText, 
  Calendar, 
  CheckCircle,
  Clock,
  MessageCircle,
  Video,
  TrendingUp,
  Award,
  BookOpen,
  Target
} from 'lucide-react';

const TrainerDashboardCards = ({ onCardClick }) => {
  const mainStats = [
    {
      id: 'my-students',
      title: 'My Students',
      count: 28,
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+3 this month'
    },
    {
      id: 'active-tasks',
      title: 'Active Tasks',
      count: 12,
      icon: ClipboardList,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '8 completed today'
    },
    {
      id: 'pending-assignments',
      title: 'Pending Assignments',
      count: 5,
      icon: FileText,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '2 due tomorrow'
    },
    {
      id: 'attendance-rate',
      title: 'Attendance Rate',
      count: '94%',
      icon: CheckCircle,
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      trend: '+2% this week'
    },
    {
      id: 'upcoming-meetings',
      title: 'Upcoming Meetings',
      count: 3,
      icon: Video,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: 'Next: Today 2PM'
    },
    {
      id: 'unread-messages',
      title: 'Unread Messages',
      count: 7,
      icon: MessageCircle,
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      trend: '3 urgent'
    }
  ];

  const batchProgress = [
    {
      id: 'java-batch-progress',
      title: 'Java Batch Progress',
      progress: 75,
      students: 28,
      module: 'Advanced Java Concepts',
      icon: BookOpen,
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'current-module',
      title: 'Current Module',
      progress: 60,
      students: 28,
      module: 'Spring Framework',
      icon: Target,
      color: 'bg-gradient-to-r from-indigo-500 to-blue-500',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const recentActivities = [
    { action: 'Assignment submitted by Alex Kumar', time: '2 hours ago', type: 'assignment' },
    { action: 'Attendance marked for Java Batch', time: '4 hours ago', type: 'attendance' },
    { action: 'New message from Priya Sharma', time: '6 hours ago', type: 'message' },
    { action: 'Meeting scheduled for tomorrow', time: '1 day ago', type: 'meeting' }
  ];

  const upcomingDeadlines = [
    { task: 'Java Project Submission Review', date: 'Dec 28, 2025', priority: 'high' },
    { task: 'Weekly Assessment Creation', date: 'Jan 2, 2026', priority: 'medium' },
    { task: 'Student Progress Reports', date: 'Jan 5, 2026', priority: 'low' }
  ];

  const Card = ({ item, onClick, children }) => (
    <div
      onClick={() => onClick(item.id, item)}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
    >
      {children}
    </div>
  );

  const StatCard = ({ item }) => (
    <Card item={item} onClick={onCardClick}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">{item.title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{item.count}</p>
            <p className="text-sm text-green-600 font-medium">{item.trend}</p>
          </div>
          <div className={`w-16 h-16 ${item.bgColor} rounded-lg flex items-center justify-center`}>
            <item.icon size={32} className={item.textColor} />
          </div>
        </div>
      </div>
    </Card>
  );

  const ProgressCard = ({ item }) => (
    <Card item={item} onClick={onCardClick}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{item.title}</p>
            <p className="text-lg font-bold text-gray-900">{item.students} Students</p>
          </div>
          <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
            <item.icon size={24} className={item.textColor} />
          </div>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-600 mb-2">{item.module}</p>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{item.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${item.color}`}
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainStats.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </div>

      {/* Batch Progress */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Batch Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {batchProgress.map((item) => (
            <ProgressCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Additional Trainer Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Log */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="mr-3 text-indigo-600" size={24} />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="mr-3 text-green-600" size={24} />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition-colors duration-200">
              <ClipboardList size={18} />
              <span className="text-sm font-medium">Create Task</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors duration-200">
              <FileText size={18} />
              <span className="text-sm font-medium">New Assignment</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors duration-200">
              <CheckCircle size={18} />
              <span className="text-sm font-medium">Take Attendance</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-colors duration-200">
              <Video size={18} />
              <span className="text-sm font-medium">Schedule Meet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="mr-3 text-red-600" size={24} />
          Upcoming Deadlines
        </h3>
        <div className="space-y-3">
          {upcomingDeadlines.map((deadline, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  deadline.priority === 'high' ? 'bg-red-500' :
                  deadline.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <span className="text-sm font-medium text-gray-900">{deadline.task}</span>
              </div>
              <span className="text-sm text-gray-500">{deadline.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboardCards;