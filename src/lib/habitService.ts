import { supabase } from './supabase';
import { Habit } from '@/types';

export async function fetchHabits(): Promise<Habit[]> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('User not authenticated');
      return [];
    }

    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', user.id)
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
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

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
          user_id: user.id,
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
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

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
      .eq('user_id', user.id)
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
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting habit:', error);
    throw error;
  }
}
