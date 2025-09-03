import React, { useState } from 'react';
import { 
  ClipboardList, 
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
  Eye
} from 'lucide-react';

const AssignTasks = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const tasks = [
    {
      id: 1,
      title: 'Complete Java Collections Assignment',
      description: 'Implement ArrayList, LinkedList, and HashMap operations with proper error handling',
      assignedTo: 'All Students',
      dueDate: '2025-01-20',
      priority: 'High',
      status: 'Active',
      completedBy: 18,
      totalStudents: 28,
      createdDate: '2025-01-15'
    },
    {
      id: 2,
      title: 'Spring Boot REST API Project',
      description: 'Create a complete REST API with CRUD operations using Spring Boot',
      assignedTo: 'Advanced Group',
      dueDate: '2025-01-25',
      priority: 'Medium',
      status: 'Active',
      completedBy: 12,
      totalStudents: 15,
      createdDate: '2025-01-12'
    },
    {
      id: 3,
      title: 'Database Design Exercise',
      description: 'Design and implement a normalized database schema for e-commerce system',
      assignedTo: 'All Students',
      dueDate: '2025-01-18',
      priority: 'High',
      status: 'Overdue',
      completedBy: 22,
      totalStudents: 28,
      createdDate: '2025-01-08'
    },
    {
      id: 4,
      title: 'Unit Testing Practice',
      description: 'Write comprehensive unit tests using JUnit for the calculator application',
      assignedTo: 'Beginner Group',
      dueDate: '2025-01-30',
      priority: 'Low',
      status: 'Active',
      completedBy: 8,
      totalStudents: 13,
      createdDate: '2025-01-14'
    },
    {
      id: 5,
      title: 'Code Review Assignment',
      description: 'Review and provide feedback on peer code submissions',
      assignedTo: 'All Students',
      dueDate: '2025-01-16',
      priority: 'Medium',
      status: 'Completed',
      completedBy: 28,
      totalStudents: 28,
      createdDate: '2025-01-10'
    }
  ];

  const students = [
    { id: 1, name: 'Alex Kumar', group: 'Advanced' },
    { id: 2, name: 'Priya Sharma', group: 'Beginner' },
    { id: 3, name: 'David Lee', group: 'Advanced' },
    { id: 4, name: 'Maria Garcia', group: 'Intermediate' },
    { id: 5, name: 'James Wilson', group: 'Beginner' }
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

  const filteredTasks = tasks.filter(task => {
    if (selectedFilter === 'all') return true;
    return task.status.toLowerCase() === selectedFilter;
  });

  const TaskCard = ({ task }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{task.assignedTo}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>Due: {task.dueDate}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority} Priority
            </span>
            <div className="flex items-center space-x-1">
              {getStatusIcon(task.status)}
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                {task.status}
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
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Completion Progress</span>
          <span className="font-medium">{task.completedBy}/{task.totalStudents} students</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
            style={{ width: `${(task.completedBy / task.totalStudents) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Created: {task.createdDate}</span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round((task.completedBy / task.totalStudents) * 100)}% Complete
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
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <ClipboardList size={20} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Assign Tasks</h1>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus size={18} />
          <span>Create New Task</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-600">{tasks.length}</p>
            </div>
            <ClipboardList size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Tasks</p>
              <p className="text-2xl font-bold text-green-600">
                {tasks.filter(t => t.status === 'Active').length}
              </p>
            </div>
            <Clock size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {tasks.filter(t => t.status === 'Overdue').length}
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
                {tasks.filter(t => t.status === 'Completed').length}
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
              placeholder="Search tasks..."
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
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Task</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="all">All Students</option>
                    <option value="advanced">Advanced Group</option>
                    <option value="intermediate">Intermediate Group</option>
                    <option value="beginner">Beginner Group</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignTasks;