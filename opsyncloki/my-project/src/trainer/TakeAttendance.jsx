import React, { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Save,
  Download,
  Users
} from 'lucide-react';

const TakeAttendance = () => {
  const [selectedDate, setSelectedDate] = useState('2025-01-15');
  const [selectedBatch, setSelectedBatch] = useState('java-batch-2025-a');
  const [attendanceData, setAttendanceData] = useState({});

  const batches = [
    { id: 'java-batch-2025-a', name: 'Java Batch 2025-A', students: 28 },
    { id: 'python-batch-2025-b', name: 'Python Batch 2025-B', students: 30 },
    { id: 'web-dev-batch-2025-c', name: 'Web Dev Batch 2025-C', students: 25 }
  ];

  const students = [
    {
      id: 1,
      name: 'Alex Kumar',
      rollNumber: 'JB001',
      email: 'alex.kumar@email.com',
      image: 'https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=150',
      previousAttendance: 'Present'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rollNumber: 'JB002',
      email: 'priya.sharma@email.com',
      image: 'https://images.pexels.com/photos/2182976/pexels-photo-2182976.jpeg?auto=compress&cs=tinysrgb&w=150',
      previousAttendance: 'Present'
    },
    {
      id: 3,
      name: 'David Lee',
      rollNumber: 'JB003',
      email: 'david.lee@email.com',
      image: 'https://images.pexels.com/photos/2182977/pexels-photo-2182977.jpeg?auto=compress&cs=tinysrgb&w=150',
      previousAttendance: 'Absent'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      rollNumber: 'JB004',
      email: 'maria.garcia@email.com',
      image: 'https://images.pexels.com/photos/2182978/pexels-photo-2182978.jpeg?auto=compress&cs=tinysrgb&w=150',
      previousAttendance: 'Late'
    },
    {
      id: 5,
      name: 'James Wilson',
      rollNumber: 'JB005',
      email: 'james.wilson@email.com',
      image: 'https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg?auto=compress&cs=tinysrgb&w=150',
      previousAttendance: 'Present'
    },
    {
      id: 6,
      name: 'Sarah Johnson',
      rollNumber: 'JB006',
      email: 'sarah.johnson@email.com',
      image: 'https://images.pexels.com/photos/2182980/pexels-photo-2182980.jpeg?auto=compress&cs=tinysrgb&w=150',
      previousAttendance: 'Present'
    }
  ];

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getAttendanceStats = () => {
    const present = Object.values(attendanceData).filter(status => status === 'present').length;
    const absent = Object.values(attendanceData).filter(status => status === 'absent').length;
    const late = Object.values(attendanceData).filter(status => status === 'late').length;
    const total = students.length;
    const marked = Object.keys(attendanceData).length;
    
    return { present, absent, late, total, marked };
  };

  const stats = getAttendanceStats();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'absent':
        return <XCircle size={20} className="text-red-600" />;
      case 'late':
        return <AlertCircle size={20} className="text-yellow-600" />;
      default:
        return <Clock size={20} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 border-green-300';
      case 'absent':
        return 'bg-red-100 border-red-300';
      case 'late':
        return 'bg-yellow-100 border-yellow-300';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const StudentCard = ({ student }) => {
    const currentStatus = attendanceData[student.id];
    
    return (
      <div className={`bg-white rounded-xl shadow-lg border-2 p-4 transition-all duration-300 ${getStatusColor(currentStatus)}`}>
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={student.image}
            alt={student.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-600">{student.rollNumber}</p>
            <p className="text-xs text-gray-500">{student.email}</p>
            <p className="text-xs text-gray-500">Previous: {student.previousAttendance}</p>
          </div>
          <div className="text-right">
            {getStatusIcon(currentStatus)}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleAttendanceChange(student.id, 'present')}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              currentStatus === 'present' 
                ? 'bg-green-600 text-white' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Present
          </button>
          <button
            onClick={() => handleAttendanceChange(student.id, 'late')}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              currentStatus === 'late' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            Late
          </button>
          <button
            onClick={() => handleAttendanceChange(student.id, 'absent')}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              currentStatus === 'absent' 
                ? 'bg-red-600 text-white' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            Absent
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <UserCheck size={20} className="text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Take Attendance</h1>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Save size={18} />
            <span>Save Attendance</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name} ({batch.students} students)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="time"
                defaultValue="09:00"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users size={24} className="text-gray-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
            </div>
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
            </div>
            <XCircle size={24} className="text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
            </div>
            <AlertCircle size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Marked</p>
              <p className="text-2xl font-bold text-purple-600">{stats.marked}/{stats.total}</p>
            </div>
            <UserCheck size={24} className="text-purple-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => {
              const newData = {};
              students.forEach(student => {
                newData[student.id] = 'present';
              });
              setAttendanceData(newData);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Mark All Present
          </button>
          <button 
            onClick={() => {
              const newData = {};
              students.forEach(student => {
                newData[student.id] = 'absent';
              });
              setAttendanceData(newData);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Mark All Absent
          </button>
          <button 
            onClick={() => setAttendanceData({})}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Students Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Students ({students.length})</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </div>

      {/* Summary */}
      {stats.marked > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              <p className="text-sm text-gray-600">Present ({Math.round((stats.present / stats.total) * 100)}%)</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
              <p className="text-sm text-gray-600">Late ({Math.round((stats.late / stats.total) * 100)}%)</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              <p className="text-sm text-gray-600">Absent ({Math.round((stats.absent / stats.total) * 100)}%)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeAttendance;