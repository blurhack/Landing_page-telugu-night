import type { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  animation?: "fadeUp" | "fadeIn" | "scaleUp" | "slideLeft" | "slideRight"
}

export function AnimatedSection({ children, className = "", delay = 0, animation = "fadeUp" }: AnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -10px 0px",
    triggerOnce: true,
  })

  const getAnimationClasses = () => {
    // Ultra-fast animations for smoothness
    const baseClasses = "transition-all duration-200 ease-out"

    switch (animation) {
      case "fadeUp":
        return `${baseClasses} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`
      case "fadeIn":
        return `${baseClasses} ${isVisible ? "opacity-100" : "opacity-0"}`
      case "scaleUp":
        return `${baseClasses} ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-99"}`
      case "slideLeft":
        return `${baseClasses} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`
      case "slideRight":
        return `${baseClasses} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`
      default:
        return baseClasses
    }
  }

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: `${Math.min(delay, 100)}ms`, // Cap all delays at 100ms
      }}
    >
      {children}
    </div>
  )
}
