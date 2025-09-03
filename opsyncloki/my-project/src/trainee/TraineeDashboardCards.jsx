import React from 'react';
import { 
  Calendar, 
  FileText, 
  Video, 
  CheckCircle,
  Clock,
  MessageCircle,
  BarChart3,
  BookOpen,
  Award,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';

const TraineeDashboardCards = ({ onCardClick }) => {
  const mainStats = [
    {
      id: 'my-courses',
      title: 'My Courses',
      count: 3,
      icon: BookOpen,
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      trend: '1 in progress'
    },
    {
      id: 'pending-tasks',
      title: 'Pending Tasks',
      count: 5,
      icon: FileText,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '2 due tomorrow'
    },
    {
      id: 'assignments-due',
      title: 'Assignments Due',
      count: 3,
      icon: Clock,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      trend: '1 overdue'
    },
    {
      id: 'attendance-rate',
      title: 'My Attendance',
      count: '96%',
      icon: CheckCircle,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '23/24 days present'
    },
    {
      id: 'upcoming-meetings',
      title: 'Upcoming Meetings',
      count: 2,
      icon: Video,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: 'Next: Today 2PM'
    },
    {
      id: 'unread-messages',
      title: 'Unread Messages',
      count: 4,
      icon: MessageCircle,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: '2 from trainer'
    }
  ];

  const courseProgress = [
    {
      id: 'java-course-progress',
      title: 'Java Full Stack Development',
      progress: 75,
      modules: 12,
      completedModules: 9,
      icon: BookOpen,
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'current-module',
      title: 'Current Module: Spring Framework',
      progress: 60,
      lessons: 8,
      completedLessons: 5,
      icon: Target,
      color: 'bg-gradient-to-r from-indigo-500 to-blue-500',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const recentActivities = [
    { action: 'Submitted Java Collections Assignment', time: '2 hours ago', type: 'assignment' },
    { action: 'Attended Spring Boot Workshop', time: '1 day ago', type: 'meeting' },
    { action: 'Completed Database Design Module', time: '2 days ago', type: 'course' },
    { action: 'Received feedback on project', time: '3 days ago', type: 'feedback' }
  ];

  const upcomingDeadlines = [
    { task: 'Spring Boot Project Submission', date: 'Dec 28, 2025', priority: 'high' },
    { task: 'Unit Testing Assignment', date: 'Jan 2, 2026', priority: 'medium' },
    { task: 'Code Review Presentation', date: 'Jan 5, 2026', priority: 'low' }
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
            <p className="text-lg font-bold text-gray-900">
              {item.modules ? `${item.completedModules}/${item.modules} Modules` : `${item.completedLessons}/${item.lessons} Lessons`}
            </p>
          </div>
          <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
            <item.icon size={24} className={item.textColor} />
          </div>
        </div>
        <div className="mb-2">
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

      {/* Course Progress */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseProgress.map((item) => (
            <ProgressCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Additional Trainee Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Log */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="mr-3 text-emerald-600" size={24} />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
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
            <button className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg transition-colors duration-200">
              <FileText size={18} />
              <span className="text-sm font-medium">Submit Task</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200">
              <Video size={18} />
              <span className="text-sm font-medium">Join Meeting</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors duration-200">
              <CheckCircle size={18} />
              <span className="text-sm font-medium">Mark Attendance</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-colors duration-200">
              <BarChart3 size={18} />
              <span className="text-sm font-medium">View Progress</span>
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

export default TraineeDashboardCards;