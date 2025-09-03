import React, { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  TrendingUp,
  Filter
} from 'lucide-react';

const MarkViewAttendance = () => {
  const [selectedDate, setSelectedDate] = useState('2025-01-15');
  const [viewMode, setViewMode] = useState('mark'); // mark, view

  const attendanceHistory = [
    {
      date: '2025-01-15',
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
      hoursWorked: 8,
      session: 'Java Fundamentals'
    },
    {
      date: '2025-01-14',
      status: 'Present',
      checkIn: '09:15 AM',
      checkOut: '05:00 PM',
      hoursWorked: 7.75,
      session: 'Spring Boot Workshop'
    },
    {
      date: '2025-01-13',
      status: 'Late',
      checkIn: '09:30 AM',
      checkOut: '05:00 PM',
      hoursWorked: 7.5,
      session: 'Database Design'
    },
    {
      date: '2025-01-12',
      status: 'Present',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      hoursWorked: 8.75,
      session: 'Code Review Session'
    },
    {
      date: '2025-01-11',
      status: 'Absent',
      checkIn: null,
      checkOut: null,
      hoursWorked: 0,
      session: 'Project Presentation'
    },
    {
      date: '2025-01-10',
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
      hoursWorked: 8,
      session: 'Java Advanced Topics'
    }
  ];

  const monthlyStats = {
    totalDays: 24,
    presentDays: 20,
    lateDays: 2,
    absentDays: 2,
    attendanceRate: 83.3,
    averageHours: 7.2
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'Absent':
        return <XCircle size={20} className="text-red-600" />;
      case 'Late':
        return <AlertCircle size={20} className="text-yellow-600" />;
      default:
        return <Clock size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const AttendanceRecord = ({ record }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon(record.status)}
          <div>
            <h3 className="font-semibold text-gray-900">{record.date}</h3>
            <p className="text-sm text-gray-600">{record.session}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(record.status)}`}>
          {record.status}
        </span>
      </div>
      
      {record.status !== 'Absent' && (
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Check In</p>
            <p className="font-medium text-gray-900">{record.checkIn}</p>
          </div>
          <div>
            <p className="text-gray-500">Check Out</p>
            <p className="font-medium text-gray-900">{record.checkOut}</p>
          </div>
          <div>
            <p className="text-gray-500">Hours</p>
            <p className="font-medium text-gray-900">{record.hoursWorked}h</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            <UserCheck size={20} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Mark/View Attendance</h1>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setViewMode('mark')}
            className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
              viewMode === 'mark' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            Mark Attendance
          </button>
          <button
            onClick={() => setViewMode('view')}
            className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
              viewMode === 'view' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            View History
          </button>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-emerald-600">{monthlyStats.attendanceRate}%</p>
            </div>
            <TrendingUp size={24} className="text-emerald-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present Days</p>
              <p className="text-2xl font-bold text-green-600">{monthlyStats.presentDays}</p>
            </div>
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late Days</p>
              <p className="text-2xl font-bold text-yellow-600">{monthlyStats.lateDays}</p>
            </div>
            <AlertCircle size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Absent Days</p>
              <p className="text-2xl font-bold text-red-600">{monthlyStats.absentDays}</p>
            </div>
            <XCircle size={24} className="text-red-600" />
          </div>
        </div>
      </div>

      {viewMode === 'mark' ? (
        /* Mark Attendance Section */
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Mark Today's Attendance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="time"
                  defaultValue="09:00"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck size={48} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to mark attendance?</h3>
              <p className="text-gray-600">Click the button below to mark your attendance for today</p>
            </div>
            
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto">
              <CheckCircle size={20} />
              <span>Mark Present</span>
            </button>
          </div>
        </div>
      ) : (
        /* View History Section */
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Calendar size={20} className="text-gray-400" />
                <input
                  type="month"
                  defaultValue="2025-01"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Attendance Chart */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray={`${monthlyStats.attendanceRate}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-emerald-600">{monthlyStats.attendanceRate}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Overall Rate</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Present</span>
                  <span className="text-sm font-medium text-green-600">{monthlyStats.presentDays} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Late</span>
                  <span className="text-sm font-medium text-yellow-600">{monthlyStats.lateDays} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Absent</span>
                  <span className="text-sm font-medium text-red-600">{monthlyStats.absentDays} days</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{monthlyStats.averageHours}h</div>
                <p className="text-sm text-gray-600">Average Daily Hours</p>
                <div className="mt-3">
                  <BarChart3 size={32} className="text-blue-600 mx-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Attendance History */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attendanceHistory.map((record, index) => (
                <AttendanceRecord key={index} record={record} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkViewAttendance;