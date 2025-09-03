import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen,
  Video,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ViewTrainingSchedule = () => {
  const [selectedDate, setSelectedDate] = useState('2025-01-15');
  const [viewMode, setViewMode] = useState('week'); // day, week, month

  const scheduleData = [
    {
      id: 1,
      title: 'Java Fundamentals',
      type: 'Lecture',
      trainer: 'John Smith',
      date: '2025-01-15',
      time: '09:00 AM - 11:00 AM',
      duration: '2 hours',
      location: 'Room A-101',
      meetingType: 'In-Person',
      status: 'Scheduled',
      description: 'Introduction to Java programming concepts and syntax',
      topics: ['Variables and Data Types', 'Control Structures', 'Methods']
    },
    {
      id: 2,
      title: 'Spring Boot Workshop',
      type: 'Workshop',
      trainer: 'John Smith',
      date: '2025-01-15',
      time: '02:00 PM - 05:00 PM',
      duration: '3 hours',
      location: 'Google Meet',
      meetingType: 'Virtual',
      status: 'Scheduled',
      description: 'Hands-on workshop on building REST APIs with Spring Boot',
      topics: ['Spring Boot Setup', 'REST Controllers', 'Database Integration']
    },
    {
      id: 3,
      title: 'Database Design Session',
      type: 'Lecture',
      trainer: 'Sarah Johnson',
      date: '2025-01-16',
      time: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      location: 'Room B-205',
      meetingType: 'In-Person',
      status: 'Scheduled',
      description: 'Database normalization and design principles',
      topics: ['ER Diagrams', 'Normalization', 'SQL Queries']
    },
    {
      id: 4,
      title: 'Code Review Session',
      type: 'Review',
      trainer: 'John Smith',
      date: '2025-01-17',
      time: '11:00 AM - 12:00 PM',
      duration: '1 hour',
      location: 'Zoom',
      meetingType: 'Virtual',
      status: 'Scheduled',
      description: 'Review of submitted assignments and best practices',
      topics: ['Code Quality', 'Best Practices', 'Feedback']
    },
    {
      id: 5,
      title: 'Project Presentation',
      type: 'Presentation',
      trainer: 'John Smith',
      date: '2025-01-18',
      time: '03:00 PM - 05:00 PM',
      duration: '2 hours',
      location: 'Auditorium',
      meetingType: 'In-Person',
      status: 'Scheduled',
      description: 'Final project presentations and peer reviews',
      topics: ['Project Demo', 'Q&A Session', 'Peer Feedback']
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Lecture':
        return <BookOpen size={16} className="text-blue-600" />;
      case 'Workshop':
        return <User size={16} className="text-green-600" />;
      case 'Review':
        return <Clock size={16} className="text-orange-600" />;
      case 'Presentation':
        return <Video size={16} className="text-purple-600" />;
      default:
        return <Calendar size={16} className="text-gray-600" />;
    }
  };

  const getMeetingTypeIcon = (type) => {
    switch (type) {
      case 'Virtual':
        return <Video size={16} className="text-blue-600" />;
      case 'In-Person':
        return <MapPin size={16} className="text-green-600" />;
      default:
        return <Calendar size={16} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Lecture':
        return 'bg-blue-100 text-blue-800';
      case 'Workshop':
        return 'bg-green-100 text-green-800';
      case 'Review':
        return 'bg-orange-100 text-orange-800';
      case 'Presentation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const todaysSchedule = scheduleData.filter(item => item.date === selectedDate);
  const weekSchedule = scheduleData.filter(item => {
    const itemDate = new Date(item.date);
    const today = new Date(selectedDate);
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return itemDate >= weekStart && itemDate <= weekEnd;
  });

  const ScheduleCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {getTypeIcon(item.type)}
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
              {item.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{item.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{item.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{item.trainer}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              {getMeetingTypeIcon(item.meetingType)}
              <span>{item.location}</span>
            </div>
            <span>Duration: {item.duration}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 mb-2">Topics to be covered:</p>
          <div className="flex flex-wrap gap-2">
            {item.topics.map((topic, index) => (
              <span key={index} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                {topic}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500">Status: {item.status}</span>
          {item.meetingType === 'Virtual' ? (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200">
              Join Meeting
            </button>
          ) : (
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            <Calendar size={20} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">View Training Schedule</h1>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
              <p className="text-2xl font-bold text-emerald-600">{todaysSchedule.length}</p>
            </div>
            <Calendar size={24} className="text-emerald-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-blue-600">{weekSchedule.length}</p>
            </div>
            <Clock size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Virtual Sessions</p>
              <p className="text-2xl font-bold text-purple-600">
                {scheduleData.filter(s => s.meetingType === 'Virtual').length}
              </p>
            </div>
            <Video size={24} className="text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Workshops</p>
              <p className="text-2xl font-bold text-orange-600">
                {scheduleData.filter(s => s.type === 'Workshop').length}
              </p>
            </div>
            <User size={24} className="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters and View Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option value="all">All Types</option>
                <option value="lecture">Lectures</option>
                <option value="workshop">Workshops</option>
                <option value="review">Reviews</option>
                <option value="presentation">Presentations</option>
              </select>
            </div>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                viewMode === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                viewMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Content */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {viewMode === 'day' ? `Schedule for ${selectedDate}` : 
           viewMode === 'week' ? 'This Week\'s Schedule' : 
           'This Month\'s Schedule'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(viewMode === 'day' ? todaysSchedule : 
            viewMode === 'week' ? weekSchedule : scheduleData).map((item) => (
            <ScheduleCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Weekly Calendar View */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Overview</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">{day}</div>
              <div className="h-20 bg-gray-50 rounded-lg p-2">
                {scheduleData
                  .filter(item => new Date(item.date).getDay() === index)
                  .slice(0, 2)
                  .map((item, idx) => (
                    <div key={idx} className="text-xs bg-emerald-100 text-emerald-800 rounded px-1 py-1 mb-1 truncate">
                      {item.title}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTrainingSchedule;