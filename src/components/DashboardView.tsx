'use client';

import { Habit } from '@/types';
import { HabitCard } from './HabitCard';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DashboardViewProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
  onDeleteHabit: (habitId: string) => void;
}

export function DashboardView({
  habits,
  onToggleHabit,
  onDeleteHabit,
}: DashboardViewProps) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayFormatted = format(new Date(), 'EEEE, d MMMM', { locale: es });

  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today)
  ).length;

  const completionPercentage =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header with Daily Progress */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Tu Dashboard
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 capitalize">
            {todayFormatted}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Progress Circle */}
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg
                className="transform -rotate-90"
                width="192"
                height="192"
                viewBox="0 0 192 192"
              >
                {/* Background circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-zinc-200 dark:text-zinc-800"
                />
                {/* Progress circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${((completionPercentage / 100) * 2 * Math.PI * 88).toFixed(1)} ${(2 * Math.PI * 88).toFixed(1)}`}
                  className="text-emerald-500 dark:text-emerald-400 transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">
                  {completionPercentage}%
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  Completado
                </p>
              </div>
            </div>
          </div>

          {/* Daily Summary */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-lg p-4">
              <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium mb-1">
                Completados hoy
              </p>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {completedToday}/{habits.length}
              </p>
            </div>

            {habits.length === 0 ? (
              <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Comienza añadiendo tu primer hábito
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">
                  Hábitos activos
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {habits.length}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Habits Grid */}
      {habits.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Tus hábitos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompletedToday={habit.completedDates.includes(today)}
                onToggle={onToggleHabit}
                onDelete={onDeleteHabit}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center">
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Aún no tienes hábitos. ¡Crea uno para empezar!
          </p>
        </div>
      )}
    </div>
  );
}
