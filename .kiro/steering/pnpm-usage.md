# Uso de PNPM para Gestión de Paquetes

## Regla de Gestión de Paquetes

**IMPORTANTE**: Este proyecto utiliza PNPM como gestor de paquetes. Siempre usa PNPM en lugar de npm o yarn para todas las operaciones.

### Comandos a Usar

#### Instalación de Dependencias
- ✅ `pnpm install` - Instalar todas las dependencias
- ✅ `pnpm add [package]` - Agregar nueva dependencia
- ✅ `pnpm add -D [package]` - Agregar dependencia de desarrollo
- ✅ `pnpm remove [package]` - Remover dependencia

#### Scripts del Proyecto
- ✅ `pnpm dev` - Levantar servidor de desarrollo
- ✅ `pnpm build` - Construir proyecto para producción
- ✅ `pnpm start` - Iniciar servidor de producción
- ✅ `pnpm lint` - Ejecutar linter
- ✅ `pnpm test` - Ejecutar tests (si están configurados)

### Comandos NO Usar
- ❌ `npm install`
- ❌ `npm run [script]`
- ❌ `yarn install`
- ❌ `yarn [script]`

### Razones para Usar PNPM
1. **Eficiencia de Espacio**: PNPM usa enlaces simbólicos para evitar duplicación de paquetes
2. **Velocidad**: Instalaciones más rápidas debido a la reutilización de paquetes
3. **Consistencia**: Garantiza que todos los desarrolladores usen la misma versión de dependencias
4. **Seguridad**: Mejor aislamiento de dependencias

### Verificación
Antes de ejecutar cualquier comando, verifica que PNPM esté instalado:
```bash
pnpm --version
```

Si no está instalado, instálalo globalmente:
```bash
npm install -g pnpm
```

### Aplicación
Esta regla se aplica a:
- Instalación de nuevas dependencias
- Ejecución de scripts de desarrollo
- Construcción del proyecto
- Cualquier operación relacionada con gestión de paquetes