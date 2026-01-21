"use client"

import { useEffect, useRef, useState } from "react"

interface MediaBackgroundProps {
  imageUrl: string
  blurAmount: number
  onImageLoad?: () => void
}

export function MediaBackground({ imageUrl, blurAmount, onImageLoad }: MediaBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImageLoaded(true)
      onImageLoad?.()
    }
  }, [onImageLoad])

  const handleImageLoad = () => {
    console.log("[v0] Background image loaded successfully")
    setImageLoaded(true)
    onImageLoad?.()
  }

  const handleImageError = () => {
    console.log("[v0] Background image failed to load")
    setImageError(true)
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
      {!imageError ? (
        <>
          <div className="absolute inset-0 w-full h-full">
            <img
              ref={imgRef}
              src={imageUrl || "/placeholder.svg"}
              alt="Event visual background"
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                filter: `blur(${blurAmount}px) brightness(0.7) drop-shadow(0 0 40px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.2))`,
                objectPosition: "center center",
                minWidth: "100%",
                minHeight: "100%",
                transform: "scale(1.05)",
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager"
              decoding="async"
              crossOrigin="anonymous"
            />
          </div>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
              <div className="w-8 h-8 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
    </div>
  )
}
