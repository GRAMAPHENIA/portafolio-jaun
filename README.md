# Portfolio Personal - Juan Rojo

Un portfolio web moderno y profesional desarrollado con Next.js 15, TypeScript y Tailwind CSS, diseñado para mostrar proyectos, habilidades y experiencia profesional de manera elegante e interactiva.

## 🚀 Características Principales

- **Diseño Moderno**: Interfaz minimalista con animaciones fluidas
- **Totalmente Responsive**: Optimizado para todos los dispositivos
- **Sistema de Filtros Avanzado**: Búsqueda y filtrado inteligente de proyectos
- **Blog Integrado**: Sistema de contenido con MDX y syntax highlighting
- **Optimización SEO**: Meta tags dinámicos y structured data
- **Accesibilidad**: Cumple estándares WCAG 2.1 AA
- **Tema Dual**: Modo claro y oscuro
- **Rendimiento Optimizado**: Lighthouse score >90

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui (Radix UI)
- **Animaciones**: Framer Motion
- **Contenido**: MDX para blog posts
- **Tipografías**: Jost (títulos), Instrument Sans (texto)
- **Gestión de Paquetes**: PNPM

## 📦 Instalación

### Prerrequisitos

- Node.js 18+
- PNPM (recomendado)

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/portfolio-personal-jaun.git
   cd portfolio-personal-jaun
   ```

2. **Instalar dependencias**

   ```bash
   pnpm install
   ```

3. **Ejecutar en modo desarrollo**

   ```bash
   pnpm dev
   ```

4. **Abrir en el navegador**

   ```
   http://localhost:3000
   ```

## 🏗️ Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia servidor de desarrollo

# Producción
pnpm build        # Construye la aplicación para producción
pnpm start        # Inicia servidor de producción

# Calidad de Código
pnpm lint         # Ejecuta ESLint
pnpm type-check   # Verifica tipos de TypeScript
```

## 📁 Estructura del Proyecto

```text
portfolio-personal-jaun/
├── app/                    # Next.js App Router
│   ├── blog/              # Sistema de blog
│   ├── cv/                # Página de CV
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes React
│   ├── blog/             # Componentes del blog
│   ├── layout/           # Header, Footer
│   ├── projects/         # Componentes de proyectos
│   ├── sections/         # Secciones principales
│   └── ui/               # Componentes UI base
├── content/              # Contenido MDX para blog
├── data/                 # Datos estructurados
│   ├── projects.ts       # Información de proyectos
│   ├── experience.ts     # Experiencia profesional
│   └── skills.ts         # Habilidades técnicas
├── hooks/                # Hooks personalizados
├── lib/                  # Utilidades y tipos
├── public/               # Archivos estáticos
└── styles/               # Estilos globales
```

## 🎨 Personalización

### Colores y Tema

Los colores se definen en `app/globals.css` usando CSS custom properties:

```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);
  --accent: hsl(210 40% 98%);
  /* ... más variables */
}
```

### Tipografías

Las fuentes se configuran en `app/layout.tsx`:

```typescript
const jost = Jost({ 
  subsets: ["latin"],
  variable: "--font-heading"
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body"
})
```

### Contenido

#### Proyectos

Edita `data/projects.ts` para agregar o modificar proyectos:

```typescript
export const projects: Project[] = [
  {
    id: "mi-proyecto",
    title: "Mi Nuevo Proyecto",
    description: "Descripción breve del proyecto",
    // ... más propiedades
  }
]
```

#### Blog Posts

Crea archivos MDX en `content/blog/`:

```markdown
---
title: "Mi Artículo"
description: "Descripción del artículo"
publishedAt: "2024-01-15"
tags: ["react", "nextjs"]
---

# Contenido del artículo

Tu contenido aquí...
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno necesarias
3. Despliega automáticamente

### Otros Proveedores

```bash
# Construir para producción
pnpm build

# Los archivos estáticos estarán en .next/
```

## 📊 Rendimiento

El portfolio está optimizado para obtener excelentes puntuaciones en Lighthouse:

- **Performance**: >90
- **Accessibility**: >95
- **Best Practices**: >90
- **SEO**: >95

### Optimizaciones Implementadas

- Lazy loading de imágenes
- Code splitting automático
- Compresión de assets
- Preload de recursos críticos
- Optimización de fuentes

## ♿ Accesibilidad

- Navegación por teclado completa
- Etiquetas ARIA apropiadas
- Contraste de colores WCAG 2.1 AA
- Soporte para lectores de pantalla
- Respeto por preferencias de movimiento reducido

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

**Juan Rojo** - Desarrollador Full Stack

- 🌐 Website: [juanrojo.dev](https://juanrojo.dev)
- 📧 Email: <contacto@juanrojo.dev>
- 💼 LinkedIn: [linkedin.com/in/juanrojo](https://linkedin.com/in/juanrojo)
- 🐙 GitHub: [github.com/juanrojo](https://github.com/juanrojo)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
