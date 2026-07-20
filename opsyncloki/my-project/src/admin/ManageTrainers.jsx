import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Users, 
  BookOpen, 
  Calendar, 
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import axios from 'axios';

const ManageTrainerandTranees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [trainers, setTrainers] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'https://one0000coders.onrender.com/';

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        setError('Please log in to view data.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch trainers
        const trainersResponse = await axios.get(`${API_BASE_URL}trainers/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrainers(trainersResponse.data.map(trainer => ({
          id: trainer.id,
          name: trainer.name || trainer.email.split('@')[0],
          email: trainer.email,
          domain: trainer.domain || null,
          status: trainer.status || 'Available', // Adjust based on API
          image: `https://images.pexels.com/photos/218297${trainer.id}/pexels-photo-218297${trainer.id}.jpeg?auto=compress&cs=tinysrgb&w=150`,
          experience: trainer.experience || 'N/A',
          currentBatches: trainer.currentBatches || 0,
          maxCapacity: trainer.maxCapacity || 2,
          rating: trainer.rating || 4.0,
        })));

        // Fetch trainees
        const traineesResponse = await axios.get(`${API_BASE_URL}trainees/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrainees(traineesResponse.data.map(trainee => ({
          id: trainee.id,
          name: trainee.name || trainee.email.split('@')[0],
          email: trainee.email,
          domain: trainee.domain || null,
          batch: trainee.batch || null,
          trainername: trainee.trainername || null,
        })));

        // Fetch batches
        const batchesResponse = await axios.get(`${API_BASE_URL}batches-list/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBatches(batchesResponse.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Full Capacity':
        return 'bg-red-100 text-red-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
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

  const getBatchStatusIcon = (status) => {
    switch (status) {
      case 'Assigned':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Unassigned':
        return <Clock size={16} className="text-yellow-600" />;
      case 'Pending':
        return <AlertTriangle size={16} className="text-orange-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const TrainerCard = ({ trainer }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src={trainer.image}
          alt={trainer.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{trainer.name} (Trainer)</h3>
          <p className="text-sm text-gray-600">{trainer.domain} • {trainer.experience}</p>
          <div className="flex items-center space-x-1 mt-1">
            <span className="text-sm text-yellow-500">★</span>
            <span className="text-sm text-gray-600">{trainer.rating}/5.0</span>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(trainer.status)}`}>
          {trainer.status}
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Current Load</span>
          <span className="text-sm font-medium text-gray-900">
            {trainer.currentBatches}/{trainer.maxCapacity} batches
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              trainer.currentBatches >= trainer.maxCapacity ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${(trainer.currentBatches / trainer.maxCapacity) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  const TraineeCard = ({ trainee }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{trainee.name} (Trainee)</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Email: {trainee.email}</p>
            {trainee.batch && <p>Batch: {trainee.batch}</p>}
            {trainee.trainername && <p>Trainer: {trainee.trainername}</p>}
            {trainee.domain && <p>Domain: {trainee.domain}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const BatchCard = ({ batch }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{batch.name}</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Domain: {batch.domain}</p>
            <p>Students: {batch.students}</p>
            <p>Start Date: {batch.startDate}</p>
            <p>Duration: {batch.duration}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(batch.priority)} mb-2 inline-block`}>
            {batch.priority} Priority
          </span>
          <div className="flex items-center space-x-2">
            {getBatchStatusIcon(batch.status)}
            <span className="text-sm font-medium text-gray-900">{batch.status}</span>
          </div>
        </div>
      </div>
      {batch.status === 'Assigned' ? (
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-800">
            Assigned to: <span className="font-medium">{batch.trainer}</span>
          </p>
        </div>
      ) : (
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
          Assign Trainer
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <UserCheck size={20} className="text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">View/Manage Trainers & Trainees</h1>
        </div>
        
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Trainers</p>
              <p className="text-2xl font-bold text-green-600">
                {trainers.filter(t => t.status === 'Available').length}
              </p>
            </div>
            <Users size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unassigned Batches</p>
              <p className="text-2xl font-bold text-orange-600">
                {batches.filter(b => b.status === 'Unassigned').length}
              </p>
            </div>
            <BookOpen size={24} className="text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Trainees</p>
              <p className="text-2xl font-bold text-blue-600">{trainees.length}</p>
            </div>
            <CheckCircle size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {batches.filter(b => b.priority === 'High' && b.status === 'Unassigned').length}
              </p>
            </div>
            <AlertTriangle size={24} className="text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Trainers */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Available Trainers</h3>
            <p className="text-sm text-gray-600">Select trainers to assign to batches</p>
          </div>
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </div>

        {/* Trainees */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Trainees</h3>
            <p className="text-sm text-gray-600">List of current trainees</p>
          </div>
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto"> {/* Added scrollbar */}
            {trainees.map((trainee) => (
              <TraineeCard key={trainee.id} trainee={trainee} />
            ))}
          </div>
        </div>

        {/* Unassigned Batches */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Batches Requiring Assignment</h3>
            <p className="text-sm text-gray-600">Batches that need trainer assignment</p>
          </div>
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto"> {/* Added scrollbar */}
            {batches.filter(batch => batch.status === 'Unassigned').map((batch) => (
              <BatchCard key={batch.id} batch={batch} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTrainerandTranees;