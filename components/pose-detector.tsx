"use client"

import { useEffect, useRef, useState } from "react"

interface PoseKeypoint {
  x: number
  y: number
  visibility: number
}

interface PoseDetectorProps {
  onPoseDetected?: (keypoints: PoseKeypoint[]) => void
  isActive?: boolean
}

export function PoseDetector({ onPoseDetected, isActive = false }: PoseDetectorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isActive) return

    // Simulate MediaPipe pose detection
    const detectPose = () => {
      // Mock pose keypoints for demonstration
      const mockKeypoints: PoseKeypoint[] = Array(33)
        .fill(null)
        .map((_, i) => ({
          x: Math.random() * 640,
          y: Math.random() * 480,
          visibility: Math.random(),
        }))

      if (onPoseDetected) {
        onPoseDetected(mockKeypoints)
      }
    }

    const interval = setInterval(detectPose, 100) // 10 FPS
    setIsLoaded(true)

    return () => {
      clearInterval(interval)
      setIsLoaded(false)
    }
  }, [isActive, onPoseDetected])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    />
  )
}
