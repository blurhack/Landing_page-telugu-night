"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
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
  Volume2,
  VolumeX,
} from "lucide-react"
import { AnimatedSection } from "@/components/AnimatedSection"
import { useScrollBlur } from "@/hooks/useScrollBlur"

export default function TeluguNightLanding() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollY, blurAmount } = useScrollBlur()

  // Memoized target date to prevent recalculation
  const targetDate = useMemo(() => new Date("2025-08-03T19:00:00").getTime(), [])

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

  // Auto-play audio on component mount
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.7
          await audioRef.current.play()
          setIsAudioPlaying(true)
        } catch (error) {
          console.log("Auto-play was prevented by the browser:", error)
          setIsAudioPlaying(false)
        }
      }
    }

    playAudio() // Remove setTimeout, play immediately
  }, [])

  const togglePlayPause = useCallback(async () => {
    try {
      // Control both audio and video
      if (isAudioPlaying || isVideoPlaying) {
        // Pause both
        if (audioRef.current) {
          audioRef.current.pause()
          setIsAudioPlaying(false)
        }
        if (videoRef.current) {
          videoRef.current.pause()
          setIsVideoPlaying(false)
        }
      } else {
        // Play both
        if (audioRef.current) {
          await audioRef.current.play()
          setIsAudioPlaying(true)
        }
        if (videoRef.current) {
          await videoRef.current.play()
          setIsVideoPlaying(true)
        }
      }
    } catch (error) {
      console.error("Playback error:", error)
      setIsAudioPlaying(false)
      setIsVideoPlaying(false)
    }
  }, [isAudioPlaying, isVideoPlaying])

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !isMuted
      audioRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }, [isMuted])

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
        onEnded={() => setIsAudioPlaying(false)}
        onError={(e) => {
          console.error("Audio error:", e)
          setIsAudioPlaying(false)
        }}
        onLoadedData={() => {
          console.log("Audio loaded successfully")
          if (audioRef.current) {
            audioRef.current.volume = 0.7
          }
        }}
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ene-fMXduK1wvhZtAy9z0Jnivz9GQSvKpN.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Audio Controls */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 flex gap-2 sm:gap-3">
        <button
          onClick={togglePlayPause}
          className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full p-2.5 sm:p-3 hover:bg-zinc-800/90 transition-colors duration-150 touch-manipulation"
          aria-label={isAudioPlaying || isVideoPlaying ? "Pause audio and video" : "Play audio and video"}
        >
          {isAudioPlaying || isVideoPlaying ? (
            <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              <div className="flex gap-0.5 sm:gap-1">
                <div className="w-1 h-3 sm:h-4 bg-white rounded-full"></div>
                <div className="w-1 h-3 sm:h-4 bg-white rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[5px] sm:border-l-[6px] border-l-white border-t-[3px] sm:border-t-[4px] border-t-transparent border-b-[3px] sm:border-b-[4px] border-b-transparent ml-0.5"></div>
            </div>
          )}
        </button>

        <button
          onClick={toggleMute}
          className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full p-2.5 sm:p-3 hover:bg-zinc-800/90 transition-colors duration-150 touch-manipulation"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>

      {/* Floating Reserve Button - Always Visible */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-[100] sm:w-auto sm:max-w-sm">
        <Button
          size="lg"
          className="bg-white text-black hover:bg-white/95 active:bg-white/90 font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-200 tracking-tight font-[family-name:var(--font-poppins)] shadow-2xl border-0 touch-manipulation hover:scale-105 active:scale-95 w-full sm:w-auto"
          style={{
            boxShadow:
              "0 10px 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2), 0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />
            Reserve Your Spot - ₹300
          </span>
        </Button>
      </div>

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
                {/* Video Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    style={{
                      filter: `blur(${blurAmount}px) brightness(0.7) drop-shadow(0 0 40px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.2))`,
                      objectPosition: "center center",
                      minWidth: "100%",
                      minHeight: "100%",
                      transform: "scale(1.0)",
                    }}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ene%20%281%29-8pE5Sy5CmTmieOXwVxIer1prre9eF7.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
                </div>

                {/* Title Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20">
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-white tracking-tighter font-[family-name:var(--font-poppins)] leading-[0.9] text-center uppercase"
                    style={{
                      textShadow:
                        "0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(0, 0, 0, 0.9)",
                    }}
                  >
                    TELUGU NIGHT
                  </h1>
                  <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-white/90 mx-auto mb-2 sm:mb-3 md:mb-4"></div>
                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/95 font-bold tracking-tight text-center px-2 font-[family-name:var(--font-poppins)]"
                    style={{ textShadow: "0 0 15px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.8)" }}
                  >
                    August 3rd • DTR, Manipal
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
                    3rd August 2025
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
                    DTR, Manipal
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Pricing */}
            <AnimatedSection animation="fadeIn" className="mb-6 sm:mb-8 md:mb-12">
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-sm sm:max-w-md lg:max-w-lg mx-auto rounded-xl sm:rounded-2xl border transition-colors duration-200 bg-zinc-900/60 border-zinc-700/80 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
                  <IndianRupee className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-white/90 mr-1 sm:mr-2" />
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">300</span>
                </div>
                <p className="text-white/90 text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 md:mb-3 text-center font-[family-name:var(--font-poppins)]">
                  Entry Pass
                </p>
                <p className="text-white/70 text-xs sm:text-sm text-center leading-relaxed px-2 font-bold font-[family-name:var(--font-poppins)]">
                  Includes ₹200 cover charge redeemable for food & drinks
                </p>
              </div>
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
                      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">300</span>
                    </div>
                    <p className="text-white/90 text-sm sm:text-base font-bold mb-1 sm:mb-2">Entry Pass</p>
                    <p className="text-white/70 text-xs sm:text-sm">
                      Includes ₹200 cover charge redeemable for food & drinks
                    </p>
                  </div>
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
