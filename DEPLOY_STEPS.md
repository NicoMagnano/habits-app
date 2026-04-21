# 🎯 PASOS PARA DESPLEGAR A VERCEL + SUPABASE

## OPCIÓN 1: Solo Vercel (El más simple - La app funciona igual que ahora) ⚡

### Paso 1: Código → GitHub
```bash
cd /Users/nicolasmagnano/Desktop/habits-app

# Crear repositorio local
git init
git add .
git commit -m "Initial commit"

# Crear repo en GitHub.com
# → Nuevo repositorio llamado "habits-app"

# Conectar y subir
git remote add origin https://github.com/TU_USUARIO/habits-app.git
git branch -M main
git push -u origin main
```

### Paso 2: GitHub → Vercel
1. Ve a **vercel.com**
2. Haz clic en "Sign in" → "Sign in with GitHub"
3. Haz clic en "New Project"
4. Selecciona el repo "habits-app"
5. Haz clic en "Deploy"

**¡LISTO!** Tu app estará en vivo en: `https://habits-app-xyz.vercel.app` ✅

---

## OPCIÓN 2: Vercel + Supabase (Base de datos en la nube) 📊

### PASO A: Crear Supabase
1. Ve a **supabase.com**
2. Haz clic en "Sign up"
3. Registrate con GitHub
4. Crea un nuevo proyecto
5. Espera a que se inicialice (~2 min)

### PASO B: Obtener credenciales de Supabase
1. En el dashboard, ve a **Settings → API**
2. Copia `Project URL` y guarda en notas
3. Copia `anon public` key y guarda en notas

### PASO C: Crear tabla en Supabase
1. En el dashboard, ve a **SQL Editor**
2. Copia y pega esto:

```sql
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  daily_goal INTEGER NOT NULL DEFAULT 1,
  color TEXT NOT NULL,
  completed_dates JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX habits_created_at_idx ON habits(created_at DESC);

-- Para permitir acceso público (sin autenticación)
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON habits
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON habits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON habits
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON habits
  FOR DELETE USING (true);
```

3. Haz clic en "Run" (triángulo play)
4. Espera a que se ejecute ✅

### PASO D: Subir código y conectar a Vercel
```bash
# Desde la carpeta del proyecto
cd /Users/nicolasmagnano/Desktop/habits-app

# Crear repo local
git init
git add .
git commit -m "Initial commit with Supabase"

# Subir a GitHub (igual que OPCIÓN 1)
git remote add origin https://github.com/TU_USUARIO/habits-app.git
git branch -M main
git push -u origin main
```

### PASO E: Configurar variables en Vercel
1. En Vercel, ve a tu proyecto → **Settings**
2. Ve a **Environment Variables**
3. Añade dos variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (pega tu Project URL de Supabase)

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (pega tu anon key de Supabase)

4. Haz clic en "Save"

### PASO F: Desplegar
1. En Vercel, ve a **Deployments**
2. Haz clic en los 3 puntos del último deployment
3. Selecciona "Redeploy"
4. Espera a que termine

**¡LISTO!** Tu app ahora usa Supabase como base de datos 🎉

---

## 🧪 Verificar que funciona

1. Ve a tu URL de Vercel
2. Crea un hábito de prueba
3. Marca como completado
4. **Recarga la página** ← esto es importante
5. ¿Siguen tus datos? ✅ → ¡Funciona!

---

## 📱 Cómo acceder desde tu teléfono

Tu app está en vivo y accesible desde cualquier lugar:

```
https://habits-app-[nombre-aleatorio].vercel.app
```

Desde tu teléfono:
1. Abre el navegador
2. Pega la URL
3. ¡A usar tu app! 📱

---

## 🆘 Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not defined"
- ✅ Comprueba que agregaste la variable en Vercel Settings
- ✅ Verifica que la escribiste en la variable correcta
- ✅ Redeploya (hay un botón "Redeploy" en Vercel)

### "Failed to connect to Supabase"
- ✅ Copia de nuevo la URL y clave (sin espacios al inicio/final)
- ✅ La URL debe empezar con `https://`
- ✅ La clave debe tener al menos 20 caracteres

### "Los datos no se guardan"
- ✅ Si usas Solo Vercel → Recarga la página, ¿aparecen? Si no, es un bug
- ✅ Si usas Supabase → Ve a Supabase → Table Editor → Habits, ¿hay registros?

### "Error en la consola del navegador"
- 🔧 Abre DevTools (F12 o Cmd+Option+J)
- 🔧 Ve a Console
- 🔧 Copia el error completo
- 🔧 Búscalo en Google o pídeme ayuda

---

## 📌 Checklist Final

- [ ] Código subido a GitHub
- [ ] Proyecto creado en Vercel
- [ ] Vercel muestra "Build successful"
- [ ] App accesible en URL de Vercel
- [ ] (Si usas Supabase) Variables de entorno añadidas
- [ ] (Si usas Supabase) Tabla creada en Supabase
- [ ] (Si usas Supabase) Datos persisten después de recargar

---

## 🎯 Resumen de URLs de eBranding

- **Tu app:** `https://habits-app-xyz.vercel.app`
- **Dashboard Vercel:** https://vercel.com/dashboard
- **Console Supabase:** https://app.supabase.com
- **Tu GitHub:** https://github.com/tu_usuario/habits-app

---

¡Preguntas? Pregúntame sin problemas! 🚀
