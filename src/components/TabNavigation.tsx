'use client';

import { BarChart3, Home } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'dashboard' | 'reports';
  onTabChange: (tab: 'dashboard' | 'reports') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => onTabChange('dashboard')}
        className={`px-6 py-3 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
          activeTab === 'dashboard'
            ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
            : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
        }`}
      >
        <Home className="w-5 h-5" />
        Dashboard
      </button>
      <button
        onClick={() => onTabChange('reports')}
        className={`px-6 py-3 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
          activeTab === 'reports'
            ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
            : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
        }`}
      >
        <BarChart3 className="w-5 h-5" />
        Reportes
      </button>
    </div>
  );
}
