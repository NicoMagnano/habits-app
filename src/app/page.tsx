'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  AddHabitForm,
  DashboardView,
  ReportsView,
  TabNavigation,
} from '@/components';
import { Habit } from '@/types';
import { TrendingUp } from 'lucide-react';

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports'>(
    'dashboard'
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Load habits from localStorage on component mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      try {
        const parsed = JSON.parse(savedHabits);
        setHabits(parsed);
      } catch (error) {
        console.error('Error loading habits:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits, isLoaded]);

  const handleAddHabit = (habitData: Omit<Habit, 'id' | 'completedDates' | 'createdAt'>) => {
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      ...habitData,
      createdAt: new Date(),
      completedDates: [],
    };
    setHabits([...habits, newHabit]);
  };

  const handleToggleHabit = (habitId: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(today);
          return {
            ...habit,
            completedDates: isCompleted
              ? habit.completedDates.filter((date) => date !== today)
              : [...habit.completedDates, today],
          };
        }
        return habit;
      })
    );
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits(habits.filter((habit) => habit.id !== habitId));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  HabitTracker
                </h1>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Construye mejores hábitos
                </p>
              </div>
            </div>
          </div>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <DashboardView
              habits={habits}
              onToggleHabit={handleToggleHabit}
              onDeleteHabit={handleDeleteHabit}
            />
            <AddHabitForm onAddHabit={handleAddHabit} />
          </div>
        )}

        {activeTab === 'reports' && (
          <ReportsView habits={habits} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-zinc-600 dark:text-zinc-400 text-sm">
          <p>
            © 2026 HabitTracker. Hecho con ❤️ para mejorar tus hábitos.
          </p>
        </div>
      </footer>
    </div>
  );
}
