import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, BookText as TikTok, Chrome, Clock, Database, DollarSign, Github, Linkedin, Mail } from 'lucide-react';

interface UsageData {
  timeSpent: number;
  dataUsed: number;
  cost: number;
  isActive: boolean;
  url: string;
}

interface AppData {
  [key: string]: UsageData;
}

function App() {
  const [usageData, setUsageData] = useState<AppData>({
    Facebook: { 
      timeSpent: 0, 
      dataUsed: 0, 
      cost: 0, 
      isActive: false,
      url: 'https://facebook.com'
    },
    Instagram: { 
      timeSpent: 0, 
      dataUsed: 0, 
      cost: 0, 
      isActive: false,
      url: 'https://instagram.com'
    },
    TikTok: { 
      timeSpent: 0, 
      dataUsed: 0, 
      cost: 0, 
      isActive: false,
      url: 'https://tiktok.com'
    },
    Google: { 
      timeSpent: 0, 
      dataUsed: 0, 
      cost: 0, 
      isActive: false,
      url: 'https://google.com'
    },
  });

  // Update all active apps
  useEffect(() => {
    const interval = setInterval(() => {
      setUsageData(prev => {
        const newData = { ...prev };
        Object.keys(newData).forEach(app => {
          if (newData[app].isActive) {
            newData[app] = {
              ...newData[app],
              timeSpent: newData[app].timeSpent + 1,
              dataUsed: newData[app].dataUsed + Math.random() * 0.5, // Random data usage between 0-0.5 MB
              cost: newData[app].cost + 0.01, // $0.01 per minute
            };
          }
        });
        return newData;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const openApp = (appName: string) => {
    const app = usageData[appName];
    // Open the app in a new tab
    window.open(app.url, '_blank');
    
    // Start tracking
    setUsageData(prev => ({
      ...prev,
      [appName]: {
        ...prev[appName],
        isActive: true,
      },
    }));
  };

  const stopTracking = (appName: string) => {
    setUsageData(prev => ({
      ...prev,
      [appName]: {
        ...prev[appName],
        isActive: false,
      },
    }));
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAppIcon = (appName: string) => {
    switch (appName) {
      case 'Facebook':
        return <Facebook className="w-6 h-6" />;
      case 'Instagram':
        return <Instagram className="w-6 h-6" />;
      case 'TikTok':
        return <TikTok className="w-6 h-6" />;
      case 'Google':
        return <Chrome className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-purple-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Data Tracker</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(usageData).map(([app, data]) => (
            <button
              key={app}
              onClick={() => data.isActive ? stopTracking(app) : openApp(app)}
              className={`p-4 rounded-lg transition-all ${
                data.isActive
                  ? 'bg-purple-600 shadow-lg scale-105'
                  : 'bg-black/50 hover:bg-purple-900'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                {getAppIcon(app)}
              </div>
              <div className="text-center">{app}</div>
              <div className="text-sm mt-2">
                {data.isActive ? 'Click to Stop' : 'Click to Open'}
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(usageData).map(([app, data]) => (
            <div
              key={app}
              className="bg-black/30 p-6 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getAppIcon(app)}
                  <h2 className="text-xl font-semibold">{app}</h2>
                </div>
                <div className={`h-2 w-2 rounded-full ${
                  data.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`} />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>Time: {formatTime(data.timeSpent)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-red-400" />
                  <span>Data: {data.dataUsed.toFixed(2)} MB</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span>Cost: ${data.cost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About Developer Section */}
        <div className="bg-black/30 p-8 rounded-lg backdrop-blur-sm mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center">About the Developer</h2>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Lyndon Domini Catan</h3>
              <p className="text-purple-300">Web Developer from Philippines, Metro Manila</p>
              <p className="text-gray-300 mt-2">New Era University</p>
            </div>
            
            <p className="text-gray-200 text-center mb-6">
              I'm passionate about building innovative web applications that solve real-world problems. 
              This Data Tracker is one of my personal projects, and I'm excited to create more 
              impactful solutions as I continue my journey as a web developer.
            </p>

            <div className="flex justify-center gap-6">
              <a 
                href="https://github.com/Lyndoncatan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-purple-400 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/lyndon-domini-m-catan/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-purple-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="mailto:catanlyndon200316@gmail.com" 
                className="hover:text-purple-400 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;