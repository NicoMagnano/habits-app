'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  AddHabitForm,
  DashboardView,
  ReportsView,
  TabNavigation,
  Auth,
} from '@/components';
import { Habit } from '@/types';
import { TrendingUp } from 'lucide-react';
import { fetchHabits, createHabit, updateHabit, deleteHabit } from '@/lib/habitService';
import { supabase } from '@/lib/supabase';

interface User {
  email: string;
}

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports'>('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Check authentication and load user
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser?.email) {
          setUser({ email: authUser.email });
        }
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user?.email) {
          setUser({ email: session.user.email });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Load habits when user changes
  useEffect(() => {
    if (!user) {
      setHabits([]);
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    const loadHabits = async () => {
      try {
        setIsLoading(true);
        const data = await fetchHabits();
        setHabits(data);
      } catch (error) {
        console.error('Error loading habits:', error);
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    };
    loadHabits();
  }, [user]);

  const handleAuthChange = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser?.email) {
      setUser({ email: authUser.email });
    } else {
      setUser(null);
    }
  };

  const handleAddHabit = async (habitData: Omit<Habit, 'id' | 'completedDates' | 'createdAt'>) => {
    try {
      const newHabitData: Omit<Habit, 'id' | 'createdAt'> = {
        ...habitData,
        completedDates: [],
      };
      const newHabit = await createHabit(newHabitData);
      if (newHabit) {
        const mappedHabit: Habit = {
          id: newHabit.id,
          name: newHabit.name,
          description: newHabit.description,
          dailyGoal: newHabit.daily_goal,
          color: newHabit.color,
          createdAt: new Date(newHabit.created_at),
          completedDates: newHabit.completed_dates || [],
        };
        setHabits([...habits, mappedHabit]);
      }
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const handleToggleHabit = async (habitId: string) => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const habit = habits.find((h) => h.id === habitId);
      if (!habit) return;

      const isCompleted = habit.completedDates.includes(today);
      const updatedDates = isCompleted
        ? habit.completedDates.filter((date) => date !== today)
        : [...habit.completedDates, today];

      await updateHabit(habitId, { completedDates: updatedDates });
      
      setHabits(
        habits.map((h) =>
          h.id === habitId ? { ...h, completedDates: updatedDates } : h
        )
      );
    } catch (error) {
      console.error('Error toggling habit:', error);
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await deleteHabit(habitId);
      setHabits(habits.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  // Show Auth screen if not authenticated
  if (!user) {
    return <Auth user={null} onAuthChange={handleAuthChange} />;
  }

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
            <Auth user={user} onAuthChange={handleAuthChange} />
          </div>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-zinc-600 dark:text-zinc-400">Cargando tus hábitos...</p>
            </div>
          </div>
        ) : (
          <>
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
          </>
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
