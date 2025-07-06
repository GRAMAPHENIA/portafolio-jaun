import type React from "react"
import { Code2, Database, Smartphone, Globe, Zap, Cpu, Cloud, Palette, Shield, Layers } from "lucide-react"

const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Next.js": Code2,
  React: Code2,
  "Vue.js": Code2,
  TypeScript: Code2,
  JavaScript: Code2,
  "Node.js": Cpu,
  Python: Cpu,
  FastAPI: Zap,
  Express: Zap,
  PostgreSQL: Database,
  MongoDB: Database,
  Redis: Database,
  Prisma: Database,
  Supabase: Database,
  ClickHouse: Database,
  Stripe: Shield,
  "Socket.io": Globe,
  "D3.js": Palette,
  "Chart.js": Palette,
  Tailwind: Palette,
  "Framer Motion": Layers,
  "React Native": Smartphone,
  Firebase: Cloud,
  AWS: Cloud,
  "OpenAI API": Zap,
  HealthKit: Smartphone,
}

export function getTechIcon(tech: string): React.ComponentType<{ className?: string }> {
  return techIconMap[tech] || Code2
}
