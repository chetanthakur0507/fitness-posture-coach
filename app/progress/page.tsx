"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, Calendar, Target, Award, ChevronRight } from "lucide-react"
import Link from "next/link"

interface WorkoutSession {
  id: string
  date: string
  exercise: string
  score: number
  duration: string
  feedback: string[]
  corrections: string[]
}

export default function ProgressPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

  // Mock data for progress tracking
  const workoutSessions: WorkoutSession[] = [
    {
      id: "1",
      date: "2024-01-15",
      exercise: "Squats",
      score: 85,
      duration: "8 seconds",
      feedback: ["Great depth achieved", "Good knee alignment"],
      corrections: ["Keep chest more upright"],
    },
    {
      id: "2",
      date: "2024-01-14",
      exercise: "Push-ups",
      score: 78,
      duration: "10 seconds",
      feedback: ["Good elbow position"],
      corrections: ["Maintain straighter back", "Control the descent"],
    },
    {
      id: "3",
      date: "2024-01-13",
      exercise: "Squats",
      score: 82,
      duration: "7 seconds",
      feedback: ["Consistent form"],
      corrections: ["Go slightly deeper"],
    },
    {
      id: "4",
      date: "2024-01-12",
      exercise: "Planks",
      score: 90,
      duration: "15 seconds",
      feedback: ["Excellent core stability", "Perfect alignment"],
      corrections: [],
    },
    {
      id: "5",
      date: "2024-01-11",
      exercise: "Push-ups",
      score: 75,
      duration: "9 seconds",
      feedback: ["Good range of motion"],
      corrections: ["Keep elbows closer to body"],
    },
  ]

  const progressData = [
    { date: "Jan 11", score: 75, exercise: "Push-ups" },
    { date: "Jan 12", score: 90, exercise: "Planks" },
    { date: "Jan 13", score: 82, exercise: "Squats" },
    { date: "Jan 14", score: 78, exercise: "Push-ups" },
    { date: "Jan 15", score: 85, exercise: "Squats" },
  ]

  const exerciseStats = [
    { exercise: "Squats", sessions: 8, avgScore: 83, improvement: "+5%" },
    { exercise: "Push-ups", sessions: 6, avgScore: 76, improvement: "+3%" },
    { exercise: "Planks", sessions: 4, avgScore: 88, improvement: "+8%" },
    { exercise: "Deadlifts", sessions: 3, avgScore: 79, improvement: "+2%" },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" => {
    if (score >= 85) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
          <p className="text-gray-600">Track your form improvements and workout history</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">21</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-green-600 mt-2">+3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">82</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-green-600 mt-2">+4% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Best Score</p>
                  <p className="text-2xl font-bold text-gray-900">95</p>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-xs text-gray-600 mt-2">Planks - Jan 10</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Streak</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-green-600 mt-2">Days active</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
            <TabsTrigger value="exercises">By Exercise</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Form Score Progress</CardTitle>
                <CardDescription>Your improvement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Exercise Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Exercise Performance</CardTitle>
                <CardDescription>Average scores by exercise type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={exerciseStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="exercise" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="avgScore" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            {workoutSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{session.exercise}</Badge>
                      <span className="text-sm text-gray-600">{session.date}</span>
                      <span className="text-sm text-gray-600">• {session.duration}</span>
                    </div>
                    <Badge variant={getScoreBadgeVariant(session.score)}>{session.score}/100</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {session.feedback.length > 0 && (
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">✓ Good Form</h4>
                        <ul className="space-y-1">
                          {session.feedback.map((item, index) => (
                            <li key={index} className="text-sm text-green-600">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {session.corrections.length > 0 && (
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2">⚠ Areas to Improve</h4>
                        <ul className="space-y-1">
                          {session.corrections.map((item, index) => (
                            <li key={index} className="text-sm text-orange-600">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="exercises" className="space-y-4">
            {exerciseStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{stat.exercise}</h3>
                        <p className="text-sm text-gray-600">{stat.sessions} sessions completed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold">{stat.avgScore}</span>
                        <Badge variant="outline" className="text-green-600">
                          {stat.improvement}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Average Score</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{stat.avgScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${stat.avgScore}%` }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Button asChild>
            <Link href="/camera">
              Start New Analysis
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/upload">Upload Video</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
