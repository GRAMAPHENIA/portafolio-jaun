# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere al [Versionado Semántico](https://semver.org/lang/es/).

## [Sin Publicar]

### Agregado
- Sistema de blog con MDX y syntax highlighting
- Página de CV descargable
- Sistema de contacto avanzado
- Analytics y monitoreo de rendimiento

### Cambiado
- Mejoras en la navegación móvil
- Optimizaciones de rendimiento

### Corregido
- Problemas de accesibilidad en modales
- Errores de hidratación en SSR

## [1.2.0] - 2024-01-15

### Agregado
- ✨ Sistema de filtros y búsqueda avanzado para proyectos
- 🔍 Búsqueda en tiempo real con algoritmo de scoring
- 🏷️ Filtros por categorías, tecnologías y estado de proyecto
- 📊 Estadísticas de proyectos filtrados
- 💡 Sugerencias de búsqueda inteligentes
- 📱 Interfaz responsive para filtros en móvil
- ♿ Mejoras de accesibilidad en componentes de filtrado

### Mejorado
- 🎨 Animaciones más fluidas en transiciones de filtros
- ⚡ Optimización de rendimiento en búsquedas
- 🎯 UX mejorada con feedback visual inmediato
- 📝 Documentación completa del sistema de filtros

### Corregido
- 🐛 Loops infinitos en useEffect de filtros
- 🔧 Non-null assertions reemplazadas con funciones helper seguras
- 🎭 DialogTitle agregado para compatibilidad con lectores de pantalla
- 🛡️ Verificaciones de seguridad para arrays vacíos

### Técnico
- Implementación de `useProjectFilters` hook personalizado
- Algoritmo de búsqueda con puntuación por relevancia
- Sistema de memoización para optimizar re-renders
- Componentes accesibles con navegación por teclado

## [1.1.0] - 2024-01-01

### Agregado
- 🎭 Animaciones con Framer Motion
- ✨ Micro-interacciones en componentes
- 🌙 Tema oscuro/claro mejorado
- 📱 Navegación móvil optimizada
- 🎨 Sistema de diseño consistente

### Mejorado
- 🚀 Hero section con animaciones de entrada
- 🎯 Project cards con efectos hover mejorados
- 📐 Header con transiciones suaves
- 🎪 Loading states y skeleton loaders

### Corregido
- 🐛 Problemas de hidratación en SSR
- 📱 Navegación móvil en Safari
- ♿ Mejoras de accesibilidad general

## [1.0.0] - 2023-12-15

### Agregado
- 🎉 Lanzamiento inicial del portfolio
- 🏠 Página de inicio con Hero, Proyectos y Testimonios
- 📂 6 proyectos destacados con información detallada
- 🛠️ Stack tecnológico: Next.js 15, TypeScript, Tailwind CSS
- 🎨 Componentes UI con shadcn/ui
- 📱 Diseño completamente responsive
- ♿ Accesibilidad básica implementada

### Proyectos Incluidos
1. **Documentación de Casos de Umbral** - Plataforma de documentación con búsqueda avanzada
2. **El Palacio Dom** - Aplicación de gestión colaborativa
3. **Sesgos Cognitivos** - Dashboard educativo interactivo
4. **Hiperstición** - Plataforma educativa con gamificación
5. **Columne** - Herramienta de IA para generación de contenido
6. **Registros de Consolas** - Aplicación móvil de seguimiento

### Características Técnicas
- ⚡ Next.js 15 con App Router
- 🔷 TypeScript estricto
- 🎨 Tailwind CSS para estilos
- 🧩 shadcn/ui para componentes
- 📦 PNPM como gestor de paquetes
- 🌐 SEO básico optimizado
- 📊 Lighthouse score >85 en todas las métricas

### Estructura de Datos
- Información detallada de proyectos con tecnologías, métricas y testimonios
- Sistema de categorización por tipo de proyecto
- Datos de experiencia profesional y habilidades técnicas
- Configuración de temas y preferencias de usuario

---

## Tipos de Cambios

- `Agregado` para nuevas funcionalidades
- `Cambiado` para cambios en funcionalidades existentes
- `Obsoleto` para funcionalidades que serán removidas
- `Removido` para funcionalidades removidas
- `Corregido` para corrección de bugs
- `Seguridad` para vulnerabilidades

## Convenciones de Versionado

- **MAJOR** (X.0.0): Cambios incompatibles en la API
- **MINOR** (0.X.0): Nuevas funcionalidades compatibles hacia atrás
- **PATCH** (0.0.X): Correcciones de bugs compatibles hacia atrás

## Enlaces

- [Repositorio](https://github.com/tu-usuario/portfolio-personal-jaun)
- [Issues](https://github.com/tu-usuario/portfolio-personal-jaun/issues)
- [Pull Requests](https://github.com/tu-usuario/portfolio-personal-jaun/pulls)
- [Releases](https://github.com/tu-usuario/portfolio-personal-jaun/releases)