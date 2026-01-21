"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

interface AudioPlayerProps {
  audioUrl: string
  autoPlay?: boolean
  volume?: number
}

export function AudioPlayer({ audioUrl, autoPlay = true, volume = 0.7 }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => {
      console.log("[v0] Audio loaded and can play")
      setAudioLoaded(true)
      setAudioError(false)
    }

    const handleError = (e: ErrorEvent) => {
      console.log("[v0] Audio error:", e)
      setAudioError(true)
      setIsPlaying(false)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError as EventListener)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError as EventListener)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  useEffect(() => {
    const playAudio = async () => {
      if (!audioRef.current || !autoPlay || !audioLoaded) return

      try {
        audioRef.current.volume = volume
        await audioRef.current.play()
        setIsPlaying(true)
        console.log("[v0] Audio started playing")
      } catch (error) {
        console.log("[v0] Autoplay prevented:", error)
        setIsPlaying(false)
      }
    }

    if (audioLoaded) {
      playAudio()
    }
  }, [audioLoaded, autoPlay, volume])

  const togglePlayPause = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        await audioRef.current.play()
      }
    } catch (error) {
      console.log("[v0] Playback toggle error:", error)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    const newMutedState = !isMuted
    audioRef.current.muted = newMutedState
    setIsMuted(newMutedState)
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        crossOrigin="anonymous"
        className="hidden"
      >
        <source src={audioUrl} type="audio/mpeg" />
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 flex gap-2 sm:gap-3">
        <button
          onClick={togglePlayPause}
          disabled={audioError}
          className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full p-2.5 sm:p-3 hover:bg-zinc-800/90 transition-all duration-200 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          type="button"
        >
          {audioError ? (
            <div className="w-4 h-4 sm:w-5 sm:h-5 text-red-400">✕</div>
          ) : isPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          )}
        </button>

        <button
          onClick={toggleMute}
          disabled={audioError}
          className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full p-2.5 sm:p-3 hover:bg-zinc-800/90 transition-all duration-200 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          type="button"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          )}
        </button>

        {!audioLoaded && !audioError && (
          <div className="absolute top-1/2 right-full mr-3 -translate-y-1/2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-full px-3 py-1.5 text-xs text-white/70 whitespace-nowrap">
            Loading audio...
          </div>
        )}
      </div>
    </>
  )
}
