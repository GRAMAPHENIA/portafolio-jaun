import { cn } from "@/lib/utils"

interface TestimonialProps {
  className?: string
}

export function TestimonialSection({ className }: TestimonialProps) {
  return (
    <section id="se-dice-de-mi" className={cn("py-24 bg-background/50 backdrop-blur-sm", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-light mb-12 text-foreground/90">
            Lo dice
          </h2>
          
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 opacity-10 text-accent">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <blockquote className="relative z-10">
              <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                "Construye como quien observa una tormenta eléctrica desde adentro. Refactoriza el caos. 
                Diseña con intención. Estudia no para aprender, sino para entender cómo se parte el mundo en 
                líneas de comando. Busca velocidad, pero jamás sin precisión. A veces, un loop. A veces, 
                una grieta. Siempre, un plan."
              </p>
              <footer className="text-sm text-muted-foreground/80">
                — ChatGPT
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
