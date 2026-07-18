import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

// Axios instance with token refresh interceptor
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: localStorage.getItem("refresh_token"),
          }
        );
        localStorage.setItem("token", refreshResponse.data.access);
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

const AssignTasks = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  // Fetch batches when modal opens
  useEffect(() => {
    if (showCreateModal) {
      fetchBatches();
    }
  }, [showCreateModal]);

  // Fetch tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/tasks/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to fetch tasks. Please login again.");
      }
    };
    fetchTasks();
  }, []);

  const fetchBatches = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/trainer-dashboard/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedBatches = response.data.batches_with_members?.map(item => item.batch) || [];
      setBatches(fetchedBatches);
      if (fetchedBatches.length === 0) {
        alert("No batches assigned to you. Contact admin.");
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const handleBatchSelect = (batchId) => {
    if (selectedBatches.includes(batchId)) {
      setSelectedBatches(selectedBatches.filter((id) => id !== batchId));
    } else {
      setSelectedBatches([...selectedBatches, batchId]);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const taskData = new FormData();
    taskData.append("title", formData.get("title"));
    taskData.append("description", formData.get("description"));
    taskData.append("priority", formData.get("priority"));
    taskData.append("due_date", formData.get("due_date"));

    // Multiple batch IDs
    selectedBatches.forEach((id) => taskData.append("assigned_to", id));

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/tasks/create/", taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setTasks([...tasks, response.data]);
      setShowCreateModal(false);
      e.target.reset();
      setSelectedBatches([]);
    } catch (error) {
      console.error("Error creating task:", error);
      alert(`Failed to create task: ${JSON.stringify(error.response?.data)}`);
    }
  };

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
              <span>Batches: {task.assigned_to?.map((b) => b.batchname).join(", ") || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>Due: {task.due_date}</span>
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
          <span className="font-medium">{task.completed_by}/{task.total_students} students</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
            style={{ width: `${(task.completed_by / task.total_students) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Created: {task.created_date}</span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round((task.completed_by / task.total_students) * 100)}% Complete
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
          disabled={userRole !== "trainer" && userRole !== "admin"}
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
            {batches.length === 0 && (
              <div className="bg-yellow-100 p-2 rounded mb-4 text-sm">
                No batches available for you. Contact admin.
              </div>
            )}
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                <input
                  type="text"
                  name="title"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task description"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Batches</label>
                <div className="flex flex-wrap gap-2">
                  {batches.map((batch) => (
                    <button
                      type="button"
                      key={batch.id}
                      className={`px-3 py-1 border rounded ${
                        selectedBatches.includes(batch.id)
                          ? "bg-blue-600 text-white"
                          : "bg-white"
                      }`}
                      onClick={() => handleBatchSelect(batch.id)}
                    >
                      {batch.batchname}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    name="priority"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    name="due_date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  disabled={selectedBatches.length === 0 || (userRole !== "trainer" && userRole !== "admin")}
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