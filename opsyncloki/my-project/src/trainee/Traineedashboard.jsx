import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TraineeSidebar from './TraineeSidebar';
import TraineeNavbar from './TraineeNavbar';
import TraineeDashboardCards from './TraineeDashboardCards';
import ViewTrainingSchedule from './ViewTrainingSchedule';
import SubmitTasksAssignments from './SubmitTasksAssignments';
import JoinMeets from './JoinMeets';
import MarkViewAttendance from './MarkViewAttendance';
import TrackPerformance from './TrackPerformance';

const TraineeDashboard = () => {
  // State for UI navigation
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // State for API data
  const [batch, setBatch] = useState(null);
  const [trainee, setTrainee] = useState(null);
  const [error, setError] = useState('');

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/trainee-dashboard/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBatch(res.data.batch);
        setTrainee(res.data.trainee);
      } catch (error) {
        setError('Failed to fetch dashboard data: ' + (error.response?.data?.error || error.message));
      }
    };
    fetchDashboardData();
  }, []);

  // Render dynamic content based on activeSection
  const renderContent = () => {
    if (error) {
      return <p className="text-red-500 text-center">{error}</p>;
    }

    if (!batch || !trainee) {
      return <p className="text-center">Loading...</p>;
    }

    switch (activeSection) {
      case 'overview':
        return (
          <div>
            <TraineeDashboardCards onCardClick={() => {}} />
            <div className="mt-8">
              <h3 className="text-lg font-semibold">My Batch</h3>
              <p className="text-gray-600">
                {batch.batchname} ({batch.domain})
              </p>
              <h3 className="text-lg font-semibold mt-4">My Email</h3>
              <p className="text-gray-600">{trainee.username}</p>
            </div>
          </div>
        );
      case 'schedule':
        return <ViewTrainingSchedule />;
      case 'submissions':
        return <SubmitTasksAssignments />;
      case 'meetings':
        return <JoinMeets />;
      case 'attendance':
        return <MarkViewAttendance />;
      case 'performance':
        return <TrackPerformance />;
      default:
        return <TraineeDashboardCards onCardClick={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <TraineeSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onCollapseChange={(collapsed) => setSidebarCollapsed(collapsed)}
      />
      <TraineeNavbar sidebarCollapsed={sidebarCollapsed} />
      <main 
        className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} pt-20`}
        style={{ height: 'calc(100vh - 80px)', overflowY: 'auto', overflowX: 'hidden' }} // Vertical scrolling only for main
      >
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default TraineeDashboard;