import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, CheckCircle, AlertTriangle, Info } from "lucide-react"

const exercises = [
  {
    id: "squats",
    name: "Squats",
    description: "Lower body strength exercise focusing on quads, glutes, and hamstrings",
    difficulty: "Beginner",
    duration: "5-10 seconds",
    keyPoints: ["Feet shoulder-width apart", "Knees track over toes", "Hip hinge movement", "Chest up, core engaged"],
    commonMistakes: ["Knees caving inward", "Not going deep enough", "Forward lean", "Heel lifting"],
    analysisPoints: [
      "Knee alignment and tracking",
      "Hip depth and angle",
      "Back posture and chest position",
      "Foot placement and stability",
    ],
    image: "/squats.jpg?height=200&width=300",
  },
  {
    id: "pushups",
    name: "Push-ups",
    description: "Upper body exercise targeting chest, shoulders, and triceps",
    difficulty: "Beginner",
    duration: "8-12 seconds",
    keyPoints: [
      "Hands slightly wider than shoulders",
      "Straight line from head to heels",
      "Elbows at 45-degree angle",
      "Full range of motion",
    ],
    commonMistakes: [
      "Sagging hips",
      "Flaring elbows too wide",
      "Partial range of motion",
      "Head position too high/low",
    ],
    analysisPoints: [
      "Body alignment and plank position",
      "Elbow angle and path",
      "Range of motion consistency",
      "Core stability throughout movement",
    ],
    image: "/pushups.jpg?height=200&width=300",
  },
  {
    id: "planks",
    name: "Planks",
    description: "Core stability exercise for building abdominal and back strength",
    difficulty: "Beginner",
    duration: "10-30 seconds",
    keyPoints: [
      "Forearms parallel to body",
      "Straight line from head to heels",
      "Engage core muscles",
      "Neutral neck position",
    ],
    commonMistakes: ["Hips too high or low", "Holding breath", "Shoulders not over elbows", "Looking up or down"],
    analysisPoints: [
      "Hip alignment and height",
      "Shoulder position over elbows",
      "Core engagement stability",
      "Overall body line consistency",
    ],
    image: "/planks.jpg?height=150&width=300",
  },
  {
    id: "deadlifts",
    name: "Deadlifts",
    description: "Full-body exercise focusing on posterior chain strength",
    difficulty: "Intermediate",
    duration: "6-10 seconds",
    keyPoints: ["Hip hinge movement pattern", "Neutral spine throughout", "Bar close to body", "Drive through heels"],
    commonMistakes: [
      "Rounding the back",
      "Bar drifting away from body",
      "Hyperextending at top",
      "Knees caving inward",
    ],
    analysisPoints: [
      "Spinal alignment and curvature",
      "Hip hinge angle and timing",
      "Bar path and proximity to body",
      "Knee and foot positioning",
    ],
    image: "/deadlift.jpg?height=200&width=300",
  },
  {
    id: "lunges",
    name: "Lunges",
    description: "Unilateral leg exercise for strength and balance",
    difficulty: "Beginner",
    duration: "8-15 seconds",
    keyPoints: ["Step forward with control", "Both knees at 90 degrees", "Front knee over ankle", "Torso upright"],
    commonMistakes: ["Front knee over toes", "Leaning forward", "Step too short or long", "Pushing off back toe"],
    analysisPoints: [
      "Knee angles and alignment",
      "Step length and positioning",
      "Torso angle and balance",
      "Weight distribution between legs",
    ],
    image: "/lunges.jpg?height=200&width=300",
  },
  {
    id: "bicep-curls",
    name: "Bicep Curls",
    description: "Isolation exercise for bicep muscle development",
    difficulty: "Beginner",
    duration: "6-10 seconds",
    keyPoints: ["Elbows stable at sides", "Controlled movement tempo", "Full range of motion", "Avoid swinging"],
    commonMistakes: ["Using momentum/swinging", "Elbows moving forward", "Partial range of motion", "Too fast tempo"],
    analysisPoints: [
      "Elbow stability and position",
      "Range of motion consistency",
      "Movement tempo and control",
      "Body posture and stability",
    ],
    image: "/biceps curl.jpg?height=200&width=300",
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ExercisesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exercise Library</h1>
          <p className="text-gray-600">Learn about supported exercises and what our AI analyzes</p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <Button asChild>
            <Link href="/camera">
              <Camera className="mr-2 h-4 w-4" />
              Start Real-time Analysis
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Video
            </Link>
          </Button>
        </div>

        {/* Exercise Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <img
                  src={exercise.image || "/placeholder.svg"}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{exercise.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                    <Badge variant="outline">{exercise.duration}</Badge>
                  </div>
                </div>
                <CardDescription>{exercise.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Points */}
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Key Form Points
                  </h4>
                  <ul className="space-y-1">
                    {exercise.keyPoints.map((point, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Mistakes */}
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Common Mistakes
                  </h4>
                  <ul className="space-y-1">
                    {exercise.commonMistakes.map((mistake, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Analysis Points */}
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    What Our AI Analyzes
                  </h4>
                  <ul className="space-y-1">
                    {exercise.analysisPoints.map((point, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button asChild className="flex-1">
                    <Link href={`/camera?exercise=${exercise.id}`}>
                      <Camera className="mr-2 h-4 w-4" />
                      Analyze Live
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1 bg-transparent">
                    <Link href={`/upload?exercise=${exercise.id}`}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Video
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-blue-900 mb-2">More Exercises Coming Soon!</h3>
            <p className="text-blue-700 mb-4">We're continuously adding new exercises to our AI analysis library</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Pull-ups", "Shoulder Press", "Rows", "Hip Thrusts", "Calf Raises"].map((exercise) => (
                <Badge key={exercise} variant="outline" className="border-blue-300 text-blue-700">
                  {exercise}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
