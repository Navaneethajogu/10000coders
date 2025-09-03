import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Edit, Trash2, Mail, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Component } from 'react'; // For ErrorBoundary

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

const ManageTrainers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [trainers, setTrainers] = useState([]); // Changed from trainees to trainers
  const [batches, setBatches] = useState([]);  // New state for batches list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = 'http://127.0.0.1:8000/';

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        setError('Please log in to view data.');
        setLoading(false);
        navigate('/');
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
          batch: trainer.batch, // Adjust based on API response
          trainer: trainer.trainername || null, // Adjust if trainer has a different field
          domain: trainer.domain || null,
        })));

        // Fetch batches
        const batchesResponse = await axios.get(`${API_BASE_URL}batches-list/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBatches(batchesResponse.data); // Store batches list
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = 
      (trainer.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (trainer.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (trainer.batch?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (trainer.domain?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesFilter = selectedFilter === 'all' || trainer.domain?.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const TraineeCard = ({ trainer }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{trainer.name}</h3>
            {trainer.batch && <p className="text-sm text-gray-600">Batch: {trainer.batch}</p>}
            {trainer.trainer && <p className="text-sm text-gray-500">Trainer: {trainer.trainer}</p>}
            {trainer.domain && <p className="text-sm text-gray-500">Domain: {trainer.domain}</p>}
          </div>
        </div>
        <div className="relative group">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical size={16} className="text-gray-600" />
          </button>
          <div className="absolute right-0 top-10 w-32 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2">
              <Edit size={14} />
              <span>Edit</span>
            </button>
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-600 flex items-center space-x-2">
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail size={14} />
          <span>{trainer.email}</span>
        </div>
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Users size={20} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Trainers</h1>
        </div>

        {error && <div className="text-center py-4 text-red-600">{error}</div>}
        {loading && <div className="text-center py-4">Loading trainers...</div>}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search trainers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    <option value="all">All Domains</option>
                    {batches.map(batch => (
                      <option key={batch.id} value={batch.domain}>{batch.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrainers.map((trainer) => (
                  <TraineeCard key={trainer.id} trainer={trainer} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};
export default ManageTrainers;