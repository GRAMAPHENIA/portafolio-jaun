# Guía de Despliegue

Esta guía detalla cómo desplegar el portfolio de Juan Rojo en diferentes plataformas y entornos.

## 🚀 Despliegue en Vercel (Recomendado)

Vercel es la plataforma recomendada para desplegar aplicaciones Next.js debido a su integración nativa y optimizaciones automáticas.

### Configuración Inicial

1. **Conectar Repositorio**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa el repositorio del portfolio

2. **Configuración del Proyecto**

   ```bash
   # Framework Preset: Next.js
   # Build Command: pnpm build
   # Output Directory: .next
   # Install Command: pnpm install
   ```

3. **Variables de Entorno**

   ```env
   # Configuración básica
   NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
   NEXT_PUBLIC_SITE_NAME="Juan Rojo - Desarrollador Full Stack"
   
   # Analytics (opcional)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   
   # Formulario de contacto (opcional)
   CONTACT_EMAIL=contacto@juanrojo.dev
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=tu-email@gmail.com
   SMTP_PASS=tu-app-password
   ```

4. **Configuración de Dominio Personalizado**
   - Ve a Settings > Domains
   - Agrega tu dominio personalizado
   - Configura los registros DNS según las instrucciones

### Optimizaciones para Vercel

```javascript
// next.config.mjs
const nextConfig = {
  // Optimizaciones para Vercel
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  
  // Compresión de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 año
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

## 🐳 Despliegue con Docker

### Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Instalar dependencias solo cuando sea necesario
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar PNPM
RUN npm install -g pnpm

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Reconstruir el código fuente solo cuando sea necesario
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Instalar PNPM
RUN npm install -g pnpm

# Construir la aplicación
RUN pnpm build

# Imagen de producción
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copiar archivos de construcción
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=http://localhost:3000
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - portfolio
    restart: unless-stopped
```

### Comandos Docker

```bash
# Construir imagen
docker build -t portfolio-juan-rojo .

# Ejecutar contenedor
docker run -p 3000:3000 portfolio-juan-rojo

# Con Docker Compose
docker-compose up -d
```bash

## ☁️ Despliegue en Netlify

### Configuración

1. **netlify.toml**
   ```toml
   [build]
     command = "pnpm build"
     publish = ".next"
   
   [build.environment]
     NODE_VERSION = "18"
     NPM_FLAGS = "--version"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-XSS-Protection = "1; mode=block"
       X-Content-Type-Options = "nosniff"
   ```

2. **Variables de Entorno**
   - Ve a Site settings > Environment variables
   - Agrega las mismas variables que en Vercel

## 🌐 Despliegue en AWS

### AWS Amplify

1. **Configuración**

   ```yaml
   # amplify.yml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install -g pnpm
           - pnpm install
       build:
         commands:
           - pnpm build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
         - .next/cache/**/*
   ```

### AWS S3 + CloudFront

1. **Construcción estática**

   ```bash
   # Configurar para exportación estática
   pnpm build
   pnpm export
   ```

2. **Subir a S3**

   ```bash
   aws s3 sync out/ s3://tu-bucket-name --delete
   aws cloudfront create-invalidation --distribution-id XXXXXX --paths "/*"
   ```

## 🔧 Configuración de CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Setup PNPM
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run linting
        run: pnpm lint
        
      - name: Run type checking
        run: pnpm type-check
        
      - name: Build application
        run: pnpm build
        
      - name: Run tests
        run: pnpm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```bash

## 📊 Monitoreo y Analytics

### Configuración de Analytics

```typescript
// lib/analytics.ts
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Eventos personalizados
export const trackProjectView = (projectId: string) => {
  trackEvent('view_project', 'engagement', projectId)
}

export const trackContactForm = (success: boolean) => {
  trackEvent('contact_form', 'conversion', success ? 'success' : 'error')
}
```bash

### Configuración de Sentry (Monitoreo de Errores)

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

## 🔒 Configuración de Seguridad

### Headers de Seguridad

```javascript
// next.config.mjs
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```bash

### Content Security Policy

```javascript
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
  child-src *.youtube.com *.google.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' *.gstatic.com;
`
```

## 📈 Optimización de Rendimiento

### Configuración de Cache

```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*).js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}
```bash

### Preload de Recursos Críticos

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preload"
          href="/fonts/jost-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/instrument-sans-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 🔍 Verificación Post-Despliegue

### Checklist de Verificación

- [ ] ✅ Sitio carga correctamente en todos los navegadores
- [ ] ✅ Todas las páginas son accesibles
- [ ] ✅ Formularios funcionan correctamente
- [ ] ✅ Imágenes se cargan optimizadas
- [ ] ✅ Lighthouse score >90 en todas las métricas
- [ ] ✅ Links externos funcionan
- [ ] ✅ SEO meta tags están presentes
- [ ] ✅ Sitemap.xml es accesible
- [ ] ✅ Robots.txt está configurado
- [ ] ✅ Analytics está funcionando
- [ ] ✅ Monitoreo de errores está activo

### Herramientas de Verificación

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://tu-dominio.com --output html --output-path ./lighthouse-report.html

# Verificación de accesibilidad
npm install -g @axe-core/cli
axe https://tu-dominio.com

# Verificación de rendimiento
npm install -g web-vitals-cli
web-vitals https://tu-dominio.com
```bash

## 🆘 Solución de Problemas

### Problemas Comunes

1. **Error de construcción en Vercel**
   ```bash
   # Verificar localmente
   pnpm build
   
   # Limpiar cache
   rm -rf .next
   pnpm build
   ```

2. **Problemas de fuentes**

   ```javascript
   // Verificar configuración en layout.tsx
   const jost = Jost({ 
     subsets: ["latin"],
     variable: "--font-heading",
     display: 'swap'
   })
   ```

3. **Errores de hidratación**

   ```typescript
   // Usar dynamic imports para componentes del cliente
   const ClientComponent = dynamic(() => import('./ClientComponent'), {
     ssr: false
   })
   ```

### Logs y Debugging

```bash
# Ver logs de Vercel
vercel logs tu-deployment-url

# Debugging local
NEXT_DEBUG=1 pnpm dev

# Análisis de bundle
ANALYZE=true pnpm build
```bash

---

Para más ayuda con el despliegue, consulta la [documentación oficial de Next.js](https://nextjs.org/docs/deployment) o abre un issue en el repositorio.
