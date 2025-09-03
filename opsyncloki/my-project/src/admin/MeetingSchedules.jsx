import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  Users, 
  Video, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Filter,
  Search
} from 'lucide-react';

const MeetingSchedules = () => {
  const [selectedDate, setSelectedDate] = useState('2025-01-15');
  const [viewMode, setViewMode] = useState('week'); // day, week, month
  const [showAddModal, setShowAddModal] = useState(false);

  const meetings = [
    {
      id: 1,
      title: 'Java Batch Progress Review',
      type: 'Progress Review',
      date: '2025-01-15',
      time: '10:00 AM - 11:00 AM',
      duration: '1 hour',
      attendees: ['John Smith', 'Admin Team'],
      batch: 'Java Batch 2025-A',
      location: 'Conference Room A',
      meetingType: 'In-Person',
      status: 'Scheduled',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Python Batch Assessment Planning',
      type: 'Assessment Planning',
      date: '2025-01-15',
      time: '02:00 PM - 03:00 PM',
      duration: '1 hour',
      attendees: ['Sarah Johnson', 'Assessment Team'],
      batch: 'Python Batch 2025-B',
      location: 'Online',
      meetingType: 'Virtual',
      status: 'Scheduled',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Weekly Trainers Meeting',
      type: 'Team Meeting',
      date: '2025-01-16',
      time: '09:00 AM - 10:30 AM',
      duration: '1.5 hours',
      attendees: ['All Trainers', 'Admin Team'],
      batch: 'All Batches',
      location: 'Main Conference Hall',
      meetingType: 'In-Person',
      status: 'Scheduled',
      priority: 'High'
    },
    {
      id: 4,
      title: 'Web Dev Batch Demo Day',
      type: 'Demo/Presentation',
      date: '2025-01-17',
      time: '03:00 PM - 05:00 PM',
      duration: '2 hours',
      attendees: ['Emily Chen', 'Students', 'Management'],
      batch: 'Web Dev Batch 2025-C',
      location: 'Auditorium',
      meetingType: 'In-Person',
      status: 'Scheduled',
      priority: 'High'
    },
    {
      id: 5,
      title: 'DevOps Infrastructure Discussion',
      type: 'Technical Discussion',
      date: '2025-01-18',
      time: '11:00 AM - 12:00 PM',
      duration: '1 hour',
      attendees: ['Mike Davis', 'IT Team'],
      batch: 'DevOps Batch 2025-A',
      location: 'Online',
      meetingType: 'Virtual',
      status: 'Scheduled',
      priority: 'Medium'
    },
    {
      id: 6,
      title: 'Monthly Performance Review',
      type: 'Performance Review',
      date: '2025-01-20',
      time: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      attendees: ['All Trainers', 'HR Team', 'Management'],
      batch: 'All Batches',
      location: 'Board Room',
      meetingType: 'In-Person',
      status: 'Scheduled',
      priority: 'High'
    }
  ];

  const upcomingMeetings = meetings.filter(meeting => new Date(meeting.date) >= new Date()).slice(0, 5);

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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const MeetingCard = ({ meeting }) => (
    <div className={`bg-white rounded-xl shadow-lg border-l-4 p-6 hover:shadow-xl transition-all duration-300 ${
      meeting.priority === 'High' ? 'border-l-red-500' : 
      meeting.priority === 'Medium' ? 'border-l-yellow-500' : 'border-l-green-500'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{meeting.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{meeting.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{meeting.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              {getMeetingTypeIcon(meeting.meetingType)}
              <span>{meeting.location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(meeting.priority)}`}>
              {meeting.priority} Priority
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(meeting.status)}`}>
              {meeting.status}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Eye size={16} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Edit size={16} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="font-medium text-gray-900">{meeting.type}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Batch:</span>
          <span className="font-medium text-gray-900">{meeting.batch}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium text-gray-900">{meeting.duration}</span>
        </div>
        <div className="mt-3">
          <span className="text-gray-600 text-xs">Attendees:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {meeting.attendees.map((attendee, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                {attendee}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const todaysMeetings = meetings.filter(meeting => meeting.date === selectedDate);
  const meetingStats = {
    total: meetings.length,
    today: todaysMeetings.length,
    thisWeek: meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      const today = new Date();
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      return meetingDate >= weekStart && meetingDate <= weekEnd;
    }).length,
    virtual: meetings.filter(meeting => meeting.meetingType === 'Virtual').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
            <CalendarDays size={20} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">View Meeting Schedules</h1>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus size={18} />
          <span>Schedule Meeting</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Meetings</p>
              <p className="text-2xl font-bold text-indigo-600">{meetingStats.total}</p>
            </div>
            <CalendarDays size={24} className="text-indigo-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-2xl font-bold text-green-600">{meetingStats.today}</p>
            </div>
            <Clock size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-blue-600">{meetingStats.thisWeek}</p>
            </div>
            <Calendar size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Virtual</p>
              <p className="text-2xl font-bold text-purple-600">{meetingStats.virtual}</p>
            </div>
            <Video size={24} className="text-purple-600" />
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
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">All Types</option>
                <option value="progress">Progress Review</option>
                <option value="assessment">Assessment Planning</option>
                <option value="team">Team Meeting</option>
                <option value="demo">Demo/Presentation</option>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meeting Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            {viewMode === 'day' ? `Meetings for ${selectedDate}` : 
             viewMode === 'week' ? 'This Week\'s Meetings' : 
             'This Month\'s Meetings'}
          </h2>
          {(viewMode === 'day' ? todaysMeetings : meetings).map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>

        {/* Upcoming Meetings Sidebar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h3>
          </div>
          <div className="p-6 space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">{meeting.title}</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getMeetingTypeIcon(meeting.meetingType)}
                    <span>{meeting.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(meeting.priority)}`}>
                    {meeting.priority}
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSchedules;