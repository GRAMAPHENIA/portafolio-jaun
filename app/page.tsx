import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { ProjectGrid } from "@/components/projects/project-grid"
import { TestimonialSection } from "@/components/sections/testimonial"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ProjectGrid />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  )
}
