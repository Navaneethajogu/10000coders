import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Filter,
  Search,
  Eye
} from 'lucide-react';

const AttendanceRecords = () => {
  const [selectedDate, setSelectedDate] = useState('2025-01-15');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [viewMode, setViewMode] = useState('daily'); // daily, weekly, monthly

  const attendanceData = [
    {
      id: 1,
      studentName: 'Alex Kumar',
      batch: 'Java Batch 2025-A',
      trainer: 'John Smith',
      date: '2025-01-15',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
      status: 'Present',
      hoursWorked: 8,
      image: 'https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      batch: 'Python Batch 2025-B',
      trainer: 'Sarah Johnson',
      date: '2025-01-15',
      checkIn: '09:15 AM',
      checkOut: '05:00 PM',
      status: 'Late',
      hoursWorked: 7.75,
      image: 'https://images.pexels.com/photos/2182976/pexels-photo-2182976.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      studentName: 'David Lee',
      batch: 'Web Dev Batch 2025-C',
      trainer: 'Emily Chen',
      date: '2025-01-15',
      checkIn: null,
      checkOut: null,
      status: 'Absent',
      hoursWorked: 0,
      image: 'https://images.pexels.com/photos/2182977/pexels-photo-2182977.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 4,
      studentName: 'Maria Garcia',
      batch: 'DevOps Batch 2025-A',
      trainer: 'Mike Davis',
      date: '2025-01-15',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      status: 'Present',
      hoursWorked: 8.75,
      image: 'https://images.pexels.com/photos/2182978/pexels-photo-2182978.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 5,
      studentName: 'James Wilson',
      batch: 'Testing Batch 2025-A',
      trainer: 'Robert Wilson',
      date: '2025-01-15',
      checkIn: '09:30 AM',
      checkOut: '04:30 PM',
      status: 'Half Day',
      hoursWorked: 7,
      image: 'https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const batchStats = [
    { batch: 'Java Batch 2025-A', present: 23, total: 25, rate: 92 },
    { batch: 'Python Batch 2025-B', present: 28, total: 30, rate: 93 },
    { batch: 'Web Dev Batch 2025-C', present: 26, total: 28, rate: 93 },
    { batch: 'DevOps Batch 2025-A', present: 18, total: 20, rate: 90 },
    { batch: 'Testing Batch 2025-A', present: 20, total: 22, rate: 91 },
    { batch: 'Power BI Batch 2025-B', present: 17, total: 18, rate: 94 }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Absent':
        return <XCircle size={16} className="text-red-600" />;
      case 'Late':
        return <AlertCircle size={16} className="text-yellow-600" />;
      case 'Half Day':
        return <Clock size={16} className="text-orange-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
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
      case 'Half Day':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAttendance = attendanceData.filter(record => {
    const matchesBatch = selectedBatch === 'all' || record.batch === selectedBatch;
    return matchesBatch;
  });

  const overallStats = {
    totalStudents: attendanceData.length,
    present: attendanceData.filter(r => r.status === 'Present').length,
    absent: attendanceData.filter(r => r.status === 'Absent').length,
    late: attendanceData.filter(r => r.status === 'Late').length,
    halfDay: attendanceData.filter(r => r.status === 'Half Day').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <Calendar size={20} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Monitor Attendance Records</h1>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalStudents}</p>
            </div>
            <Users size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-green-600">{overallStats.present}</p>
            </div>
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{overallStats.absent}</p>
            </div>
            <XCircle size={24} className="text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-2xl font-bold text-yellow-600">{overallStats.late}</p>
            </div>
            <AlertCircle size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Half Day</p>
              <p className="text-2xl font-bold text-orange-600">{overallStats.halfDay}</p>
            </div>
            <Clock size={24} className="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Calendar size={20} className="text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Batches</option>
              <option value="Java Batch 2025-A">Java Batch 2025-A</option>
              <option value="Python Batch 2025-B">Python Batch 2025-B</option>
              <option value="Web Dev Batch 2025-C">Web Dev Batch 2025-C</option>
              <option value="DevOps Batch 2025-A">DevOps Batch 2025-A</option>
              <option value="Testing Batch 2025-A">Testing Batch 2025-A</option>
            </select>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                viewMode === 'daily' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                viewMode === 'weekly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                viewMode === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Records */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Daily Attendance Records</h3>
            <p className="text-sm text-gray-600">Date: {selectedDate}</p>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredAttendance.map((record) => (
              <div key={record.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={record.image}
                      alt={record.studentName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{record.studentName}</h4>
                      <p className="text-sm text-gray-600">{record.batch}</p>
                      <p className="text-xs text-gray-500">Trainer: {record.trainer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      {getStatusIcon(record.status)}
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                    {record.checkIn && (
                      <div className="text-xs text-gray-600">
                        <p>In: {record.checkIn}</p>
                        <p>Out: {record.checkOut}</p>
                        <p>Hours: {record.hoursWorked}h</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Batch-wise Stats */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Batch-wise Attendance</h3>
          </div>
          <div className="p-6 space-y-4">
            {batchStats.map((batch, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{batch.batch}</span>
                  <span className="text-sm text-gray-600">{batch.present}/{batch.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      batch.rate >= 95 ? 'bg-green-500' : 
                      batch.rate >= 90 ? 'bg-blue-500' : 
                      batch.rate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${batch.rate}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-bold ${
                    batch.rate >= 95 ? 'text-green-600' : 
                    batch.rate >= 90 ? 'text-blue-600' : 
                    batch.rate >= 80 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {batch.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecords;