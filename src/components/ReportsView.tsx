'use client';

import { Habit } from '@/types';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

interface ReportsViewProps {
  habits: Habit[];
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f43f5e', '#f59e0b', '#06b6d4'];

export function ReportsView({ habits }: ReportsViewProps) {
  // Calculate weekly statistics
  const getLastSevenDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      days.push({
        date: format(date, 'yyyy-MM-dd'),
        label: format(date, 'EEE', { locale: es }).toUpperCase(),
      });
    }
    return days;
  };

  const lastSevenDays = getLastSevenDays();

  // Data for bar chart (weekly completion)
  const weeklyData = lastSevenDays.map((day) => {
    const obj: any = {
      name: day.label,
      date: day.date,
    };

    habits.forEach((habit) => {
      obj[habit.name] = habit.completedDates.includes(day.date) ? 1 : 0;
    });

    return obj;
  });

  // Data for line chart (cumulative completion)
  const cumulativeData = habits.map((habit) => {
    let cumulative = 0;
    const data = lastSevenDays.map((day) => {
      if (habit.completedDates.includes(day.date)) {
        cumulative++;
      }
      return {
        name: day.label,
        [habit.name]: cumulative,
      };
    });
    return { habitName: habit.name, data };
  });

  // Data for overall statistics
  const overallStats = habits.map((habit) => ({
    name: habit.name,
    completions: habit.completedDates.length,
    percentage: habit.completedDates.length > 0 ? 100 : 0,
  }));

  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.completedDates.length,
    0
  );

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Hábitos activos
          </p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {habits.length}
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Esta semana
          </p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {lastSevenDays
              .reduce((sum, day) => {
                return (
                  sum +
                  habits.filter((h) => h.completedDates.includes(day.date))
                    .length
                );
              }, 0) || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Total completado
          </p>
          <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
            {totalCompletions}
          </p>
        </div>
      </div>

      {/* Weekly Completion Chart */}
      {habits.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Completación semanal
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e4e4e7"
                className="dark:stroke-zinc-800"
              />
              <XAxis dataKey="name" stroke="#6b7280" className="text-xs" />
              <YAxis stroke="#6b7280" className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e4e7',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              {habits.slice(0, 3).map((habit, index) => (
                <Bar
                  key={habit.id}
                  dataKey={habit.name}
                  fill={COLORS[index % COLORS.length]}
                  radius={[8, 8, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Cumulative Progress */}
      {habits.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Progreso acumulativo (esta semana)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cumulativeData[0]?.data || []}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e4e4e7"
                className="dark:stroke-zinc-800"
              />
              <XAxis dataKey="name" stroke="#6b7280" className="text-xs" />
              <YAxis stroke="#6b7280" className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e4e7',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              {habits.slice(0, 3).map((habit, index) => (
                <Line
                  key={habit.id}
                  type="monotone"
                  dataKey={habit.name}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Individual Habit Stats */}
      {habits.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {habits.map((habit, index) => {
            const weekCompletions = lastSevenDays.filter((day) =>
              habit.completedDates.includes(day.date)
            ).length;
            const completionRateWeek =
              Math.round((weekCompletions / 7) * 100);

            return (
              <div
                key={habit.id}
                className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-50">
                    {habit.name}
                  </h4>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {completionRateWeek}%
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        Esta semana
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {weekCompletions}/7
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${completionRateWeek}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {lastSevenDays.map((day) => (
                      <button
                        key={day.date}
                        className={`p-2 rounded text-xs font-medium text-center ${
                          habit.completedDates.includes(day.date)
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {habits.length === 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center">
          <p className="text-zinc-600 dark:text-zinc-400">
            No hay hábitos para mostrar. Crea uno para ver los reportes.
          </p>
        </div>
      )}
    </div>
  );
}
