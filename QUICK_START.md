# 📝 Guía Rápida de Deployment

## 🚀 Opción más rápida: Vercel + GitHub

### 1. Preparar código (3 minutos)
```bash
cd /Users/nicolasmagnano/Desktop/habits-app

# Si aún no usas git
git init
git add .
git commit -m "Initial commit"
```

### 2. Subir a GitHub (5 minutos)
1. Ve a github.com → New Repository → "habits-app"
2. Copia los comandos y ejecutalos:
```bash
git remote add origin https://github.com/tu_usuario/habits-app.git
git branch -M main
git push -u origin main
```

### 3. Desplegar en Vercel (3 minutos)
1. Ve a vercel.com
2. Login con GitHub
3. Click "New Project"
4. Selecciona "habits-app"
5. Click "Deploy"
6. ¡LISTO! Tu app estará en vivo en ~2 min ✅

**URL de tu app:** `https://habits-app-[random].vercel.app`

---

## 🗄️ Si quieres usar Supabase (Base de datos)

### 1. Crear Supabase (5 minutos)
1. supabase.com → Crear proyecto
2. Ir a Settings → API
3. Copiar: Project URL + Anon Key

### 2. Crear tabla SQL en Supabase (2 minutos)
En el SQL Editor:
```sql
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  daily_goal INTEGER DEFAULT 1,
  completed_dates JSONB DEFAULT '[]'::jsonb,
  color TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Añadir variables a Vercel (2 minutos)
En Vercel Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu clave

Redeploy y ¡LISTO! ✅

---

## 📊 Comparativa

| Feature | localStorage | Supabase |
|---------|-------------|----------|
| Persistencia | Solo en navegador | Servidor (5 años) |
| Múltiples dispositivos | ❌ | ✅ |
| Backup automático | ❌ | ✅ |
| Costo | 💰 Gratis | 💰 Gratis (generoso) |
| Setup | 0 min | 5 min |

---

## 🔗 Links importantes

- Vercel: https://vercel.com
- Supabase: https://supabase.com
- GitHub: https://github.com
- Docs Supabase: https://supabase.com/docs

¡Pregunta si necesitas ayuda!
