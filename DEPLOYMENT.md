# 🚀 Guía de Deployment - HabitTracker

Esta guía te ayudará a desplegar HabitTracker a Vercel y configurarrlo con Supabase.

## Parte 1: Configurar Supabase (Base de datos)

### Paso 1: Crear cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Regístrate o inicia sesión con GitHub
4. Crea un nuevo proyecto

### Paso 2: Obtener credenciales
1. En el dashboard de Supabase, ve a **Settings → API**
2. Copia tu `Project URL` 
3. Copia tu `anon public` key
4. Guarda estos datos (los necesitarás después)

### Paso 3: Crear tabla en Supabase
En el SQL Editor de Supabase, ejecuta este SQL:

```sql
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  daily_goal INTEGER NOT NULL DEFAULT 1,
  color TEXT NOT NULL DEFAULT 'bg-emerald-100',
  completed_dates JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX habits_created_at_idx ON habits(created_at DESC);

-- Habilitaractualmente RLS (Row Level Security) si quieres (opcional)
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
```

### Paso 4: Generar políticas RLS (Opcional - para seguridad)

Si habilitaste RLS, crea estas políticas:

```sql
-- Permitir que todos lean
CREATE POLICY "Allow public read" ON habits
  FOR SELECT USING (true);

-- Permitir que todos creen registros
CREATE POLICY "Allow public insert" ON habits
  FOR INSERT WITH CHECK (true);

-- Permitir que todos actualicen
CREATE POLICY "Allow public update" ON habits
  FOR UPDATE USING (true);

-- Permitir que todos eliminen
CREATE POLICY "Allow public delete" ON habits
  FOR DELETE USING (true);
```

---

## Parte 2: Desplegar a Vercel

### Opción A: Via GitHub (RECOMENDADO)

#### Paso 1: Preparar el repositorio
```bash
cd /Users/nicolasmagnano/Desktop/habits-app

# Inicializar git si no está inicializado
git init
git add .
git commit -m "Initial commit - HabitTracker"

# Crear repo en GitHub
# Ve a github.com, crea un nuevo repositorio llamado "habits-app"
# Luego sigue las instrucciones para push tu código:

git branch -M main
git remote add origin https://github.com/tu_usuario/habits-app.git
git push -u origin main
```

#### Paso 2: Importar a Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en "New Project"
4. Selecciona el repositorio `habits-app`
5. Haz clic en "Import"

#### Paso 3: Configurar variables de entorno
1. En el formulario de Vercel, abre **Environment Variables**
2. Añade:
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
     **Value:** `tu_url_de_supabase`
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     **Value:** `tu_clave_anonima_de_supabase`
3. Haz clic en "Deploy"

---

### Opción B: Via CLI (Alternativa)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde la carpeta del proyecto
cd /Users/nicolasmagnano/Desktop/habits-app
vercel

# Sigue las instrucciones interactivas
# Responde "Yes" a "Set up and deploy?"
# Configura las variables de entorno cuando se te pida
```

---

## Parte 3: Usar Supabase en la aplicación

### Opción 1: Usar localStorage (por defecto - sin cambios necesarios)

La aplicación actualmente usa localStorage y funciona sin Supabase configurado.

### Opción 2: Migrar a Supabase (cuando estés listo)

Si quieres usar Supabase como base de datos, actualiza `src/app/page.tsx`:

**Paso 1:** Cambia el componente principal para usar Supabase:

```typescript
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
import { fetchHabits, createHabit, updateHabit, deleteHabit } from '@/lib/habitService';

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports'>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar hábitos desde Supabase
  useEffect(() => {
    async function loadHabits() {
      try {
        const data = await fetchHabits();
        setHabits(data);
      } catch (error) {
        console.error('Error al cargar hábitos:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadHabits();
  }, []);

  const handleAddHabit = async (habitData: Omit<Habit, 'id' | 'completedDates' | 'createdAt'>) => {
    try {
      const newHabit: Habit = {
        id: Math.random().toString(36).substr(2, 9),
        ...habitData,
        createdAt: new Date(),
        completedDates: [],
      };
      
      // Si Supabase está configurado, guardar en BD
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await createHabit(newHabit);
      }
      
      setHabits([...habits, newHabit]);
    } catch (error) {
      console.error('Error al crear hábito:', error);
    }
  };

  const handleToggleHabit = async (habitId: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDates.includes(today);
        const updatedHabit = {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter((date) => date !== today)
            : [...habit.completedDates, today],
        };
        
        // Si Supabase está configurado, actualizar en BD
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
          updateHabit(habitId, updatedHabit);
        }
        
        return updatedHabit;
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  const handleDeleteHabit = async (habitId: string) => {
    try {
      // Si Supabase está configurado, eliminar de BD
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await deleteHabit(habitId);
      }
      
      setHabits(habits.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error('Error al eliminar hábito:', error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* ... resto del componente igual que antes ... */}
    </div>
  );
}
```

---

## Verificar que todo funciona

Después del deployment:

1. Ve a tu URL de Vercel (ej: `https://habits-app-xyz.vercel.app`)
2. Crea un hábito de prueba
3. Marca como completado
4. Recarga la página → Los datos deben persistir ✅

---

## URLs útiles

- **Dashboard Vercel:** https://vercel.com/dashboard
- **Console Supabase:** https://app.supabase.com
- **Logs de Vercel:** https://vercel.com/dashboard/[tu-proyecto]/logs
- **Docs Supabase JS:** https://supabase.com/docs/reference/javascript

---

## Troubleshooting

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"
→ Comprueba que las variables de entorno estén configuradas en Vercel

### Error: "Failed to connect to Supabase"
→ Verifica que la URL y clave sean correctas

### Los datos no persisten
→ Comprueba que localStorage o Supabase estén habilitados

### La tabla no existe en Supabase
→ Ejecuta el SQL de creación de tabla nuevamente

---

## Próximos pasos

- ✅ Autenticación con Supabase Auth (Google, GitHub)
- ✅ Backups automáticos
- ✅ Sincronización entre dispositivos
- ✅ Exportar datos a CSV/PDF

¡Felicidades! Tu app está ahora en producción 🎉
