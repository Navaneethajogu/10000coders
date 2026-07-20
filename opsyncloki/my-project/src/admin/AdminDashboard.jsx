import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardCards, { StatTable } from "./DashboardCards";
import TrainerDetails from "./TrainerDetails";
import ManageTrainers from "./ManageTrainers";
import AttendanceRecords from "./AttendanceRecords";
import PerformanceAnalysis from "./PerformanceAnalysis";
import MeetingSchedules from "./MeetingSchedules";
import Settings from "./Settings";
import Logout from "./Logout";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [trainers, setTrainers] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (!token) {
      setError("No authentication token found. Please log in.");
      setLoading(false);
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [trainersRes, traineesRes, batchesRes] = await Promise.all([
          axios.get("https://one0000coders.onrender.com/trainers/", { headers }),
          axios.get("https://one0000coders.onrender.com/trainees/", { headers }),
          axios.get("https://one0000coders.onrender.com/batches-list/", { headers }),
          
        ]);
        console.log("Trainers Data:", trainersRes.data);
        console.log("Trainees Data:", traineesRes.data.map(t => ({
          id: t.id,
          email: t.email,
          domain: t.domain,
          batchId: t.batchId,
          role: t.role
        })));
        console.log("Batches Data:", batchesRes.data.map(b => ({
          id: b.id,
          batchname: b.batchname,
          domain: b.domain,
          trainer: b.trainer,
          trainees: b.trainees,
          trainee_count: b.trainee_count
        })));
        setTrainers(trainersRes.data);
        setTrainees(traineesRes.data);
        setBatches(batchesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again or check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleRefresh = async () => {
    if (!token) {
      setError("No authentication token found. Please log in.");
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };

    try {
      setLoading(true);
      setError(null);
      const [trainersRes, traineesRes, batchesRes] = await Promise.all([
        axios.get("https://one0000coders.onrender.com/trainers/", { headers }),
        axios.get("https://one0000coders.onrender.com/trainees/", { headers }),
        axios.get("https://one0000coders.onrender.com/batches-list/", { headers }),
      ]);
      console.log("Refreshed Trainers Data:", trainersRes.data);
      console.log("Refreshed Trainees Data:", traineesRes.data.map(t => ({
        id: t.id,
        email: t.email,
        domain: t.domain,
        batchId: t.batchId,
        role: t.role
      })));
      console.log("Refreshed Batches Data:", batchesRes.data.map(b => ({
        id: b.id,
        batchname: b.batchname,
        domain: b.domain,
        trainer: b.trainer,
        trainees: b.trainees,
        trainee_count: b.trainee_count
      })));
      setTrainers(trainersRes.data);
      setTrainees(traineesRes.data);
      setBatches(batchesRes.data);
    } catch (err) {
      console.error("Error refreshing data:", err);
      setError("Failed to refresh data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (cardId, cardData) => {
    setSelectedCard(cardId);
    setSelectedCardData(cardData);
  };

  const handleBackToDashboard = () => {
    setSelectedCard(null);
    setSelectedCardData(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/'); // Use navigate instead of window.location.href
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-600 text-center p-8">
          <p>{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      );
    }

    switch (activeSection) {
      case "overview":
        if (selectedCard) {
          if (["total-members", "total-batches", "total-domains"].includes(selectedCard)) {
            return (
              <StatTable
                cardId={selectedCard}
                cardData={selectedCardData}
                onBack={handleBackToDashboard}
                trainers={trainers}
                trainees={trainees}
                batches={batches}
              />
            );
          }
          return (
            <TrainerDetails
              cardId={selectedCard}
              cardData={selectedCardData}
              onBack={handleBackToDashboard}
              trainers={trainers}
              trainees={trainees}
              batches={batches}
            />
          );
        }
        return (
          <DashboardCards
            onCardClick={handleCardClick}
            trainers={trainers}
            trainees={trainees}
            batches={batches}
            onRefresh={handleRefresh}
          />
        );
      case "manage-trainers":
        return <ManageTrainers trainers={trainers} onRefresh={handleRefresh} />;
      case "attendance":
        return <AttendanceRecords trainees={trainees} batches={batches} />;
      case "performance":
        return <PerformanceAnalysis trainees={trainees} batches={batches} />;
      case "meetings":
        return <MeetingSchedules />;
      case "settings":
        return <Settings activeSection={activeSection} />;
      case "logout":
        return <Logout activeSection={activeSection} onLogout={handleLogout} />;
      default:
        return (
          <DashboardCards
            onCardClick={handleCardClick}
            trainers={trainers}
            trainees={trainees}
            batches={batches}
            onRefresh={handleRefresh}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onCollapseChange={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col">
        <Navbar sidebarCollapsed={sidebarCollapsed} />
        <main
          className={`transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          } pt-20 p-8`}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;