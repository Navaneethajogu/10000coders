import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import TrainerSidebar from './TrainerSidebar';
import TrainerNavbar from './TrainerNavbar';
import TrainerDashboardCards from './TrainerDashboardCards';
import AssignTasks from './AssignTasks';
import AssignAssignments from './AssignAssignments';
import TakeAttendance from './TakeAttendance';
import ScheduleMeetings from './ScheduleMeetings';
import ChatWithTrainees from './ChatWithTrainees';

const TrainerDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [domain, setDomain] = useState('');
  const [batches, setBatches] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', trainername: '', domain: '', batchId: '' });
  const [createBatchForm, setCreateBatchForm] = useState({ batchname: '', start_date: '', end_date: '' });

  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const fetchDashboardData = () => {
    if (!token) {
      alert('No authentication token found. Please log in.');
      setBatches([]);
      setTrainees([]);
      navigate('/'); // Redirect to root (/) instead of /login
      return;
    }
    axios
      .get('http://127.0.0.1:8000/trainer-dashboard/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('API Response:', res.data);
        setDomain(res.data.domain || '');
        setBatches(res.data.batches_with_members?.map(item => item.batch) || []);
        setTrainees(res.data.trainees || []);
        setForm(prev => ({ ...prev, domain: res.data.domain || '' }));
      })
      .catch((err) => {
        console.error('Error fetching dashboard data:', err);
        alert('Failed to load dashboard data');
        setBatches([]);
        setTrainees([]);
        navigate('/'); // Redirect to root (/) on API error
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token, navigate]);

  const handleAddTrainee = (e) => {
    e.preventDefault();
    const selectedBatch = batches.find(b => b.id === parseInt(form.batchId));
    if (selectedBatch && selectedBatch.domain !== form.domain) {
      alert('Trainee domain must match the selected batch domain');
      return;
    }
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      trainername: form.trainername,
      domain: form.domain,
      batchId: form.batchId
    };
    axios
      .post('http://127.0.0.1:8000/add-trainee/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert('Trainee added successfully!');
        setForm({ name: '', email: '', password: '', trainername: '', domain: domain, batchId: '' });
        fetchDashboardData();
      })
      .catch((err) => {
        console.error('Error adding trainee:', err.response ? err.response.data : err.message);
        alert('Error adding trainee: ' + (err.response?.data?.detail || 'Unknown error'));
      });
  };

  const handleCreateBatch = (e) => {
    e.preventDefault();
    const payload = {
      batchname: createBatchForm.batchname,
      domain: domain,
      start_date: createBatchForm.start_date,
      end_date: createBatchForm.end_date
    };
    axios
      .post('http://127.0.0.1:8000/trainer-create-batch/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert('Batch created successfully!');
        setCreateBatchForm({ batchname: '', start_date: '', end_date: '' });
        fetchDashboardData();
      })
      .catch((err) => {
        console.error('Error creating batch:', err.response ? err.response.data : err.message);
        alert('Error creating batch: ' + (err.response?.data?.detail || 'Unknown error'));
      });
  };

  const renderContent = () => {
    const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1).toLowerCase();
    
    switch (activeSection) {
      case 'overview':
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-black-700 ml-80">{capitalizedDomain} Trainer Dashboard</h1>
            <TrainerDashboardCards onCardClick={() => {}} />
            <h2 className="mt-6 text-xl font-semibold">My Batches</h2>
            {batches && batches.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {batches.map((b) => (
                  <li key={b.id} className="text-gray-700">
                    {b.batchname} ({b.start_date} - {b.end_date})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No batches available.</p>
            )}
          </div>
        );
      case 'add-trainee':
        return (
          <div className="mt-6 p-4 bg-white shadow rounded-lg max-w-md">
            <h3 className="text-lg font-bold mb-3">Add Trainee</h3>
            <form onSubmit={handleAddTrainee} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="text"
                placeholder="Trainer Name"
                value={form.trainername}
                onChange={(e) => setForm({ ...form, trainername: e.target.value })}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="text"
                placeholder="Domain"
                value={form.domain}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
              <select
                value={form.batchId}
                onChange={(e) => setForm({ ...form, batchId: e.target.value })}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="">Select Batch</option>
                {batches && batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.batchname}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Add Trainee
              </button>
            </form>
          </div>
        );
      case 'create-batch':
        return (
          <div className="mt-6 p-4 bg-white shadow rounded-lg max-w-md">
            <h3 className="text-lg font-bold mb-3">Create Batch</h3>
            <form onSubmit={handleCreateBatch} className="space-y-3">
              <input
                type="text"
                placeholder="Batch Name"
                value={createBatchForm.batchname}
                onChange={(e) => setCreateBatchForm({ ...createBatchForm, batchname: e.target.value })}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="text"
                placeholder="Domain"
                value={domain}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={createBatchForm.start_date}
                onChange={(e) => setCreateBatchForm({ ...createBatchForm, start_date: e.target.value })}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="date"
                placeholder="End Date"
                value={createBatchForm.end_date}
                onChange={(e) => setCreateBatchForm({ ...createBatchForm, end_date: e.target.value })}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Create Batch
              </button>
            </form>
          </div>
        );
      case 'tasks':
        return <AssignTasks />;
      case 'assignments':
        return <AssignAssignments />;
      case 'attendance':
        return <TakeAttendance />;
      case 'meetings':
        return <ScheduleMeetings />;
      case 'chat':
        return <ChatWithTrainees />;
      default:
        return <TrainerDashboardCards onCardClick={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onCollapseChange={setSidebarCollapsed}
      />
      <TrainerNavbar sidebarCollapsed={sidebarCollapsed} />
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } pt-20`}
      >
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default TrainerDashboard;