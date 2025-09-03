import React, { useState, useEffect } from "react";
import { 
  Users, 
  GraduationCap, 
  Coffee, 
  Monitor, 
  TestTube, 
  Server, 
  BarChart, 
  TrendingUp,
  Clock,
  Plus,
  Calendar,
  UserPlus,
  Award,
  UserCheck,
  ArrowLeft,
  X
} from "lucide-react";
import axios from "axios";

// StatTable component
export const StatTable = ({ cardId, cardData, onBack, trainers, trainees, batches }) => {
  const allDomains = {
    "java": "Java Developers",
    "python": "Python Developers",
    "web_developer": "Web Developers",
    "testing": "Testing",
    "devops": "DevOps",
    "powerbi": "Power BI"
  };

  const getTableData = () => {
    switch (cardId) {
      case "total-members":
        return [
          ...trainers.map(t => ({
            type: "Trainer",
            email: t.email || "Not provided",
            domain: allDomains[t.domain] || t.domain || "Not specified"
          })),
          ...trainees.map(t => ({
            type: "Trainee",
            email: t.email || "Not provided",
            domain: allDomains[t.domain] || t.domain || "Not specified"
          }))
        ].reduce((acc, member) => {
          if (!acc[member.domain]) acc[member.domain] = [];
          acc[member.domain].push(member);
          return acc;
        }, {});
      case "total-domains":
        return [...new Set(batches.map(batch => ({ domain: allDomains[batch.domain] || batch.domain })))].map(d => ({ domain: d.domain }));
      case "total-batches":
        return batches.map(batch => ({
          name: batch.batchname || batch.domain,
          domain: allDomains[batch.domain] || batch.domain,
          trainee_count: batch.trainee_count || 0,
          trainees: batch.trainees || []
        }));
      default:
        return [];
    }
  };

  const tableData = getTableData();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{cardData.title} Details</h3>
        <button
          onClick={onBack}
          className="bg-gray-600 text-white hover:bg-gray-300 hover:text-blue-800 font-medium flex items-center px-4 py-2 rounded-md transition duration-200"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
        </button>
      </div>
      {cardId === "total-members" && (
        <div className="space-y-6">
          {Object.keys(tableData).map((domain, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{domain}</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableData[domain].map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
      {cardId === "total-batches" && (
        <div className="space-y-6">
          {tableData.map((batch, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{batch.name} (Domain: {batch.domain})</h4>
              <p className="text-sm text-gray-600 mb-2">Total Trainees: {batch.trainee_count}</p>
              {batch.trainees.length > 0 && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch ID</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {batch.trainees.map((trainee, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap">{trainee.email || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{trainee.batchId || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}
      {cardId === "total-domains" && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.domain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const DashboardCards = ({ onCardClick, trainers, trainees, batches, onRefresh }) => {
  const totalMembers = trainees.length + trainers.length;
  const totalBatches = batches.length;
  const totalDomains = [...new Set(batches.map(batch => batch.domain))].length;

  const [mainStats, setMainStats] = useState([
    {
      id: "total-members",
      title: "Total Members",
      count: totalMembers,
      icon: Users,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "total-batches",
      title: "Total Batches",
      count: totalBatches,
      icon: GraduationCap,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: "total-domains",
      title: "Total Domains",
      count: totalDomains,
      icon: Monitor,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: "completed-courses",
      title: "Completed Courses",
      count: 0,
      icon: Award,
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      id: "attendance-rate",
      title: "Attendance Rate",
      count: 0,
      icon: UserCheck,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      id: "upcoming-assessments",
      title: "Upcoming Assessments",
      count: 0,
      icon: TestTube,
      color: "bg-gradient-to-r from-rose-500 to-rose-600",
      textColor: "text-rose-600",
      bgColor: "bg-rose-50"
    }
  ]);

  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [addTrainerForm, setAddTrainerForm] = useState({
    username: '',
    email: '',
    role: 'trainer',
    domain: 'java',
    batchId: '',
    password1: '',
    password2: '',
  });
  const [createBatchForm, setCreateBatchForm] = useState({
    batchname: '',
    domain: 'java',
    trainer: '',
    start_date: '',
    end_date: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  const DOMAIN_CHOICES = [
    { value: 'java', label: 'Java',textColor: 'blue-900' },
    { value: 'python', label: 'Python' },
    { value: 'web_developer', label: 'Web Developer' },
    { value: 'testing', label: 'Testing' },
    { value: 'devops', label: 'DevOps' },
    { value: 'powerbi', label: 'Power BI' },
  ];

  // Calculate real data
  useEffect(() => {
    const completedCourses = batches.filter(b => b.status === 'Completed').length;
    const totalTrainees = trainees.length;
    const presentTrainees = trainees.filter(t => t.attendance === 'Present').length;
    const attendanceRate = totalTrainees > 0 ? Math.round((presentTrainees / totalTrainees) * 100) : 0;
    const upcomingAssessments = batches.filter(b => b.assessmentStatus === 'Upcoming').length;

    const updatedStats = mainStats.map(stat => {
      let count = stat.count;
      switch (stat.id) {
        case "total-members":
          count = totalMembers;
          break;
        case "total-batches":
          count = totalBatches;
          break;
        case "total-domains":
          count = totalDomains;
          break;
        case "completed-courses":
          count = completedCourses;
          break;
        case "attendance-rate":
          count = attendanceRate;
          break;
        case "upcoming-assessments":
          count = upcomingAssessments;
          break;
      }
      return { ...stat, count };
    });
    setMainStats(updatedStats);
  }, [trainers, trainees, batches, totalMembers, totalBatches, totalDomains]);

  const allDomains = {
    "java": "Java Developers",
    "python": "Python Developers",
    "web_developer": "Web Developers",
    "testing": "Testing",
    "devops": "DevOps",
    "powerbi": "Power BI"
  };

  const membersByDomain = [...trainees].reduce((acc, trainee) => {
    if (trainee.batchId && trainee.domain) {
      acc[trainee.domain] = (acc[trainee.domain] || 0) + 1;
    }
    return acc;
  }, {});

  const batchStats = Object.keys(allDomains).map(domain => {
    let title = allDomains[domain];
    let icon, color, textColor, bgColor;
    switch (domain.toLowerCase()) {
      case "java":
        icon = Coffee;
        color = "bg-gradient-to-r from-green-500 to-teal-500";
        textColor = "text-purple-600";
        bgColor = "bg-green-70";
        break;
      case "python":
        icon = Monitor;
        color = "bg-gradient-to-r from-yellow-500 to-orange-500";
        textColor = "text-yellow-600";
        bgColor = "bg-yellow-50";
        break;
      case "web_developer":
        icon = Monitor;
        color = "bg-gradient-to-r from-purple-500 to-pink-500";
        textColor = "text-purple-600";
        bgColor = "bg-purple-50";
        break;
      case "testing":
        icon = TestTube;
        color = "bg-gradient-to-r from-teal-500 to-cyan-500";
        textColor = "text-teal-600";
        bgColor = "bg-teal-50";
        break;
      case "devops":
        icon = Server;
        color = "bg-gradient-to-r from-indigo-500 to-blue-500";
        textColor = "text-indigo-600";
        bgColor = "bg-indigo-50";
        break;
      case "powerbi":
        icon = BarChart;
        color = "bg-gradient-to-r from-pink-500 to-rose-500";
        textColor = "text-pink-600";
        bgColor = "bg-pink-50";
        break;
      default:
        icon = Users;
        color = "bg-gradient-to-r from-gray-500 to-gray-600";
        textColor = "text-gray-600";
        bgColor = "bg-gray-50";
    }
    return {
      id: `${domain}-batch`,
      title,
      count: membersByDomain[domain] || 0,
      icon,
      color,
      textColor,
      bgColor,
      progress: Math.floor(Math.random() * 100)
    };
  });

  const recentActivities = [
    { action: `New trainer ${trainers[0]?.email || "Unknown"} added`, time: "2 hours ago", type: "trainer" },
    { action: `${trainees.length} new trainees enrolled`, time: "4 hours ago", type: "enrollment" },
    { action: `${batches[0]?.batchname || "Unknown"} completed a module`, time: "1 day ago", type: "progress" },
    { action: "Attendance recorded for all batches", time: "2 days ago", type: "attendance" }
  ].slice(0, 3);

  const upcomingDeadlines = [
    { task: "Batch Final Assessment", date: "Dec 28, 2025", priority: "high" },
    { task: "Project Submission", date: "Jan 5, 2026", priority: "medium" },
    { task: "Portfolio Review", date: "Jan 12, 2026", priority: "low" }
  ];

  const Card = ({ item, onClick, children }) => (
    <div
      onClick={() => onClick(item.id, item)}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
    >
      {children}
    </div>
  );

  const StatCard = ({ item }) => (
    <Card item={item} onClick={onCardClick}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">{item.title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{item.count}</p>
          </div>
          <div className={`w-16 h-16 ${item.bgColor} rounded-lg flex items-center justify-center`}>
            <item.icon size={32} className={item.textColor} />
          </div>
        </div>
      </div>
    </Card>
  );

  const BatchCard = ({ item }) => (
    <Card item={item} onClick={onCardClick}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{item.title}</p>
            <p className="text-2xl font-bold text-gray-900">{item.count}</p>
          </div>
          <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
            <item.icon size={24} className={item.textColor} />
          </div>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{item.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${item.color}`}
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );

  const handleChangeAddTrainer = (e) => {
    const { name, value } = e.target;
    setAddTrainerForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmitAddTrainer = async (e) => {
    e.preventDefault();
    if (addTrainerForm.password1 !== addTrainerForm.password2) {
      setError('Passwords do not match');
      return;
    }

    if (!addTrainerForm.username || !addTrainerForm.email || !addTrainerForm.domain || !addTrainerForm.password1) {
      setError('All fields are required');
      return;
    }

    if (addTrainerForm.role === 'trainee' && !addTrainerForm.batchId) {
      setError('Batch selection is required for trainees');
      return;
    }

    const selectedBatch = batches.find(b => b.id === parseInt(addTrainerForm.batchId));
    if (addTrainerForm.role === 'trainee' && selectedBatch && selectedBatch.domain !== addTrainerForm.domain) {
      setError('Trainee domain must match the selected batch domain');
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }
      const data = {
        username: addTrainerForm.username,
        email: addTrainerForm.email,
        role: addTrainerForm.role,
        domain: addTrainerForm.domain,
        password: addTrainerForm.password1,
        ...(addTrainerForm.role === 'trainee' && { batchId: addTrainerForm.batchId }),
      };
      const response = await axios.post('http://127.0.0.1:8000/add-trainer/', data, { headers });
      if (response.status === 201) {
        setSuccess('Trainer/Trainee added successfully');
        setShowAddTrainer(false);
        setAddTrainerForm({ username: '', email: '', role: 'trainer', domain: 'java', batchId: '', password1: '', password2: '' });
        onRefresh();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error adding trainer:', err.response ? err.response.data : err.message);
      const errorMessage = err.response?.data?.email ? err.response.data.email[0] : 
                          err.response?.status === 401 ? 'Unauthorized. Please log in as an admin.' : 
                          'Failed to add user';
      setError(errorMessage);
    }
  };

  const handleChangeCreateBatch = (e) => {
    const { name, value } = e.target;
    setCreateBatchForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmitCreateBatch = async (e) => {
    e.preventDefault();
    if (!createBatchForm.batchname || !createBatchForm.domain || !createBatchForm.trainer || !createBatchForm.start_date || !createBatchForm.end_date) {
      setError('All fields are required');
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }
      const data = {
        batchname: createBatchForm.batchname,
        domain: createBatchForm.domain,
        trainer: parseInt(createBatchForm.trainer),
        start_date: createBatchForm.start_date,
        end_date: createBatchForm.end_date,
      };
      const response = await axios.post('http://127.0.0.1:8000/batches/', data, { headers });
      if (response.status === 201) {
        setSuccess('Batch created successfully');
        setShowCreateBatch(false);
        setCreateBatchForm({ batchname: '', domain: 'java', trainer: '', start_date: '', end_date: '' });
        onRefresh();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error creating batch:', err.response ? err.response.data : err.message);
      setError(err.response?.status === 401 ? 'Unauthorized. Please log in as an admin.' : 'Failed to create batch');
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainStats.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-purple-900 mb-6">Domains Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batchStats.map((item) => (
            <BatchCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="mr-3 text-blue-600" size={24} />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-1">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="mr-3 text-green-600" size={24} />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setShowAddTrainer(true)} className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200">
            <UserPlus size={18} />
            <span className="text-sm font-medium">Add Trainer</span>
          </button>
          <button onClick={() => setShowCreateBatch(true)} className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors duration-200">
            <Plus size={18} />
            <span className="text-sm font-medium">Create Batch</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors duration-200">
            <Calendar size={18} />
            <span className="text-sm font-medium">Schedule Meeting</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-colors duration-200">
            <BarChart size={18} />
            <span className="text-sm font-medium">View Reports</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="mr-3 text-red-600" size={24} />
          Upcoming Deadlines
        </h3>
        <div className="space-y-3">
          {upcomingDeadlines.map((deadline, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  deadline.priority === "high" ? "bg-red-500" :
                  deadline.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                }`}></div>
                <span className="text-sm font-medium text-gray-900">{deadline.task}</span>
              </div>
              <span className="text-sm text-gray-500">{deadline.date}</span>
            </div>
          ))}
        </div>
      </div>

      {showAddTrainer && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative">
            <button onClick={() => { setShowAddTrainer(false); setError(''); setSuccess(''); }} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-6">Add Trainer/Trainee</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmitAddTrainer} className="space-y-4">
              <input
                type="text"
                name="username"
                value={addTrainerForm.username}
                onChange={handleChangeAddTrainer}
                placeholder="Username"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={addTrainerForm.email}
                onChange={handleChangeAddTrainer}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
              <select
                name="role"
                value={addTrainerForm.role}
                onChange={handleChangeAddTrainer}
                className="w-full p-2 border rounded"
                required
              >
                <option value="trainer">Trainer</option>
                <option value="trainee">Trainee</option>
              </select>
              <select
                name="domain"
                value={addTrainerForm.domain}
                onChange={handleChangeAddTrainer}
                className="w-full p-2 border rounded"
                required
              >
                {DOMAIN_CHOICES.map((choice) => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
              {addTrainerForm.role === 'trainee' && (
                <select
                  name="batchId"
                  value={addTrainerForm.batchId}
                  onChange={handleChangeAddTrainer}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Batch</option>
                  {batches.filter(b => b.domain === addTrainerForm.domain).map((batch) => (
                    <option key={batch.id} value={batch.id}>
                      {batch.batchname}
                    </option>
                  ))}
                </select>
              )}
              <input
                type="password"
                name="password1"
                value={addTrainerForm.password1}
                onChange={handleChangeAddTrainer}
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                name="password2"
                value={addTrainerForm.password2}
                onChange={handleChangeAddTrainer}
                placeholder="Confirm Password"
                className="w-full p-2 border rounded"
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {showCreateBatch && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative">
            <button onClick={() => { setShowCreateBatch(false); setError(''); setSuccess(''); }} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-6">Create Batch</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmitCreateBatch} className="space-y-4">
              <input
                type="text"
                name="batchname"
                value={createBatchForm.batchname}
                onChange={handleChangeCreateBatch}
                placeholder="Batch Name"
                className="w-full p-2 border rounded"
                required
              />
              <select
                name="domain"
                value={createBatchForm.domain}
                onChange={handleChangeCreateBatch}
                className="w-full p-2 border rounded"
                required
              >
                {DOMAIN_CHOICES.map((choice) => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
              <select
                name="trainer"
                value={createBatchForm.trainer}
                onChange={handleChangeCreateBatch}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Trainer</option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.email}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="start_date"
                value={createBatchForm.start_date}
                onChange={handleChangeCreateBatch}
                placeholder="Start Date"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                name="end_date"
                value={createBatchForm.end_date}
                onChange={handleChangeCreateBatch}
                placeholder="End Date"
                className="w-full p-2 border rounded"
                required
              />
              <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCards;