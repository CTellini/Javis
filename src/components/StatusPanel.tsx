import React from 'react';

interface Metric {
  label: string;
  value: string;
  color: 'cyan' | 'green' | 'blue';
  status?: 'online' | 'offline' | 'warning';
}

interface StatusPanelProps {
  title: string;
  icon: React.ReactNode;
  metrics: Metric[];
}

const StatusPanel: React.FC<StatusPanelProps> = ({ title, icon, metrics }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan':
        return 'text-cyan-400';
      case 'green':
        return 'text-green-400';
      case 'blue':
        return 'text-blue-400';
      default:
        return 'text-cyan-400';
    }
  };

  const getStatusIndicator = (status?: string) => {
    switch (status) {
      case 'online':
        return <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />;
      case 'offline':
        return <div className="w-2 h-2 bg-red-400 rounded-full" />;
      case 'warning':
        return <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />;
      default:
        return null;
    }
  };
  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-400/40 transition-colors duration-300">
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-cyan-400">
          {icon}
        </div>
        <h3 className="text-cyan-300 font-orbitron font-semibold text-sm">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-300 text-xs">{metric.label}</span>
            <div className="flex items-center space-x-2">
              {getStatusIndicator(metric.status)}
              <span className={`text-xs font-mono font-semibold ${getColorClasses(metric.color)}`}>
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusPanel;