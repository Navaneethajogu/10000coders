// src/trainer/TrainerLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";
const API = axios.create({ baseURL: API_BASE });

API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("access");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default function TrainerLogin() {
  const [form, setForm] = useState({ username: "", password: "", domain: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Get tokens
      const res = await axios.post(`${API_BASE}/token/`, {
        username: form.username,
        password: form.password,
      });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // Get profile
      const profile = await API.get("/auth/profile/");
      if (profile.data.role === "trainer") {
        // Navigate to trainer dashboard (domain-specific data will be fetched there)
        navigate("/trainer");
      } else {
        alert("Not a trainer account");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Trainer Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded-md"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-md"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={form.domain}
            onChange={(e) => setForm({ ...form, domain: e.target.value })}
            required
          >
            <option value="" disabled>
              Select Domain
            </option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="web_developer">Web Developer</option>
            <option value="testing">Testing</option>
            <option value="devops">DevOps</option>
            <option value="powerbi">Power BI</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}