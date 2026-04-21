'use client';

import { Habit } from '@/types';
import { CheckCircle2, Circle, Trash2, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface HabitCardProps {
  habit: Habit;
  isCompletedToday: boolean;
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export function HabitCard({
  habit,
  isCompletedToday,
  onToggle,
  onDelete,
}: HabitCardProps) {
  const completionCount = habit.completedDates.length;
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {habit.name}
            </h3>
            <Zap className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {habit.description}
          </p>
        </div>
        <button
          onClick={() => onDelete(habit.id)}
          className="text-zinc-400 hover:text-red-500 transition-colors p-2 -mr-2"
          aria-label="Eliminar hábito"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggle(habit.id)}
            className="flex-shrink-0 focus:outline-none"
            aria-label={
              isCompletedToday
                ? 'Marcar como no completado'
                : 'Marcar como completado'
            }
          >
            {isCompletedToday ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            ) : (
              <Circle className="w-8 h-8 text-zinc-300 dark:text-zinc-700 hover:text-emerald-500" />
            )}
          </button>
          <div>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {isCompletedToday ? 'Completado hoy' : 'No completado hoy'}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              {completionCount} días completados
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {completionCount}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            {habit.dailyGoal}x/día
          </p>
        </div>
      </div>
    </div>
  );
}
