import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "lucide-react";

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

const AssignAssignments = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [assignmentTypes, setAssignmentTypes] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  // Fetch batches and assignment types when modal opens
  useEffect(() => {
    if (showCreateModal) {
      fetchBatches();
      fetchAssignmentTypes();
    }
  }, [showCreateModal]);

  // Fetch assignments on load
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/assignments/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        alert("Failed to fetch assignments. Please login again.");
      }
    };
    fetchAssignments();
  }, []);

  const fetchBatches = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/trainer-dashboard/", { // Using existing /trainer-dashboard/
        headers: { Authorization: `Bearer ${token}` },
      });
      // Extract batches from batches_with_members, matching TrainerDashboard logic
      const fetchedBatches = response.data.batches_with_members?.map(item => item.batch) || [];
      setBatches(fetchedBatches);
      if (fetchedBatches.length === 0) {
        alert("No batches assigned to you. Contact admin.");
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const fetchAssignmentTypes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/assignment-types/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignmentTypes(response.data);
    } catch (error) {
      console.error("Error fetching assignment types:", error);
    }
  };

  const createNewAssignmentType = async () => {
    if (userRole !== "trainer" && userRole !== "admin") {
      alert("Only trainers and admins can create assignment types.");
      return;
    }
    const newTypeName = prompt("Enter new assignment type name:");
    if (!newTypeName || newTypeName.trim() === "") return;
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/assignment-types/",
        { name: newTypeName.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAssignmentTypes(); // Refresh types list
      alert("Assignment type created successfully!");
    } catch (error) {
      console.error("Error creating assignment type:", error);
      alert(`Failed to create assignment type: ${JSON.stringify(error.response?.data)}`);
    }
  };

  const handleBatchSelect = (batchId) => {
    if (selectedBatches.includes(batchId)) {
      setSelectedBatches(selectedBatches.filter((id) => id !== batchId));
    } else {
      setSelectedBatches([...selectedBatches, batchId]);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const assignmentData = new FormData();
    assignmentData.append("title", formData.get("title"));
    assignmentData.append("description", formData.get("description"));
    assignmentData.append("type", formData.get("assignment_type")); // Remap assignment_type to type
    assignmentData.append("due_date", formData.get("due_date"));
    assignmentData.append("max_marks", formData.get("max_marks"));

    // Multiple batch IDs
    selectedBatches.forEach((id) => assignmentData.append("assigned_to", id));

    // Attachments
    const files = formData.getAll("attachments");
    files.forEach((file) => assignmentData.append("attachments", file));

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/assignments/create/", assignmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAssignments([...assignments, response.data]);
      setShowCreateModal(false);
      e.target.reset();
      setSelectedBatches([]);
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert(`Failed to create assignment: ${JSON.stringify(error.response?.data)}`);
    }
  };

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
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          disabled={userRole !== "trainer" && userRole !== "admin"}
        >
          <Plus size={18} />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.length > 0 ? (
          assignments.map((a) => (
            <div key={a.id} className="bg-white p-4 rounded-lg shadow-md border">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm">{a.description}</p>
              <p className="text-xs text-gray-500">
                Batches: {a.assigned_to?.map((b) => b.batchname).join(", ") || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p>No assignments yet.</p>
        )}
      </div>

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Create New Assignment</h2>
            {batches.length === 0 && (
              <div className="bg-yellow-100 p-2 rounded mb-4 text-sm">
                No batches available for you. Contact admin.
              </div>
            )}
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                rows={3}
                className="w-full border p-2 rounded"
                required
              />
              <div className="relative">
                <select
                  name="assignment_type"
                  className="w-full border p-2 rounded"
                  required
                  disabled={assignmentTypes.length === 0}
                >
                  <option value="">Select Type</option>
                  {assignmentTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                {(userRole === "trainer" || userRole === "admin") && (
                  <button
                    type="button"
                    onClick={createNewAssignmentType}
                    className="absolute right-0 top-0 mt-1 mr-1 px-2 py-1 bg-blue-500 text-white text-xs rounded"
                    disabled={assignmentTypes.length === 0}
                  >
                    + Add Type
                  </button>
                )}
              </div>
              <div>
                <p className="mb-2 font-medium">Assign to Batches:</p>
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
              <input
                type="date"
                name="due_date"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                name="max_marks"
                placeholder="Max Marks"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="file"
                name="attachments"
                multiple
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  disabled={
                    assignmentTypes.length === 0 ||
                    selectedBatches.length === 0 ||
                    (userRole !== "trainer" && userRole !== "admin")
                  }
                >
                  Create
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