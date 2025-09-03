import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Upload,
  Download
} from 'lucide-react';

const AssignAssignments = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const assignments = [
    {
      id: 1,
      title: 'Java OOP Concepts Assignment',
      description: 'Create a comprehensive project demonstrating inheritance, polymorphism, and encapsulation',
      type: 'Project',
      assignedTo: 'All Students',
      dueDate: '2025-01-22',
      maxMarks: 100,
      submittedBy: 15,
      totalStudents: 28,
      status: 'Active',
      createdDate: '2025-01-15',
      attachments: ['assignment_guidelines.pdf', 'sample_code.java']
    },
    {
      id: 2,
      title: 'Spring Boot Microservices',
      description: 'Build a microservices architecture using Spring Boot with proper documentation',
      type: 'Project',
      assignedTo: 'Advanced Group',
      dueDate: '2025-01-28',
      maxMarks: 150,
      submittedBy: 8,
      totalStudents: 15,
      status: 'Active',
      createdDate: '2025-01-12',
      attachments: ['requirements.pdf', 'api_specs.json']
    },
    {
      id: 3,
      title: 'Database Normalization Quiz',
      description: 'Online quiz covering 1NF, 2NF, 3NF, and BCNF with practical examples',
      type: 'Quiz',
      assignedTo: 'All Students',
      dueDate: '2025-01-18',
      maxMarks: 50,
      submittedBy: 28,
      totalStudents: 28,
      status: 'Completed',
      createdDate: '2025-01-10',
      attachments: []
    },
    {
      id: 4,
      title: 'Algorithm Analysis Report',
      description: 'Analyze time and space complexity of sorting algorithms with implementation',
      type: 'Report',
      assignedTo: 'Intermediate Group',
      dueDate: '2025-01-25',
      maxMarks: 75,
      submittedBy: 5,
      totalStudents: 12,
      status: 'Active',
      createdDate: '2025-01-14',
      attachments: ['template.docx']
    },
    {
      id: 5,
      title: 'Code Review Exercise',
      description: 'Review provided code samples and suggest improvements with justification',
      type: 'Exercise',
      assignedTo: 'All Students',
      dueDate: '2025-01-16',
      maxMarks: 25,
      submittedBy: 20,
      totalStudents: 28,
      status: 'Overdue',
      createdDate: '2025-01-08',
      attachments: ['code_samples.zip', 'review_template.pdf']
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <Clock size={16} className="text-blue-600" />;
      case 'Completed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Overdue':
        return <AlertCircle size={16} className="text-red-600" />;
      default:
        return <XCircle size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Project':
        return 'bg-purple-100 text-purple-800';
      case 'Quiz':
        return 'bg-green-100 text-green-800';
      case 'Report':
        return 'bg-orange-100 text-orange-800';
      case 'Exercise':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (selectedFilter === 'all') return true;
    return assignment.status.toLowerCase() === selectedFilter;
  });

  const AssignmentCard = ({ assignment }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(assignment.type)}`}>
              {assignment.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{assignment.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{assignment.assignedTo}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>Due: {assignment.dueDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText size={14} />
              <span>Max: {assignment.maxMarks} marks</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {getStatusIcon(assignment.status)}
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(assignment.status)}`}>
                {assignment.status}
              </span>
            </div>
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
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Submission Progress</span>
          <span className="font-medium">{assignment.submittedBy}/{assignment.totalStudents} submitted</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
            style={{ width: `${(assignment.submittedBy / assignment.totalStudents) * 100}%` }}
          />
        </div>
        
        {assignment.attachments.length > 0 && (
          <div className="border-t pt-3">
            <p className="text-xs text-gray-500 mb-2">Attachments:</p>
            <div className="flex flex-wrap gap-2">
              {assignment.attachments.map((file, index) => (
                <span key={index} className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  <FileText size={12} />
                  <span>{file}</span>
                  <Download size={12} className="cursor-pointer hover:text-blue-600" />
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-gray-500">Created: {assignment.createdDate}</span>
          <span className="text-sm font-medium text-green-600">
            {Math.round((assignment.submittedBy / assignment.totalStudents) * 100)}% Submitted
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <FileText size={20} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Assign Assignments</h1>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus size={18} />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
              <p className="text-2xl font-bold text-green-600">{assignments.length}</p>
            </div>
            <FileText size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-blue-600">
                {assignments.filter(a => a.status === 'Active').length}
              </p>
            </div>
            <Clock size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {assignments.filter(a => a.status === 'Overdue').length}
              </p>
            </div>
            <AlertCircle size={24} className="text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-purple-600">
                {assignments.filter(a => a.status === 'Completed').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-purple-600" />
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
              placeholder="Search assignments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Assignments</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Assignment</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter assignment title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter assignment description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="project">Project</option>
                    <option value="quiz">Quiz</option>
                    <option value="report">Report</option>
                    <option value="exercise">Exercise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Marks</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="all">All Students</option>
                    <option value="advanced">Advanced Group</option>
                    <option value="intermediate">Intermediate Group</option>
                    <option value="beginner">Beginner Group</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
                  <input type="file" multiple className="hidden" />
                </div>
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
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignAssignments;