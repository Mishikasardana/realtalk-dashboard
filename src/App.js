import React, { useState, useEffect } from 'react';
import { Settings, MessageCircle, TrendingUp, User, Brain, Zap, Target, BarChart3, CheckCircle, AlertCircle, Info } from 'lucide-react';

const RealTalkDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
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

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'suggestions', label: 'Suggestions', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const platforms = [
    { id: 'whatsapp', name: 'WhatsApp Web', color: '#25d366' },
    { id: 'linkedin', name: 'LinkedIn', color: '#0077b5' },
    { id: 'gmail', name: 'Gmail', color: '#ea4335' },
    { id: 'twitter', name: 'Twitter', color: '#1da1f2' }
  ];

  const tones = [
    { id: 'Professional', name: 'Professional', description: 'Formal and business-appropriate' },
    { id: 'Casual', name: 'Casual', description: 'Relaxed and friendly' },
    { id: 'Empathetic', name: 'Empathetic', description: 'Understanding and supportive' },
    { id: 'Assertive', name: 'Assertive', description: 'Confident and direct' },
    { id: 'Diplomatic', name: 'Diplomatic', description: 'Tactful and considerate' },
    { id: 'Enthusiastic', name: 'Enthusiastic', description: 'Energetic and positive' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePlatformToggle = (platformId) => {
    setSettings(prev => ({
      ...prev,
      enabledPlatforms: prev.enabledPlatforms.includes(platformId)
        ? prev.enabledPlatforms.filter(p => p !== platformId)
        : [...prev.enabledPlatforms, platformId]
    }));
  };

  const handleToneToggle = (toneId) => {
    setSettings(prev => ({
      ...prev,
      tonePreferences: prev.tonePreferences.includes(toneId)
        ? prev.tonePreferences.filter(t => t !== toneId)
        : [...prev.tonePreferences, toneId]
    }));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Suggestions</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalSuggestions}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Suggestions Used</p>
              <p className="text-3xl font-bold text-gray-900">{stats.suggestionsUsed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Time</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageResponseTime}s</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Tone</p>
              <p className="text-3xl font-bold text-gray-900">{stats.topTone}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Usage</h3>
        <div className="flex items-end space-x-2 h-32">
          {stats.weeklyUsage.map((usage, index) => (
            <div key={index} className="flex-1 bg-blue-200 rounded-t" style={{ height: `${(usage / 24) * 100}%` }}>
              <div className="bg-blue-500 rounded-t h-full flex items-end justify-center pb-1">
                <span className="text-xs text-white font-medium">{usage}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );

  const renderSuggestions = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Try RealTalk AI</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              placeholder="Type your message here and see how RealTalk AI can improve it..."
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get Suggestions
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Professional</h4>
          <p className="text-gray-600 text-sm mb-3">Formal and business-appropriate tone</p>
          <div className="bg-gray-50 p-3 rounded border italic text-sm">
            "I would like to schedule a meeting to discuss the project timeline and deliverables."
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Casual</h4>
          <p className="text-gray-600 text-sm mb-3">Relaxed and friendly tone</p>
          <div className="bg-gray-50 p-3 rounded border italic text-sm">
            "Hey! Want to grab coffee and chat about the project? I'd love to hear your thoughts!"
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Empathetic</h4>
          <p className="text-gray-600 text-sm mb-3">Understanding and supportive tone</p>
          <div className="bg-gray-50 p-3 rounded border italic text-sm">
            "I understand this might be challenging. Let's work together to find a solution that works for everyone."
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Assertive</h4>
          <p className="text-gray-600 text-sm mb-3">Confident and direct tone</p>
          <div className="bg-gray-50 p-3 rounded border italic text-sm">
            "I need the project completed by Friday. Please confirm you can meet this deadline."
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Usage</h3>
          <div className="space-y-3">
            {platforms.map(platform => (
              <div key={platform.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: platform.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                </div>
                <span className="text-sm text-gray-600">{Math.floor(Math.random() * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tone Preferences</h3>
          <div className="space-y-3">
            {tones.slice(0, 4).map(tone => (
              <div key={tone.id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{tone.name}</span>
                <span className="text-sm text-gray-600">{Math.floor(Math.random() * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { platform: 'WhatsApp', tone: 'Casual', time: '2 minutes ago' },
            { platform: 'LinkedIn', tone: 'Professional', time: '15 minutes ago' },
            { platform: 'Gmail', tone: 'Diplomatic', time: '1 hour ago' },
            { platform: 'WhatsApp', tone: 'Empathetic', time: '2 hours ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{activity.platform}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{activity.tone}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI API Key</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your OpenAI API key"
              value={settings.apiKey}
              onChange={(e) => handleSettingChange('apiKey', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Get your API key from <a href="https://platform.openai.com/api-keys" className="text-blue-600 hover:underline">OpenAI</a>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enabled Platforms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map(platform => (
            <div key={platform.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={platform.id}
                checked={settings.enabledPlatforms.includes(platform.id)}
                onChange={() => handlePlatformToggle(platform.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={platform.id} className="flex items-center space-x-2 cursor-pointer">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }}></div>
                <span className="text-sm font-medium text-gray-700">{platform.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tone Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tones.map(tone => (
            <div key={tone.id} className="flex items-start space-x-3">
              <input
                type="checkbox"
                id={tone.id}
                checked={settings.tonePreferences.includes(tone.id)}
                onChange={() => handleToneToggle(tone.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
              />
              <label htmlFor={tone.id} className="cursor-pointer">
                <div className="text-sm font-medium text-gray-700">{tone.name}</div>
                <div className="text-xs text-gray-500">{tone.description}</div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="autoSuggest"
              checked={settings.autoSuggest}
              onChange={(e) => handleSettingChange('autoSuggest', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="autoSuggest" className="text-sm font-medium text-gray-700">
              Auto-suggest while typing
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suggestion Delay (ms)
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={settings.suggestionDelay}
              onChange={(e) => handleSettingChange('suggestionDelay', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>100ms</span>
              <span className="font-medium">{settings.suggestionDelay}ms</span>
              <span>1000ms</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Save Settings
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">RealTalk AI Dashboard</h1>
            <p className="text-gray-600 mt-2">Enhance your conversations with AI-powered suggestions</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64">
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="flex-1">
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
