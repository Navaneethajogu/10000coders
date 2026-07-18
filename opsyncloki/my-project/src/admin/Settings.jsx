import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Save, X } from 'lucide-react';

const Settings = () => {
  const [userSettings, setUserSettings] = useState({
    username: 'admin',
    email: 'admin@tms.com',
    password: '',
  });

  const [systemPreferences, setSystemPreferences] = useState({
    defaultDomain: 'Java',
    dateFormat: 'mm/dd/yyyy',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleUserSettingsChange = (e) => {
    setUserSettings({ ...userSettings, [e.target.name]: e.target.value });
  };

  const handleSystemPreferencesChange = (e) => {
    setSystemPreferences({ ...systemPreferences, [e.target.name]: e.target.value });
  };

  const handleNotificationsChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleSave = () => {
    // Simulate saving settings (e.g., API call)
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
          <SettingsIcon size={24} className="mr-2" /> System Settings
        </h2>

        {/* User Account Settings */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
            <User size={20} className="mr-2" /> User Account
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={userSettings.username}
                onChange={handleUserSettingsChange}
                className="w-full p-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userSettings.email}
                onChange={handleUserSettingsChange}
                className="w-full p-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">New Password</label>
              <input
                type="password"
                name="password"
                value={userSettings.password}
                onChange={handleUserSettingsChange}
                className="w-full p-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter new password"
              />
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
            <SettingsIcon size={20} className="mr-2" /> System Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Default Domain</label>
              <select
                name="defaultDomain"
                value={systemPreferences.defaultDomain}
                onChange={handleSystemPreferencesChange}
                className="w-full p-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="Web Development">Web Development</option>
                <option value="DevOps">DevOps</option>
                <option value="Testing">Testing</option>
                <option value="Power BI">Power BI</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Date Format</label>
              <select
                name="dateFormat"
                value={systemPreferences.dateFormat}
                onChange={handleSystemPreferencesChange}
                className="w-full p-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                <option value="yyyy-mm-dd">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
            <Bell size={20} className="mr-2" /> Notifications
          </h3>
          <div className="space-y-4">
            <label className="flex items-center text-sm text-slate-400">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationsChange}
                className="mr-2 h-4 w-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-600"
              />
              Enable Email Notifications
            </label>
            <label className="flex items-center text-sm text-slate-400">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={notifications.pushNotifications}
                onChange={handleNotificationsChange}
                className="mr-2 h-4 w-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-600"
              />
              Enable Push Notifications
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors duration-200"
          >
            <Save size={20} className="mr-2" /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
