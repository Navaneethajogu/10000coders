import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Award, 
  Target,
  Calendar,
  Filter,
  Download,
  Eye
} from 'lucide-react';

const PerformanceAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const performanceData = [
    {
      id: 1,
      trainer: 'John Smith',
      domain: 'Java',
      studentsCount: 25,
      completionRate: 92,
      averageScore: 87,
      studentSatisfaction: 4.5,
      attendanceRate: 94,
      trend: 'up',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      trainer: 'Sarah Johnson',
      domain: 'Python',
      studentsCount: 30,
      completionRate: 88,
      averageScore: 85,
      studentSatisfaction: 4.3,
      attendanceRate: 91,
      trend: 'up',
      image: 'https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      trainer: 'Emily Chen',
      domain: 'Web Development',
      studentsCount: 28,
      completionRate: 95,
      averageScore: 89,
      studentSatisfaction: 4.7,
      attendanceRate: 96,
      trend: 'up',
      image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 4,
      trainer: 'Robert Wilson',
      domain: 'Testing',
      studentsCount: 22,
      completionRate: 85,
      averageScore: 82,
      studentSatisfaction: 4.4,
      attendanceRate: 89,
      trend: 'down',
      image: 'https://images.pexels.com/photos/2182974/pexels-photo-2182974.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 5,
      trainer: 'Mike Davis',
      domain: 'DevOps',
      studentsCount: 20,
      completionRate: 90,
      averageScore: 86,
      studentSatisfaction: 4.6,
      attendanceRate: 93,
      trend: 'stable',
      image: 'https://images.pexels.com/photos/2182972/pexels-photo-2182972.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const batchPerformance = [
    {
      batch: 'Java Batch 2025-A',
      trainer: 'John Smith',
      students: 25,
      progress: 85,
      averageScore: 87,
      completionRate: 92,
      status: 'On Track'
    },
    {
      batch: 'Python Batch 2025-B',
      trainer: 'Sarah Johnson',
      students: 30,
      progress: 72,
      averageScore: 85,
      completionRate: 88,
      status: 'On Track'
    },
    {
      batch: 'Web Dev Batch 2025-C',
      trainer: 'Emily Chen',
      students: 28,
      progress: 90,
      averageScore: 89,
      completionRate: 95,
      status: 'Excellent'
    },
    {
      batch: 'Testing Batch 2025-A',
      trainer: 'Robert Wilson',
      students: 22,
      progress: 68,
      averageScore: 82,
      completionRate: 85,
      status: 'Needs Attention'
    },
    {
      batch: 'DevOps Batch 2025-A',
      trainer: 'Mike Davis',
      students: 20,
      progress: 75,
      averageScore: 86,
      completionRate: 90,
      status: 'On Track'
    }
  ];

  const overallStats = {
    totalStudents: performanceData.reduce((sum, trainer) => sum + trainer.studentsCount, 0),
    averageCompletion: Math.round(performanceData.reduce((sum, trainer) => sum + trainer.completionRate, 0) / performanceData.length),
    averageScore: Math.round(performanceData.reduce((sum, trainer) => sum + trainer.averageScore, 0) / performanceData.length),
    averageSatisfaction: (performanceData.reduce((sum, trainer) => sum + trainer.studentSatisfaction, 0) / performanceData.length).toFixed(1)
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-green-600" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent':
        return 'bg-green-100 text-green-800';
      case 'On Track':
        return 'bg-blue-100 text-blue-800';
      case 'Needs Attention':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const PerformanceCard = ({ trainer }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={trainer.image}
            alt={trainer.trainer}
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{trainer.trainer}</h3>
            <p className="text-sm text-gray-600">{trainer.domain}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {getTrendIcon(trainer.trend)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600">{trainer.studentsCount}</p>
          <p className="text-xs text-gray-500">Students</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-600">{trainer.completionRate}%</p>
          <p className="text-xs text-gray-500">Completion</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-purple-600">{trainer.averageScore}</p>
          <p className="text-xs text-gray-500">Avg Score</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-yellow-600">{trainer.studentSatisfaction}</p>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Attendance Rate</span>
          <span className="font-medium">{trainer.attendanceRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
            style={{ width: `${trainer.attendanceRate}%` }}
          />
        </div>
      </div>

      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
        <Eye size={16} />
        <span>View Details</span>
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <BarChart3 size={20} className="text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Analyze Performance</h1>
        </div>
        <div className="flex space-x-3">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-blue-600">{overallStats.totalStudents}</p>
            </div>
            <Users size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Completion</p>
              <p className="text-2xl font-bold text-green-600">{overallStats.averageCompletion}%</p>
            </div>
            <Target size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-purple-600">{overallStats.averageScore}</p>
            </div>
            <BarChart3 size={24} className="text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-yellow-600">{overallStats.averageSatisfaction}</p>
            </div>
            <Award size={24} className="text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Calendar size={20} className="text-gray-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="overall">Overall Performance</option>
              <option value="completion">Completion Rate</option>
              <option value="scores">Average Scores</option>
              <option value="satisfaction">Student Satisfaction</option>
              <option value="attendance">Attendance Rate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trainer Performance Cards */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Trainer Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {performanceData.map((trainer) => (
            <PerformanceCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>

      {/* Batch Performance Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Batch Performance Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batchPerformance.map((batch, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{batch.batch}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{batch.trainer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{batch.students}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${batch.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">{batch.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{batch.averageScore}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{batch.completionRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(batch.status)}`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Report</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;