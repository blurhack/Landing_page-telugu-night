"use client"

import { useEffect, useState, useCallback, useRef } from "react"

export function useScrollBlur() {
  const [scrollY, setScrollY] = useState(0)
  const [blurAmount, setBlurAmount] = useState(0)
  const rafRef = useRef<number>()
  const lastScrollY = useRef(0)
  const isScrolling = useRef(false)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    // Only update if scroll changed significantly (reduces jank)
    if (Math.abs(currentScrollY - lastScrollY.current) < 5) return

    lastScrollY.current = currentScrollY
    setScrollY(currentScrollY)

    // Simplified blur calculation for better performance
    const maxScroll = 200
    const maxBlur = 3
    const calculatedBlur = Math.min((currentScrollY / maxScroll) * maxBlur, maxBlur)
    setBlurAmount(calculatedBlur)
  }, [])

  useEffect(() => {
    // Highly optimized scroll handler
    const throttledHandleScroll = () => {
      if (!isScrolling.current) {
        isScrolling.current = true

        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }

        rafRef.current = requestAnimationFrame(() => {
          handleScroll()
          isScrolling.current = false
        })
      }
    }

    // Use passive listeners for maximum performance
    window.addEventListener("scroll", throttledHandleScroll, {
      passive: true,
      capture: false,
    })

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleScroll])

  return { scrollY, blurAmount }
}
