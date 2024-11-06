import React, { useState } from 'react';
import ToggleSwitch from '../components/ToggleSwitch';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    deleteOldOffenses: false,
    lightMode: false,
    notifications: false,
    twoFactorAuth: false,
    dataRetentionPeriod: '30',
    logLevel: 'info',
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
    // Implement actual save logic here
  };

  return (
    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ToggleSwitch
          id="deleteOldOffenses"
          checked={settings.deleteOldOffenses}
          onChange={() => handleToggle('deleteOldOffenses')}
          label="Delete offenses older than one month"
        />
        <ToggleSwitch
          id="lightMode"
          checked={settings.lightMode}
          onChange={() => handleToggle('lightMode')}
          label="Light mode"
        />
        <ToggleSwitch
          id="notifications"
          checked={settings.notifications}
          onChange={() => handleToggle('notifications')}
          label="Activate notifications"
        />
        <ToggleSwitch
          id="twoFactorAuth"
          checked={settings.twoFactorAuth}
          onChange={() => handleToggle('twoFactorAuth')}
          label="Enable Two-Factor Authentication"
        />

        <div className="flex items-center justify-between py-2">
          <label htmlFor="dataRetentionPeriod" className="text-sm font-medium text-gray-300">
            Data Retention Period
          </label>
          <select
            id="dataRetentionPeriod"
            name="dataRetentionPeriod"
            value={settings.dataRetentionPeriod}
            onChange={handleChange}
            className="bg-gray-700 text-white p-2 rounded text-sm"
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-2">
          <label htmlFor="logLevel" className="text-sm font-medium text-gray-300">
            Log Level
          </label>
          <select
            id="logLevel"
            name="logLevel"
            value={settings.logLevel}
            onChange={handleChange}
            className="bg-gray-700 text-white p-2 rounded text-sm"
          >
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-2">
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
            onClick={() => {/* Implement logic to view blocked devices */}}
          >
            View Blocked Devices
          </button>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-blue-400 text-white px-4 py-2 rounded text-sm hover:bg-blue-500 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;