interface PoseKeypoint {
  x: number
  y: number
  visibility: number
}

interface ExerciseAnalysis {
  score: number
  feedback: string[]
  corrections: string[]
}

export class PoseAnalyzer {
  static analyzeSquat(keypoints: PoseKeypoint[]): ExerciseAnalysis {
    const analysis: ExerciseAnalysis = {
      score: 0,
      feedback: [],
      corrections: [],
    }

    // Hip-Knee-Ankle angle (squat depth)
    const hipKneeAnkleAngle = this.calculateAngle(
      keypoints[23], // Hip
      keypoints[25], // Knee
      keypoints[27], // Ankle
    )

    if (hipKneeAnkleAngle <= 90) {
      analysis.feedback.push("Excellent squat depth achieved!")
      analysis.score += 35
    } else if (hipKneeAnkleAngle <= 110) {
      analysis.feedback.push("Good squat depth")
      analysis.score += 25
    } else {
      analysis.corrections.push("Go deeper - aim for thighs parallel to ground")
    }

    // Back angle (torso position)
    const backAngle = this.calculateAngle(
      keypoints[11], // Shoulder
      keypoints[23], // Hip
      keypoints[25], // Knee
    )

    if (backAngle >= 160) {
      analysis.feedback.push("Great back posture maintained!")
      analysis.score += 30
    } else {
      analysis.corrections.push("Keep your chest up and back straight")
    }

    // Knee alignment
    const leftKnee = keypoints[25]
    const rightKnee = keypoints[26]
    const kneeAlignment = Math.abs(leftKnee.x - rightKnee.x)

    if (kneeAlignment < 30) {
      analysis.feedback.push("Good knee alignment!")
      analysis.score += 35
    } else {
      analysis.corrections.push("Keep knees aligned with toes")
    }

    return analysis
  }

  static analyzePushup(keypoints: PoseKeypoint[]): ExerciseAnalysis {
    const analysis: ExerciseAnalysis = {
      score: 0,
      feedback: [],
      corrections: [],
    }

    // Body alignment (plank position)
    const bodyAlignment = this.calculateAngle(
      keypoints[11], // Shoulder
      keypoints[23], // Hip
      keypoints[27], // Ankle
    )

    if (bodyAlignment >= 170) {
      analysis.feedback.push("Perfect body alignment!")
      analysis.score += 40
    } else {
      analysis.corrections.push("Maintain straight line from head to heels")
    }

    // Elbow angle
    const elbowAngle = this.calculateAngle(
      keypoints[11], // Shoulder
      keypoints[13], // Elbow
      keypoints[15], // Wrist
    )

    if (elbowAngle >= 45 && elbowAngle <= 90) {
      analysis.feedback.push("Good elbow position!")
      analysis.score += 30
    } else {
      analysis.corrections.push("Keep elbows at 45-degree angle to body")
    }

    // Range of motion
    const shoulderHeight = keypoints[11].y
    const wristHeight = keypoints[15].y
    const rangeOfMotion = Math.abs(shoulderHeight - wristHeight)

    if (rangeOfMotion > 50) {
      analysis.feedback.push("Good range of motion!")
      analysis.score += 30
    } else {
      analysis.corrections.push("Lower your chest closer to the ground")
    }

    return analysis
  }

  static analyzePlank(keypoints: PoseKeypoint[]): ExerciseAnalysis {
    const analysis: ExerciseAnalysis = {
      score: 0,
      feedback: [],
      corrections: [],
    }

    // Hip alignment
    const hipAlignment = this.calculateAngle(
      keypoints[11], // Shoulder
      keypoints[23], // Hip
      keypoints[27], // Ankle
    )

    if (hipAlignment >= 170 && hipAlignment <= 180) {
      analysis.feedback.push("Perfect hip alignment!")
      analysis.score += 50
    } else if (hipAlignment >= 160) {
      analysis.feedback.push("Good hip position")
      analysis.score += 35
    } else {
      analysis.corrections.push("Keep hips in line with shoulders and ankles")
    }

    // Shoulder position over elbows
    const shoulderElbowAlignment = Math.abs(keypoints[11].x - keypoints[13].x)

    if (shoulderElbowAlignment < 20) {
      analysis.feedback.push("Great shoulder position!")
      analysis.score += 25
    } else {
      analysis.corrections.push("Position shoulders directly over elbows")
    }

    // Core stability (minimal movement)
    analysis.feedback.push("Maintain this position with engaged core")
    analysis.score += 25

    return analysis
  }

  private static calculateAngle(a: PoseKeypoint, b: PoseKeypoint, c: PoseKeypoint): number {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
    let angle = Math.abs((radians * 180.0) / Math.PI)
    if (angle > 180.0) {
      angle = 360 - angle
    }
    return angle
  }
}
