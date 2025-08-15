"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Square, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

interface PoseKeypoint {
  x: number
  y: number
  visibility: number
}

interface PoseAnalysis {
  exercise: string
  score: number
  feedback: string[]
  corrections: string[]
}

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [selectedExercise, setSelectedExercise] = useState("squat")
  const [poseAnalysis, setPoseAnalysis] = useState<PoseAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const exercises = [
    { id: "squat", name: "Squats", description: "Knee and hip alignment analysis" },
    { id: "pushup", name: "Push-ups", description: "Upper body form check" },
    { id: "plank", name: "Planks", description: "Core stability assessment" },
  ]

  useEffect(() => {
    startCamera()
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const analyzePose = (keypoints: PoseKeypoint[]) => {
    // Simulate pose analysis based on selected exercise
    const analysis: PoseAnalysis = {
      exercise: selectedExercise,
      score: 0,
      feedback: [],
      corrections: [],
    }

    if (selectedExercise === "squat") {
      // Simulate squat analysis
      const kneeAngle = calculateAngle(keypoints[25], keypoints[23], keypoints[27]) // Hip-Knee-Ankle
      const backAngle = calculateAngle(keypoints[11], keypoints[23], keypoints[25]) // Shoulder-Hip-Knee

      if (kneeAngle > 90) {
        analysis.feedback.push("Good squat depth!")
        analysis.score += 40
      } else {
        analysis.corrections.push("Go deeper - thighs should be parallel to ground")
      }

      if (backAngle > 160) {
        analysis.feedback.push("Great back posture!")
        analysis.score += 30
      } else {
        analysis.corrections.push("Keep your chest up and back straight")
      }

      // Knee tracking
      const leftKnee = keypoints[25]
      const rightKnee = keypoints[26]
      if (Math.abs(leftKnee.x - rightKnee.x) < 50) {
        analysis.feedback.push("Good knee alignment!")
        analysis.score += 30
      } else {
        analysis.corrections.push("Keep knees aligned with toes")
      }
    }

    return analysis
  }

  const calculateAngle = (a: PoseKeypoint, b: PoseKeypoint, c: PoseKeypoint): number => {
    // Simple angle calculation between three points
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
    let angle = Math.abs((radians * 180.0) / Math.PI)
    if (angle > 180.0) {
      angle = 360 - angle
    }
    return angle
  }

  const simulateAnalysis = () => {
    setIsAnalyzing(true)

    // Simulate pose detection and analysis
    setTimeout(() => {
      const mockKeypoints: PoseKeypoint[] = Array(33)
        .fill(null)
        .map((_, i) => ({
          x: Math.random() * 640,
          y: Math.random() * 480,
          visibility: Math.random(),
        }))

      const analysis = analyzePose(mockKeypoints)
      setPoseAnalysis(analysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      simulateAnalysis()
    } else {
      setIsRecording(true)
      setPoseAnalysis(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-time Posture Analysis</h1>
          <p className="text-gray-600">Position yourself in front of the camera and select your exercise</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camera Feed */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Camera Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto" />
                  <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

                  {/* Recording Indicator */}
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Recording
                    </div>
                  )}

                  {/* Analysis Overlay */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p>Analyzing your form...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 mt-4">
                  <Button
                    onClick={toggleRecording}
                    size="lg"
                    className={isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
                  >
                    {isRecording ? (
                      <>
                        <Square className="mr-2 h-5 w-5" />
                        Stop Analysis
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-5 w-5" />
                        Start Analysis
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={startCamera}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Camera
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls & Results */}
          <div className="space-y-6">
            {/* Exercise Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Exercise</CardTitle>
                <CardDescription>Choose the exercise you want to analyze</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedExercise === exercise.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedExercise(exercise.id)}
                  >
                    <h4 className="font-medium">{exercise.name}</h4>
                    <p className="text-sm text-gray-600">{exercise.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {poseAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Analysis Results
                    <Badge variant={poseAnalysis.score >= 70 ? "default" : "destructive"}>
                      {poseAnalysis.score}/100
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Positive Feedback */}
                  {poseAnalysis.feedback.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Good Form
                      </h4>
                      {poseAnalysis.feedback.map((item, index) => (
                        <Alert key={index} className="border-green-200 bg-green-50">
                          <AlertDescription className="text-green-800">{item}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  )}

                  {/* Corrections */}
                  {poseAnalysis.corrections.length > 0 && (
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Areas to Improve
                      </h4>
                      {poseAnalysis.corrections.map((item, index) => (
                        <Alert key={index} className="border-orange-200 bg-orange-50">
                          <AlertDescription className="text-orange-800">{item}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  )}

                  <Button asChild className="w-full">
                    <Link href="/progress">Save to Progress</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips for Better Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>• Ensure good lighting</p>
                <p>• Stand 3-6 feet from camera</p>
                <p>• Wear fitted clothing</p>
                <p>• Keep full body in frame</p>
                <p>• Perform exercise slowly</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
