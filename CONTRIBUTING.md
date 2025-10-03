# Guía de Contribución

¡Gracias por tu interés en contribuir al portfolio de Juan Rojo! Esta guía te ayudará a entender cómo puedes colaborar de manera efectiva.

## 🤝 Formas de Contribuir

### 1. Reportar Bugs

- Usa el sistema de Issues de GitHub
- Incluye pasos para reproducir el problema
- Proporciona información del navegador y dispositivo
- Adjunta capturas de pantalla si es relevante

### 2. Sugerir Mejoras

- Abre un Issue con la etiqueta "enhancement"
- Describe claramente la mejora propuesta
- Explica por qué sería beneficiosa
- Incluye mockups o ejemplos si es posible

### 3. Contribuir con Código

- Fork el repositorio
- Crea una rama para tu contribución
- Sigue las convenciones de código establecidas
- Incluye tests si es aplicable
- Actualiza la documentación si es necesario

## 🛠️ Configuración del Entorno de Desarrollo

### Prerrequisitos

- Node.js 18+
- PNPM (gestor de paquetes requerido)
- Git

### Configuración Inicial

1. **Fork y clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/portfolio-personal-jaun.git
   cd portfolio-personal-jaun
   ```

2. **Instalar dependencias**

   ```bash
   pnpm install
   ```

3. **Configurar Git hooks (opcional)**

   ```bash
   pnpm prepare
   ```

4. **Ejecutar en modo desarrollo**

   ```bash
   pnpm dev
   ```

## 📋 Estándares de Código

### TypeScript

- Usa tipado estricto
- Prefiere interfaces sobre types para objetos
- Evita el uso de `any`, usa `unknown` si es necesario
- Documenta funciones complejas con JSDoc

```typescript
// ✅ Correcto
interface ProjectProps {
  title: string
  description: string
  technologies: Technology[]
}

// ❌ Incorrecto
type ProjectProps = {
  title: any
  description: any
  technologies: any[]
}
```

### React

- Usa componentes funcionales con hooks
- Implementa interfaces para todas las props
- Usa React.memo para componentes costosos
- Prefiere composición sobre herencia

```typescript
// ✅ Correcto
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  children, 
  onClick 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### Estilos

- Usa Tailwind CSS para estilos
- Sigue el sistema de diseño establecido
- Mantén consistencia en espaciado y colores
- Implementa diseño responsive (mobile-first)

```typescript
// ✅ Correcto
<div className="container mx-auto px-4 py-8 md:py-16">
  <h1 className="text-2xl md:text-4xl font-heading text-foreground">
    Título
  </h1>
</div>
```

### Animaciones

- Usa Framer Motion para animaciones complejas
- Respeta las preferencias de movimiento reducido
- Mantén animaciones entre 0.2s - 0.8s
- Anima solo `transform` y `opacity` para mejor rendimiento

```typescript
// ✅ Correcto
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}
```

## 🌐 Internacionalización

### Contenido en Español

- Todo el contenido de usuario debe estar en español
- Usa terminología técnica en inglés cuando sea estándar
- Mantén consistencia en el tono profesional pero cercano
- Los comentarios de código pueden estar en español para lógica de negocio

### Ejemplos de Texto UI

```typescript
// ✅ Correcto
const uiText = {
  buttons: {
    viewProject: "Ver proyecto",
    readMore: "Leer más",
    contact: "Contactar"
  },
  forms: {
    name: "Nombre",
    email: "Correo electrónico",
    message: "Mensaje",
    send: "Enviar"
  }
}
```

## 🧪 Testing

### Componentes

- Escribe tests para componentes nuevos
- Testa la renderización con diferentes props
- Verifica interacciones de usuario
- Incluye tests de accesibilidad

```typescript
// Ejemplo de test
describe('ProjectCard', () => {
  it('renderiza la información del proyecto correctamente', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText(mockProject.title)).toBeInTheDocument()
  })
})
```

### Accesibilidad

- Verifica navegación por teclado
- Testa compatibilidad con lectores de pantalla
- Valida contraste de colores
- Asegura etiquetas ARIA apropiadas

## 📝 Convenciones de Commits

Usa el formato de Conventional Commits:

```text
tipo(ámbito): descripción

[cuerpo opcional]

[pie opcional]
```

### Tipos de Commit

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan funcionalidad)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### Ejemplos

```bash
feat(projects): agregar sistema de filtros avanzado
fix(header): corregir navegación móvil en Safari
docs(readme): actualizar instrucciones de instalación
style(components): aplicar formato consistente
```

## 🔄 Proceso de Pull Request

### Antes de Enviar

1. Asegúrate de que el código compile sin errores
2. Ejecuta los tests y verifica que pasen
3. Verifica que el linting pase
4. Actualiza la documentación si es necesario
5. Prueba en diferentes navegadores y dispositivos

### Descripción del PR

- Usa un título descriptivo
- Explica qué cambios introduces y por qué
- Incluye capturas de pantalla para cambios visuales
- Referencia issues relacionados
- Lista los cambios breaking si los hay

### Template de PR

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Bug fix (cambio que corrige un problema)
- [ ] Nueva funcionalidad (cambio que agrega funcionalidad)
- [ ] Breaking change (cambio que rompe compatibilidad)
- [ ] Documentación

## Cómo Probar
1. Paso 1
2. Paso 2
3. Paso 3

## Capturas de Pantalla
(Si aplica)

## Checklist
- [ ] Mi código sigue las convenciones del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código en áreas complejas
- [ ] He actualizado la documentación correspondiente
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He agregado tests que prueban mi funcionalidad
- [ ] Los tests nuevos y existentes pasan localmente
```

## 🐛 Reportar Issues

### Información Requerida

- **Descripción clara** del problema
- **Pasos para reproducir** el issue
- **Comportamiento esperado** vs **comportamiento actual**
- **Información del entorno**:
  - Navegador y versión
  - Sistema operativo
  - Dispositivo (si es móvil)
- **Capturas de pantalla** o videos si es relevante

### Template de Issue

```markdown
## Descripción del Problema
Descripción clara y concisa del bug.

## Pasos para Reproducir
1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hacia '...'
4. Ve el error

## Comportamiento Esperado
Descripción clara de lo que esperabas que pasara.

## Capturas de Pantalla
Si aplica, agrega capturas para explicar el problema.

## Información del Entorno
- Navegador: [ej. Chrome 91.0]
- SO: [ej. macOS 11.4]
- Dispositivo: [ej. iPhone 12, Desktop]

## Contexto Adicional
Cualquier otra información relevante sobre el problema.
```

## 📚 Recursos Útiles

### Documentación Técnica

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### Herramientas de Desarrollo

- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [TypeScript Hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero)

### Accesibilidad

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)

## ❓ Preguntas

Si tienes preguntas sobre cómo contribuir, puedes:

1. Revisar la documentación existente
2. Buscar en issues cerrados por respuestas similares
3. Abrir un nuevo issue con la etiqueta "question"
4. Contactar directamente al mantenedor del proyecto

¡Gracias por contribuir al proyecto! 🚀
