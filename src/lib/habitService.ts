import { supabase } from './supabase';
import { Habit } from '@/types';

// Nota: Asegúrate de haber creado la tabla "habits" en Supabase con las siguientes columnas:
// - id (uuid, primary key)
// - name (text)
// - description (text)
// - daily_goal (integer)
// - completed_dates (jsonb array)
// - color (text)
// - created_at (timestamp)
// - updated_at (timestamp)
// - user_id (uuid, opcional si usas autenticación)

export async function fetchHabits(): Promise<Habit[]> {
  try {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data?.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      dailyGoal: item.daily_goal,
      color: item.color,
      createdAt: new Date(item.created_at),
      completedDates: item.completed_dates || [],
    })) || [];
  } catch (error) {
    console.error('Error fetching habits:', error);
    return [];
  }
}

export async function createHabit(habit: Omit<Habit, 'id' | 'createdAt'>) {
  try {
    const { data, error } = await supabase
      .from('habits')
      .insert([
        {
          name: habit.name,
          description: habit.description,
          daily_goal: habit.dailyGoal,
          color: habit.color,
          completed_dates: habit.completedDates,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error creating habit:', error);
    throw error;
  }
}

export async function updateHabit(id: string, updates: Partial<Habit>) {
  try {
    const { data, error } = await supabase
      .from('habits')
      .update({
        ...(updates.name && { name: updates.name }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.dailyGoal && { daily_goal: updates.dailyGoal }),
        ...(updates.color && { color: updates.color }),
        ...(updates.completedDates && { completed_dates: updates.completedDates }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error updating habit:', error);
    throw error;
  }
}

export async function deleteHabit(id: string) {
  try {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting habit:', error);
    throw error;
  }
}
