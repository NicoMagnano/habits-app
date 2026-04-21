#!/bin/bash

# HabitTracker Development Server
# Script to start the development server

echo "🚀 Iniciando HabitTracker..."
echo ""
echo "📂 Directorio: $(pwd)"
echo "🔧 Node version: $(node --version)"
echo "📦 NPM version: $(npm --version)"
echo ""

# Start the dev server
npm run dev
