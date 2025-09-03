import React, { useState } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  MapPin, 
  User,
  Users,
  Play,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';

const JoinMeets = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const meetings = [
    {
      id: 1,
      title: 'Java Batch Weekly Review',
      type: 'Review Meeting',
      trainer: 'John Smith',
      date: '2025-01-16',
      time: '10:00 AM - 11:00 AM',
      duration: '1 hour',
      location: 'Conference Room A',
      meetingType: 'In-Person',
      status: 'Scheduled',
      description: 'Weekly progress review and Q&A session for Java batch students',
      attendees: 28,
      meetingLink: null,
      agenda: ['Progress Review', 'Doubt Clearing', 'Next Week Planning']
    },
    {
      id: 2,
      title: 'Spring Boot Workshop',
      type: 'Workshop',
      trainer: 'John Smith',
      date: '2025-01-16',
      time: '02:00 PM - 05:00 PM',
      duration: '3 hours',
      location: 'Google Meet',
      meetingType: 'Virtual',
      status: 'Live',
      description: 'Hands-on workshop on building REST APIs with Spring Boot',
      attendees: 28,
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      agenda: ['Spring Boot Setup', 'REST Controllers', 'Database Integration']
    },
    {
      id: 3,
      title: 'One-on-One Mentoring',
      type: 'Individual Meeting',
      trainer: 'John Smith',
      date: '2025-01-17',
      time: '11:00 AM - 11:30 AM',
      duration: '30 minutes',
      location: 'Zoom',
      meetingType: 'Virtual',
      status: 'Scheduled',
      description: 'Individual mentoring session to discuss project progress',
      attendees: 1,
      meetingLink: 'https://zoom.us/j/123456789',
      agenda: ['Project Discussion', 'Career Guidance', 'Skill Assessment']
    },
    {
      id: 4,
      title: 'Code Review Session',
      type: 'Code Review',
      trainer: 'John Smith',
      date: '2025-01-18',
      time: '03:00 PM - 04:00 PM',
      duration: '1 hour',
      location: 'Microsoft Teams',
      meetingType: 'Virtual',
      status: 'Scheduled',
      description: 'Review of submitted assignments and best practices',
      attendees: 15,
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      agenda: ['Code Quality', 'Best Practices', 'Improvement Suggestions']
    },
    {
      id: 5,
      title: 'Project Presentation',
      type: 'Presentation',
      trainer: 'John Smith',
      date: '2025-01-15',
      time: '03:00 PM - 05:00 PM',
      duration: '2 hours',
      location: 'Auditorium',
      meetingType: 'In-Person',
      status: 'Completed',
      description: 'Final project presentations and peer reviews',
      attendees: 28,
      meetingLink: null,
      agenda: ['Project Demo', 'Q&A Session', 'Peer Feedback']
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
      case 'Live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Workshop':
        return 'bg-purple-100 text-purple-800';
      case 'Review Meeting':
        return 'bg-blue-100 text-blue-800';
      case 'Individual Meeting':
        return 'bg-green-100 text-green-800';
      case 'Code Review':
        return 'bg-orange-100 text-orange-800';
      case 'Presentation':
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
    meeting.status === 'Scheduled' || meeting.status === 'Live'
  ).slice(0, 3);

  const MeetingCard = ({ meeting }) => (
    <div className={`bg-white rounded-xl shadow-lg border-2 p-6 hover:shadow-xl transition-all duration-300 ${
      meeting.status === 'Live' ? 'border-green-300 bg-green-50' : 'border-gray-200'
    }`}>
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
              <User size={14} />
              <span>{meeting.trainer}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              {getMeetingTypeIcon(meeting.meetingType)}
              <span>{meeting.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={14} />
              <span>{meeting.attendees} attendees</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(meeting.status)}`}>
              {meeting.status}
            </span>
            {meeting.status === 'Live' && (
              <span className="flex items-center space-x-1 text-xs text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Now</span>
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 mb-2">Agenda:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            {meeting.agenda.map((item, index) => (
              <li key={index} className="flex items-center space-x-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500">Duration: {meeting.duration}</span>
          {meeting.status === 'Live' ? (
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
              <Play size={16} />
              <span>Join Now</span>
            </button>
          ) : meeting.status === 'Scheduled' && meeting.meetingType === 'Virtual' ? (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
              <ExternalLink size={16} />
              <span>Join Meeting</span>
            </button>
          ) : meeting.status === 'Scheduled' ? (
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              View Details
            </button>
          ) : (
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              View Recording
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
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Video size={20} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join Meets</h1>
        </div>
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
              <p className="text-sm font-medium text-gray-600">Live Now</p>
              <p className="text-2xl font-bold text-green-600">
                {meetings.filter(m => m.status === 'Live').length}
              </p>
            </div>
            <Play size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-purple-600">
                {meetings.filter(m => m.status === 'Scheduled').length}
              </p>
            </div>
            <Calendar size={24} className="text-purple-600" />
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
              <option value="live">Live Now</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
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
            <h3 className="text-lg font-semibold text-gray-900">Quick Join</h3>
          </div>
          <div className="p-6 space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className={`border rounded-lg p-4 transition-all duration-200 ${
                meeting.status === 'Live' ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:shadow-md'
              }`}>
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
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(meeting.status)}`}>
                    {meeting.status}
                  </span>
                  {meeting.status === 'Live' ? (
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200">
                      Join Now
                    </button>
                  ) : (
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                      View
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinMeets;