import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, MessageSquare, CheckCircle, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">FitForm AI</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/exercises" className="text-gray-600 hover:text-blue-600">
              Exercises
            </Link>
            <Link href="/progress" className="text-gray-600 hover:text-blue-600">
              Progress
            </Link>
            <Button asChild>
              <Link href="/camera">Start Analysis</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">AI-Powered Fitness Coach</Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Perfect Your Form with
            <span className="text-blue-600"> AI Posture Analysis</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload exercise videos or use real-time camera to get instant feedback on your posture. Improve your form,
            prevent injuries, and maximize your workout results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/camera">
                <Camera className="mr-2 h-5 w-5" />
                Start Real-time Analysis
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload Video
              </Link>
            </Button>
          </div>

          {/* Demo Image */}
          <div className="relative max-w-4xl mx-auto">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="FitForm AI Dashboard"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Record or Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Use your camera for real-time analysis or upload a 5-10 second exercise video
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced pose estimation analyzes your joint positions and movement patterns
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Get Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive instant feedback with corrections and tips to improve your form
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Supported Exercises */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Supported Exercises</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Squats", description: "Knee alignment, back posture, depth analysis" },
              { name: "Push-ups", description: "Elbow angle, back alignment, form consistency" },
              { name: "Planks", description: "Core engagement, hip alignment, shoulder position" },
              { name: "Deadlifts", description: "Back curvature, hip hinge, bar path" },
              { name: "Lunges", description: "Knee tracking, balance, depth control" },
              { name: "Bicep Curls", description: "Elbow stability, range of motion, tempo" },
            ].map((exercise, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{exercise.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Perfect Your Form?</h3>
          <p className="text-xl mb-8 opacity-90">Start your AI-powered fitness journey today</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/camera">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Target className="h-6 w-6" />
            <span className="text-xl font-bold">FitForm AI</span>
          </div>
          <p className="text-gray-400">AI-powered posture analysis for better workouts</p>
        </div>
      </footer>
    </div>
  )
}
