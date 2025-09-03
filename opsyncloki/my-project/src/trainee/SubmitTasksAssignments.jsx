import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter,
  Calendar,
  User,
  Paperclip
} from 'lucide-react';

const SubmitTasksAssignments = () => {
  const [activeTab, setActiveTab] = useState('pending'); // pending, submitted, overdue
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const tasksAndAssignments = [
    {
      id: 1,
      title: 'Java OOP Concepts Assignment',
      type: 'Assignment',
      description: 'Create a comprehensive project demonstrating inheritance, polymorphism, and encapsulation',
      assignedBy: 'John Smith',
      assignedDate: '2025-01-10',
      dueDate: '2025-01-22',
      maxMarks: 100,
      status: 'Pending',
      priority: 'High',
      attachments: ['assignment_guidelines.pdf', 'sample_code.java'],
      submissionFormat: 'ZIP file with source code and documentation'
    },
    {
      id: 2,
      title: 'Database Design Exercise',
      type: 'Task',
      description: 'Design and implement a normalized database schema for e-commerce system',
      assignedBy: 'John Smith',
      assignedDate: '2025-01-08',
      dueDate: '2025-01-18',
      maxMarks: 50,
      status: 'Overdue',
      priority: 'High',
      attachments: ['requirements.pdf'],
      submissionFormat: 'SQL file and ER diagram'
    },
    {
      id: 3,
      title: 'Spring Boot REST API Project',
      type: 'Assignment',
      description: 'Create a complete REST API with CRUD operations using Spring Boot',
      assignedBy: 'John Smith',
      assignedDate: '2025-01-12',
      dueDate: '2025-01-25',
      maxMarks: 150,
      status: 'Pending',
      priority: 'Medium',
      attachments: ['api_specs.json', 'postman_collection.json'],
      submissionFormat: 'GitHub repository link'
    },
    {
      id: 4,
      title: 'Unit Testing Practice',
      type: 'Task',
      description: 'Write comprehensive unit tests using JUnit for the calculator application',
      assignedBy: 'John Smith',
      assignedDate: '2025-01-05',
      dueDate: '2025-01-15',
      maxMarks: 25,
      status: 'Submitted',
      priority: 'Low',
      attachments: ['calculator_app.java'],
      submissionFormat: 'Test files and coverage report',
      submittedDate: '2025-01-14',
      submittedFiles: ['CalculatorTest.java', 'coverage_report.html'],
      grade: 23,
      feedback: 'Good test coverage. Consider adding edge case tests.'
    },
    {
      id: 5,
      title: 'Code Review Assignment',
      type: 'Task',
      description: 'Review and provide feedback on peer code submissions',
      assignedBy: 'John Smith',
      assignedDate: '2025-01-01',
      dueDate: '2025-01-10',
      maxMarks: 30,
      status: 'Submitted',
      priority: 'Medium',
      attachments: ['code_samples.zip'],
      submissionFormat: 'Review document with suggestions',
      submittedDate: '2025-01-09',
      submittedFiles: ['code_review.pdf'],
      grade: 28,
      feedback: 'Excellent analysis and constructive feedback provided.'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock size={16} className="text-orange-600" />;
      case 'Submitted':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Overdue':
        return <AlertCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Submitted':
        return 'bg-green-100 text-green-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Assignment':
        return 'bg-blue-100 text-blue-800';
      case 'Task':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = tasksAndAssignments.filter(item => {
    if (activeTab === 'pending') return item.status === 'Pending';
    if (activeTab === 'submitted') return item.status === 'Submitted';
    if (activeTab === 'overdue') return item.status === 'Overdue';
    return true;
  });

  const ItemCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
              {item.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{item.assignedBy}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>Due: {item.dueDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText size={14} />
              <span>{item.maxMarks} marks</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {getStatusIcon(item.status)}
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(item.priority)}`}>
              {item.priority} Priority
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {item.attachments.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Attachments:</p>
            <div className="flex flex-wrap gap-2">
              {item.attachments.map((file, index) => (
                <span key={index} className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  <Paperclip size={12} />
                  <span>{file}</span>
                  <Download size={12} className="cursor-pointer hover:text-blue-600" />
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-600">
          <p><strong>Submission Format:</strong> {item.submissionFormat}</p>
        </div>

        {item.status === 'Submitted' && (
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-green-800">Submitted on: {item.submittedDate}</span>
              {item.grade && (
                <span className="text-sm font-bold text-green-800">{item.grade}/{item.maxMarks}</span>
              )}
            </div>
            {item.submittedFiles && (
              <div className="mb-2">
                <p className="text-xs text-green-700 mb-1">Submitted files:</p>
                <div className="flex flex-wrap gap-1">
                  {item.submittedFiles.map((file, index) => (
                    <span key={index} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                      {file}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {item.feedback && (
              <p className="text-xs text-green-700"><strong>Feedback:</strong> {item.feedback}</p>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500">Assigned: {item.assignedDate}</span>
          {item.status === 'Pending' || item.status === 'Overdue' ? (
            <button 
              onClick={() => {
                setSelectedItem(item);
                setShowSubmitModal(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200"
            >
              Submit
            </button>
          ) : (
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200">
              View Submission
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
            <FileText size={20} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Submit Tasks and Assignments</h1>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-blue-600">{tasksAndAssignments.length}</p>
            </div>
            <FileText size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">
                {tasksAndAssignments.filter(item => item.status === 'Pending').length}
              </p>
            </div>
            <Clock size={24} className="text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Submitted</p>
              <p className="text-2xl font-bold text-green-600">
                {tasksAndAssignments.filter(item => item.status === 'Submitted').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {tasksAndAssignments.filter(item => item.status === 'Overdue').length}
              </p>
            </div>
            <AlertCircle size={24} className="text-red-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-4 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'pending'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pending ({tasksAndAssignments.filter(item => item.status === 'Pending').length})
          </button>
          <button
            onClick={() => setActiveTab('submitted')}
            className={`px-6 py-4 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'submitted'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Submitted ({tasksAndAssignments.filter(item => item.status === 'Submitted').length})
          </button>
          <button
            onClick={() => setActiveTab('overdue')}
            className={`px-6 py-4 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'overdue'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overdue ({tasksAndAssignments.filter(item => item.status === 'Overdue').length})
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks and assignments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All Types</option>
                <option value="assignment">Assignments</option>
                <option value="task">Tasks</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Submit: {selectedItem.title}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Submission Notes</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add any notes about your submission..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload files or drag and drop</p>
                  <p className="text-xs text-gray-500">Required format: {selectedItem.submissionFormat}</p>
                  <input type="file" multiple className="hidden" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Assignment Details:</h4>
                <p className="text-sm text-gray-600 mb-2">{selectedItem.description}</p>
                <p className="text-sm text-gray-600">Due Date: {selectedItem.dueDate}</p>
                <p className="text-sm text-gray-600">Max Marks: {selectedItem.maxMarks}</p>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Submit Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitTasksAssignments;