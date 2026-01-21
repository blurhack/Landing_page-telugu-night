"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Users,
  Utensils,
  IndianRupee,
  ChevronDown,
} from "lucide-react"
import { AnimatedSection } from "@/components/AnimatedSection"
import { useScrollBlur } from "@/hooks/useScrollBlur"
import { AudioPlayer } from "@/components/AudioPlayer"
import { MediaBackground } from "@/components/MediaBackground"

export default function TeluguNightLanding() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  
  // Direct blob URLs - stored as constants to prevent URL conversion
  const AUDIO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ene-kqHCskuu1gTwuz8qFcqrOEOJROiIkM.mp3"
  const VIDEO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20video%20-%20Made%20with%20Clipchamp.gif-yXLlYX5B6aessSgCZIlr605xJFChE6.jpeg"
  const LOGO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tn3-6SThVDEbr3baujCY6kqnoItbfBptWL.png"

  const { scrollY, blurAmount } = useScrollBlur()

  // Memoized target date to prevent recalculation
  const targetDate = useMemo(() => new Date("2026-01-25T19:00:00").getTime(), [])

  // Optimized countdown timer with useCallback
  const updateCountdown = useCallback(() => {
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      })
    }
  }, [targetDate])

  useEffect(() => {
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [updateCountdown])

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      {/* Audio Player with Controls */}
      <AudioPlayer audioUrl={AUDIO_URL} autoPlay={true} volume={0.7} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative bg-black">
          <div className="text-center max-w-7xl mx-auto w-full">
            {/* Main Title with Video Background */}
            <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 py-[101px]">
              <div
                className="relative aspect-square max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/20 bg-black overflow-hidden shadow-2xl"
                style={{
                  boxShadow:
                    "0 0 60px rgba(255, 255, 255, 0.15), 0 0 120px rgba(255, 255, 255, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* Media Background */}
                <MediaBackground imageUrl={VIDEO_URL} blurAmount={blurAmount} />

                {/* Title Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20">
                  <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-16 sm:mt-20 md:mt-24 lg:mt-32">
                    <img
                      src={LOGO_URL}
                      alt="Telugu Night²"
                      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl my-0 mx-0 py-0 justify-end"
                      style={{
                        filter:
                          "drop-shadow(0 0 20px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 40px rgba(0, 0, 0, 0.6)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9))",
                      }}
                      loading="eager"
                    />
                  </div>
                  <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-white/90 mx-auto mb-2 sm:mb-3 md:mb-4"></div>
                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/95 font-bold tracking-tight text-center px-2 font-[family-name:var(--font-poppins)]"
                    style={{ textShadow: "0 0 15px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.8)" }}
                  >
                    25th January • Hi-Point Lounge (Formerly Soho)
                  </p>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            {scrollY < 50 && (
              <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="bg-zinc-900/90 backdrop-blur-sm rounded-full p-2.5 sm:p-3 border border-zinc-700/50 shadow-lg">
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                </div>
              </div>
            )}

            {/* Event Details - Show immediately for smoothness */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-12 lg:mb-16 max-w-5xl mx-auto">
              <AnimatedSection animation="fadeUp" delay={0}>
                <div className="text-center py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl border transition-colors duration-200 bg-zinc-900/60 border-zinc-800/80 shadow-xl backdrop-blur-sm">
                  <Calendar className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 mx-auto mb-2 sm:mb-3 md:mb-4 text-white/80" />
                  <h3 className="text-xs sm:text-sm font-bold text-white/70 uppercase tracking-tight mb-1 sm:mb-2 md:mb-3 font-[family-name:var(--font-poppins)]">
                    Date
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-bold font-[family-name:var(--font-poppins)]">
                    25th January 2026
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={50}>
                <div className="text-center py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl border transition-colors duration-200 bg-zinc-900/60 border-zinc-800/80 shadow-xl backdrop-blur-sm">
                  <Clock className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 mx-auto mb-2 sm:mb-3 md:mb-4 text-white/80" />
                  <h3 className="text-xs sm:text-sm font-bold text-white/70 uppercase tracking-tight mb-1 sm:mb-2 md:mb-3 font-[family-name:var(--font-poppins)]">
                    Time
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-bold font-[family-name:var(--font-poppins)]">
                    7:00 PM - 11:00 PM
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={100}>
                <div className="text-center py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl border transition-colors duration-200 bg-zinc-900/60 border-zinc-800/80 shadow-xl backdrop-blur-sm">
                  <MapPin className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 mx-auto mb-2 sm:mb-3 md:mb-4 text-white/80" />
                  <h3 className="text-xs sm:text-sm font-bold text-white/70 uppercase tracking-tight mb-1 sm:mb-2 md:mb-3 font-[family-name:var(--font-poppins)]">
                    Venue
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-bold font-[family-name:var(--font-poppins)]">
                    Hi-Point Lounge (Formerly Soho)
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Pricing */}
            <AnimatedSection animation="fadeIn" className="mb-6 sm:mb-8 md:mb-12">
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-sm sm:max-w-md lg:max-w-lg mx-auto rounded-xl sm:rounded-2xl border transition-colors duration-200 bg-zinc-900/60 border-zinc-700/80 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
                  <IndianRupee className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-white/90 mr-1 sm:mr-2" />
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">150</span>
                </div>
                <p className="text-white/90 text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 md:mb-3 text-center font-[family-name:var(--font-poppins)]">
                  Entry Pass
                </p>
                <p className="text-white/70 text-xs sm:text-sm text-center leading-relaxed px-2 font-bold font-[family-name:var(--font-poppins)]">
                  Early Bird Price - Limited Time Offer
                </p>
              </div>
            </AnimatedSection>

            {/* CTA Button */}
            <AnimatedSection animation="fadeUp" className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/95 active:bg-white/90 font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-lg sm:rounded-xl transition-colors duration-150 tracking-tight font-[family-name:var(--font-poppins)] shadow-2xl border-0 w-full sm:w-auto max-w-xs sm:max-w-sm mx-auto touch-manipulation"
              >
                Reserve Your Spot
              </Button>
            </AnimatedSection>

            {/* Countdown Timer */}
            <AnimatedSection animation="fadeUp">
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-xl sm:max-w-2xl mx-auto rounded-xl sm:rounded-2xl border transition-colors duration-200 bg-zinc-900/60 border-zinc-800/80 shadow-2xl backdrop-blur-sm">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 md:mb-8 text-white/90 uppercase tracking-tight text-center font-[family-name:var(--font-poppins)]">
                  Event Countdown
                </h3>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="p-2 sm:p-3 md:p-4 lg:p-6 mb-1 sm:mb-2 md:mb-4 rounded-lg sm:rounded-xl border transition-colors duration-200 bg-zinc-800/60 border-zinc-700/80 shadow-xl backdrop-blur-sm">
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight block">
                          {value}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm uppercase tracking-wider text-white/70 font-medium block">
                        {unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fadeUp" className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border border-zinc-800/80 shadow-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight font-[family-name:var(--font-poppins)]">
                  What to Expect
                </h2>
                <div className="w-12 sm:w-16 h-0.5 bg-white/70 mx-auto mb-3 sm:mb-4 md:mb-6"></div>
                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                  An evening celebrating Telugu music and culture
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  icon: Music,
                  title: "Telugu Music",
                  description: "Curated playlist of contemporary and classic Telugu hits",
                },
                {
                  icon: Users,
                  title: "Dance Floor",
                  description: "Open space for dancing and socializing with fellow attendees",
                },
                {
                  icon: Utensils,
                  title: "Food & Drinks",
                  description: "Selection of refreshments available throughout the evening",
                },
                {
                  icon: () => (
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-zinc-700/50 rounded-full flex items-center justify-center">
                      <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white/70 rounded-full"></div>
                    </div>
                  ),
                  title: "Atmosphere",
                  description: "Immersive environment celebrating Telugu culture",
                },
              ].map(({ icon: Icon, title, description }, index) => (
                <AnimatedSection key={title} animation="fadeUp" delay={index * 25}>
                  <Card className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 hover:border-zinc-700/80 transition-colors duration-200 shadow-2xl rounded-lg sm:rounded-xl group h-full">
                    <CardContent className="p-4 sm:p-6 md:p-8 text-center h-full flex flex-col">
                      <div className="bg-zinc-800/60 p-3 sm:p-4 rounded-full w-fit mx-auto mb-4 sm:mb-6 group-hover:bg-zinc-700/60 transition-colors duration-200 flex-shrink-0">
                        {typeof Icon === "function" ? (
                          <Icon />
                        ) : (
                          <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-white/90" />
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-4 tracking-tight font-[family-name:var(--font-poppins)] flex-shrink-0">
                        {title}
                      </h3>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed flex-grow font-bold font-[family-name:var(--font-poppins)]">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fadeUp">
              <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-16 border border-zinc-800/80 shadow-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 md:mb-8 tracking-tight font-[family-name:var(--font-poppins)]">
                  Limited Capacity
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto">
                  Secure your entry to this exclusive Telugu night experience
                </p>

                <div className="space-y-6 sm:space-y-8 md:space-y-10">
                  <div className="bg-zinc-800/60 backdrop-blur-sm border border-zinc-700/80 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md mx-auto">
                    <div className="flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                      <IndianRupee className="w-5 sm:w-6 h-5 sm:h-6 text-white/90 mr-1 sm:mr-2" />
                      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">150</span>
                    </div>
                    <p className="text-white/90 text-sm sm:text-base font-bold mb-1 sm:mb-2">Entry Pass</p>
                    <p className="text-white/70 text-xs sm:text-sm">Early Bird Price - Limited Time Offer</p>
                  </div>

                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/95 active:bg-white/90 font-bold text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 rounded-lg sm:rounded-xl transition-colors duration-150 tracking-tight font-[family-name:var(--font-poppins)] shadow-2xl touch-manipulation w-full sm:w-auto max-w-sm mx-auto"
                  >
                    Reserve Your Spot
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-zinc-900/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-zinc-800/80">
              <p className="text-white/70 text-xs sm:text-sm font-bold font-[family-name:var(--font-poppins)]">
                © 2025 Telugu Night Manipal. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
