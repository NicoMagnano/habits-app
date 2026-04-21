export interface Habit {
  id: string;
  name: string;
  description: string;
  dailyGoal: number;
  createdAt: Date;
  completedDates: string[]; // YYYY-MM-DD format
  color: string;
}

export interface DailyCompletion {
  date: string; // YYYY-MM-DD format
  habitId: string;
}

export interface WeeklyStats {
  habitId: string;
  habitName: string;
  completionRate: number;
  completedDays: number;
  totalDays: number;
}
