import React, { useState } from 'react';
import { 
  Video, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  MapPin,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter
} from 'lucide-react';

const ScheduleMeetings = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const meetings = [
    {
      id: 1,
      title: 'Java Batch Weekly Review',
      type: 'Review Meeting',
      date: '2025-01-16',
      time: '10:00 AM - 11:00 AM',
      duration: '1 hour',
      attendees: ['All Java Batch Students'],
      location: 'Conference Room A',
      meetingType: 'In-Person',
      status: 'Scheduled',
      description: 'Weekly progress review and Q&A session for Java batch students',
      agenda: ['Progress Review', 'Doubt Clearing', 'Next Week Planning']
    },
    {
      id: 2,
      title: 'One-on-One with Alex Kumar',
      type: 'Individual Meeting',
      date: '2025-01-16',
      time: '02:00 PM - 02:30 PM',
      duration: '30 minutes',
      attendees: ['Alex Kumar'],
      location: 'Google Meet',
      meetingType: 'Virtual',
      status: 'Scheduled',
      description: 'Individual mentoring session to discuss project progress',
      agenda: ['Project Discussion', 'Career Guidance', 'Skill Assessment']
    },
    {
      id: 3,
      title: 'Spring Boot Workshop',
      type: 'Workshop',
      date: '2025-01-17',
      time: '09:00 AM - 12:00 PM',
      duration: '3 hours',
      attendees: ['Advanced Group Students'],
      location: 'Lab 1',
      meetingType: 'In-Person',
      status: 'Scheduled',
      description: 'Hands-on workshop on Spring Boot microservices development',
      agenda: ['Spring Boot Basics', 'Microservices Architecture', 'Hands-on Practice']
    },
    {
      id: 4,
      title: 'Parent-Teacher Meeting',
      type: 'Parent Meeting',
      date: '2025-01-18',
      time: '04:00 PM - 05:00 PM',
      duration: '1 hour',
      attendees: ['Parents of Java Batch'],
      location: 'Main Hall',
      meetingType: 'In-Person',
      status: 'Scheduled',
      description: 'Monthly parent-teacher meeting to discuss student progress',
      agenda: ['Progress Report', 'Feedback Session', 'Future Plans']
    },
    {
      id: 5,
      title: 'Code Review Session',
      type: 'Code Review',
      date: '2025-01-15',
      time: '03:00 PM - 04:00 PM',
      duration: '1 hour',
      attendees: ['Project Team A'],
      location: 'Zoom',
      meetingType: 'Virtual',
      status: 'Completed',
      description: 'Code review session for final project submissions',
      agenda: ['Code Review', 'Best Practices', 'Improvement Suggestions']
    }
  ];

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

  const getTypeColor = (type) => {
    switch (type) {
      case 'Review Meeting':
        return 'bg-purple-100 text-purple-800';
      case 'Individual Meeting':
        return 'bg-green-100 text-green-800';
      case 'Workshop':
        return 'bg-orange-100 text-orange-800';
      case 'Parent Meeting':
        return 'bg-blue-100 text-blue-800';
      case 'Code Review':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMeetings = meetings.filter(meeting => {
    if (selectedFilter === 'all') return true;
    return meeting.status.toLowerCase() === selectedFilter;
  });

  const upcomingMeetings = meetings.filter(meeting => 
    new Date(meeting.date) >= new Date() && meeting.status === 'Scheduled'
  ).slice(0, 3);

  const MeetingCard = ({ meeting }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(meeting.type)}`}>
              {meeting.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{meeting.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
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
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(meeting.status)}`}>
              {meeting.status}
            </span>
            <span className="text-xs text-gray-500">Duration: {meeting.duration}</span>
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
      
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">Attendees:</p>
          <div className="flex flex-wrap gap-1">
            {meeting.attendees.map((attendee, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                {attendee}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Agenda:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            {meeting.agenda.map((item, index) => (
              <li key={index} className="flex items-center space-x-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Video size={20} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule and Conduct Meets</h1>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
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
              <p className="text-2xl font-bold text-blue-600">{meetings.length}</p>
            </div>
            <Video size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-green-600">
                {meetings.filter(m => m.status === 'Scheduled').length}
              </p>
            </div>
            <Calendar size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-2xl font-bold text-purple-600">
                {meetings.filter(m => m.date === '2025-01-16').length}
              </p>
            </div>
            <Clock size={24} className="text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Virtual</p>
              <p className="text-2xl font-bold text-orange-600">
                {meetings.filter(m => m.meetingType === 'Virtual').length}
              </p>
            </div>
            <Video size={24} className="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search meetings..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Meetings</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meetings List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">All Meetings</h2>
          {filteredMeetings.map((meeting) => (
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
                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(meeting.type)}`}>
                    {meeting.type}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Meeting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule New Meeting</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter meeting title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter meeting description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="review">Review Meeting</option>
                    <option value="individual">Individual Meeting</option>
                    <option value="workshop">Workshop</option>
                    <option value="parent">Parent Meeting</option>
                    <option value="code-review">Code Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Mode</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="virtual">Virtual</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    placeholder="60"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Conference Room A / Zoom Link"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
                <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24">
                  <option value="all-students">All Students</option>
                  <option value="advanced-group">Advanced Group</option>
                  <option value="beginner-group">Beginner Group</option>
                  <option value="alex-kumar">Alex Kumar</option>
                  <option value="priya-sharma">Priya Sharma</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Schedule Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleMeetings;