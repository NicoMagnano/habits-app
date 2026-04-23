'use client';

import { useState } from 'react';
import { Plus, X, Zap, Dumbbell, Book, Apple, Moon, Heart, Music, Code } from 'lucide-react';
import { Habit } from '@/types';

interface AddHabitFormProps {
  onAddHabit: (habit: Omit<Habit, 'id' | 'completedDates' | 'createdAt'>) => Promise<void>;
}

const colors = [
  'bg-emerald-100 dark:bg-emerald-900/30',
  'bg-blue-100 dark:bg-blue-900/30',
  'bg-violet-100 dark:bg-violet-900/30',
  'bg-rose-100 dark:bg-rose-900/30',
  'bg-amber-100 dark:bg-amber-900/30',
  'bg-cyan-100 dark:bg-cyan-900/30',
];

const icons = [
  { name: 'Zap', component: Zap },
  { name: 'Dumbbell', component: Dumbbell },
  { name: 'Book', component: Book },
  { name: 'Apple', component: Apple },
  { name: 'Moon', component: Moon },
  { name: 'Heart', component: Heart },
  { name: 'Music', component: Music },
  { name: 'Code', component: Code },
];

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export function AddHabitForm({ onAddHabit }: AddHabitFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dailyGoal: 1,
    color: colors[0],
    icon: 'Zap',
    scheduleDays: daysOfWeek,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.scheduleDays.length > 0) {
      await onAddHabit({
        name: formData.name,
        description: formData.description,
        dailyGoal: formData.dailyGoal,
        color: formData.color,
        icon: formData.icon,
        scheduleDays: formData.scheduleDays,
      });
      setFormData({
        name: '',
        description: '',
        dailyGoal: 1,
        color: colors[0],
        icon: 'Zap',
        scheduleDays: daysOfWeek,
      });
      setIsOpen(false);
    }
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      scheduleDays: prev.scheduleDays.includes(day)
        ? prev.scheduleDays.filter((d) => d !== day)
        : [...prev.scheduleDays, day],
    }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-6 py-4 bg-emerald-50 dark:bg-emerald-950 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-300 font-semibold"
      >
        <Plus className="w-5 h-5" />
        Agregar nuevo hábito
      </button>
    );
  }

  const selectedIcon = icons.find((i) => i.name === formData.icon);
  const IconComponent = selectedIcon?.component || Zap;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Nuevo hábito
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Nombre del hábito
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Ej: Meditar, Hacer ejercicio..."
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe por qué es importante este hábito..."
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Meta diaria (veces)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.dailyGoal}
            onChange={(e) =>
              setFormData({
                ...formData,
                dailyGoal: parseInt(e.target.value) || 1,
              })
            }
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Icono
          </label>
          <div className="grid grid-cols-8 gap-2">
            {icons.map((icon) => {
              const Icon = icon.component;
              return (
                <button
                  key={icon.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: icon.name })}
                  className={`w-full aspect-square rounded-lg flex items-center justify-center border-2 transition-colors ${
                    formData.icon === icon.name
                      ? 'border-zinc-900 dark:border-zinc-50 bg-zinc-100 dark:bg-zinc-800'
                      : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                  title={icon.name}
                >
                  <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Color
          </label>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-full aspect-square rounded-lg border-2 ${
                  formData.color === color
                    ? 'border-zinc-900 dark:border-zinc-50'
                    : 'border-transparent'
                } ${color}`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            Días de la semana
          </label>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`py-2 px-1 rounded-lg font-medium text-sm transition-colors ${
                  formData.scheduleDays.includes(day)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
          >
            Crear hábito
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
