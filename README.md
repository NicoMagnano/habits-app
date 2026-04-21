# HabitTracker - Aplicación Web de Registro de Hábitos

Una aplicación web responsive moderna para el seguimiento y registro de hábitos diarios con reportes visuales.

## 🚀 Características

- **Dashboard interactivo** con tarjetas de hábitos y checkboxes para marcar completado
- **Gráficos de reportes** con barras y líneas para visualizar consistencia
- **Agregar nuevos hábitos** con nombre, descripción y meta diaria
- **Diseño minimalista y moderno** con soporte mobile-first
- **Paleta de colores profesional** basada en Zinc y Esmeralda
- **Almacenamiento persistente** con localStorage
- **Modo oscuro** integrado

## 🛠️ Tecnologías Utilizadas

- **React 19** - Librería de UI
- **Next.js 16** - Framework fullstack
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos responsive
- **Recharts** - Gráficos interactivos
- **Lucide React** - Iconos modernos
- **date-fns** - Manejo de fechas

## 📦 Instalación

### Requisitos previos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Navega al directorio del proyecto**
   ```bash
   cd /Users/nicolasmagnano/Desktop/habits-app
   ```

2. **Instala las dependencias** (ya están instaladas)
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   - Dirígete a `http://localhost:3000`

## 📱 Uso

### Dashboard
- **Ver hábitos**: Visualiza todas tus tarjetas de hábitos con progreso
- **Marcar completado**: Haz clic en el círculo para marcar un hábito como completado hoy
- **Agregar hábito**: Presiona el botón "Agregar nuevo hábito" para crear uno
- **Eliminar**: Usa el ícono de papelera para borrar un hábito

### Reportes
- **Gráfico de barras**: Muestra la completación de hábitos por día de la semana
- **Gráfico de líneas**: Visualiza el progreso acumulativo
- **Estadísticas individuales**: Detalla el rendimiento de cada hábito
- **Métricas semanales**: Porcentaje de completación por semana

## 🎨 Diseño

- **Paleta de colores**:
  - Primario: Esmeralda (#10b981)
  - Secundario: Zinc (#71717a)
  - Estados: Rojo, Azul, Violeta, Rosa, Ámbar, Cian

- **Responsive**:
  - Mobile: Diseño single-column
  - Tablet: Grid de 2 columnas
  - Desktop: Grid de 3 columnas

## 💾 Almacenamiento

Los datos se guardan en `localStorage`, persisten incluso después de cerrar el navegador.

## 🔧 Comandos disponibles

```bash
# Desarrollo
npm run dev        # Inicia servidor de desarrollo

# Producción
npm run build      # Construye la aplicación
npm start          # Inicia servidor de producción

# Linting
npm run lint       # Verifica el código
```

## 📝 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout root
│   └── globals.css       # Estilos globales
├── components/
│   ├── HabitCard.tsx     # Tarjeta individual de hábito
│   ├── DashboardView.tsx # Vista del dashboard
│   ├── ReportsView.tsx   # Vista de reportes
│   ├── AddHabitForm.tsx  # Formulario para agregar hábitos
│   ├── TabNavigation.tsx # Navegación entre vistas
│   └── index.ts          # Exports
└── types/
    └── index.ts          # Definiciones de TypeScript
```

## 🎯 Próximas características

- [ ] Sincronización con base de datos
- [ ] Autenticación de usuarios
- [ ] Compartir progreso
- [ ] Notificaciones de reminders
- [ ] Exportar datos como PDF
- [ ] Modo offline

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT.

## 👨‍💻 Desarrollo

Desarrollado como prototipo funcional de una aplicación de seguimiento de hábitos.

---

**Construido con pasión para ayudarte a mantener mejores hábitos** 🚀
