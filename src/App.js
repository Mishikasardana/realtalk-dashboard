import React, { useState } from 'react';
import { Settings, MessageCircle, TrendingUp, Brain, Zap, Target, BarChart3, CheckCircle } from 'lucide-react';
import './App.css';

const RealTalkDashboard = () => {
  const [activeTab, setActiveTab] = useState('suggestions');

  const [settings, setSettings] = useState({
    apiKey: '',
    enabledPlatforms: ['whatsapp', 'linkedin', 'gmail'],
    tonePreferences: ['Professional', 'Casual', 'Empathetic', 'Assertive'],
    autoSuggest: true,
    suggestionDelay: 300
  });

  const [stats, setStats] = useState({
    totalSuggestions: 1247,
    suggestionsUsed: 892,
    averageResponseTime: 0.3,
    topTone: 'Professional',
    weeklyUsage: [12, 19, 8, 15, 22, 18, 24]
  });

  const [inputMessage, setInputMessage] = useState('');
  const [suggestions, setSuggestions] = useState({});

  const getSuggestions = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage })
      });
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'suggestions', label: 'Suggestions', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderSuggestions = () => (
    <div className="suggestions-content">
      <div className="try-section">
        <h3 className="section-title">Try RealTalk AI</h3>
        <div className="form-group">
          <div className="input-group">
            <label className="input-label">Your Message</label>
            <textarea
              className="textarea"
              rows="4"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here and see how RealTalk AI can improve it..."
            />
          </div>
          <button className="btn btn-primary" onClick={getSuggestions}>
            Get Suggestions
          </button>
        </div>
      </div>

      {Object.keys(suggestions).length > 0 && (
        <div className="suggestions-grid">
          {Object.entries(suggestions).map(([tone, suggestion]) => (
            <div key={tone} className="suggestion-card">
              <h4 className="suggestion-title">{tone}</h4>
              <p className="suggestion-description">{suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderDashboard = () => (
    <div className="dashboard-content">
      {/* Your existing dashboard code here */}
      <p>Dashboard will go here...</p>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics-content">
      {/* Your analytics UI here */}
      <p>Analytics section coming soon...</p>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-content">
      {/* Your settings UI here */}
      <p>Settings form coming soon...</p>
    </div>
  );

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="header-content">
            <h1 className="app-title">RealTalk AI Dashboard</h1>
            <p className="app-subtitle">Enhance your conversations with AI-powered suggestions</p>
          </div>

          <div className="main-content">
            <div className="sidebar">
              <nav className="navigation">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`nav-button ${activeTab === tab.id ? 'nav-button-active' : ''}`}
                    >
                      <Icon className="nav-icon" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="content">
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'suggestions' && renderSuggestions()}
              {activeTab === 'analytics' && renderAnalytics()}
              {activeTab === 'settings' && renderSettings()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTalkDashboard;


