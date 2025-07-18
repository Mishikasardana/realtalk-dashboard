import React, { useEffect, useState } from 'react';
import {
  Settings,
  MessageCircle,
  TrendingUp,
  Brain,
  Zap,
  Target,
  BarChart3,
  CheckCircle,
} from 'lucide-react';
import './App.css';

const RealTalkDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [settings, setSettings] = useState({
    apiKey: '',
    enabledPlatforms: ['whatsapp', 'linkedin', 'gmail'],
    tonePreferences: ['Professional', 'Casual', 'Empathetic', 'Assertive'],
    autoSuggest: true,
    suggestionDelay: 300,
  });

  const [stats, setStats] = useState({
    totalSuggestions: 1247,
    suggestionsUsed: 892,
    averageResponseTime: 0.3,
    topTone: 'Professional',
    weeklyUsage: [12, 19, 8, 15, 22, 18, 24],
  });

  const [inputMessage, setInputMessage] = useState('');
  const [suggestions, setSuggestions] = useState({});

  const getSuggestions = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
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
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderDashboard = () => (
  <div className="dashboard-content">
    <h2>Welcome to RealTalk AI</h2>
    <p>This dashboard gives you access to smart AI suggestions, analytics, and settings.</p>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-info">
            <div className="stat-label">Total Suggestions</div>
            <div className="stat-value">{stats.totalSuggestions}</div>
          </div>
          <div className="stat-icon stat-icon-blue">
            <Zap className="icon" />
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-info">
            <div className="stat-label">Suggestions Used</div>
            <div className="stat-value">{stats.suggestionsUsed}</div>
          </div>
          <div className="stat-icon stat-icon-green">
            <CheckCircle className="icon" />
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-info">
            <div className="stat-label">Top Tone</div>
            <div className="stat-value">{stats.topTone}</div>
          </div>
          <div className="stat-icon stat-icon-purple">
            <Target className="icon" />
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-info">
            <div className="stat-label">Avg Response Time</div>
            <div className="stat-value">{stats.averageResponseTime}s</div>
          </div>
          <div className="stat-icon stat-icon-yellow">
            <BarChart3 className="icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
);


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

  const renderAnalytics = () => (
    <div className="analytics-content">
      <h3 className="section-title">Usage Analytics</h3>

      <div className="chart-card">
        <h4 className="chart-title">Weekly Suggestion Usage</h4>

        {Array.isArray(stats?.weeklyUsage) ? (
          <>
            <div className="chart-container">
              {stats.weeklyUsage.map((value, index) => (
                <div className="chart-bar-wrapper" key={index}>
                  <div
                    className="chart-bar"
                    style={{ height: `${value * 5}px` }}
                  >
                    <div className="chart-bar-fill">
                      <span className="chart-bar-text">{value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-labels">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </>
        ) : (
          <p>No usage data found.</p>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
  <div className="settings-content">
    <h2>Settings</h2>

    <div className="settings-card">
      <h3 className="section-title">Preferred Platforms</h3>
      <div className="platforms-grid">
        {['WhatsApp', 'Instagram', 'Email', 'LinkedIn'].map((platform) => (
          <label key={platform} className="checkbox-label">
            <input type="checkbox" className="checkbox" />
            {platform}
          </label>
        ))}
      </div>
    </div>

    <div className="settings-card">
      <h3 className="section-title">Tone Preferences</h3>
      <div className="tones-grid">
        {[
          { name: 'Professional', desc: 'Use polite and formal language' },
          { name: 'Casual', desc: 'Friendly and relaxed tone' },
          { name: 'Persuasive', desc: 'Focused on convincing' },
        ].map((tone) => (
          <label key={tone.name} className="tone-checkbox">
            <input type="checkbox" className="checkbox" />
            <div className="tone-label">
              <div className="tone-name">{tone.name}</div>
              <div className="tone-description">{tone.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>

    <div className="settings-card">
      <h3 className="section-title">Suggestion Limit</h3>
      <div className="slider-group">
        <input type="range" min="1" max="10" defaultValue="5" className="slider" />
        <div className="slider-labels">
          <span>1</span>
          <span className="slider-value">5</span>
          <span>10</span>
        </div>
      </div>
    </div>
  </div>
);


  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="header-content">
            <h1 className="app-title">RealTalk AI Dashboard</h1>
            <p className="app-subtitle">
              Enhance your conversations with AI-powered suggestions
            </p>
          </div>

          <div className="main-content">
            <div className="sidebar">
              <nav className="navigation">
                {tabs.map((tab) => {
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

