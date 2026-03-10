import React from 'react'
import ScoreCircle from './ScoreCircle'

const Summary = ({ feedback }: { feedback: Feedback }) => {
  if (!feedback) return null

  // helper to format key names
  const pretty = (key: string) =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^\s/, '')
      .toUpperCase()

  // list of feedback keys we want to display in summary (exclude overallScore)
  const categories: Array<keyof Omit<Feedback, 'overallScore'>> = [
    'ATS',
    'toneAndStyle',
    'content',
    'structure',
    'skills',
  ]

  return (
    <div className="summary-card p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-6">
        <ScoreCircle score={feedback.overallScore} />
        <div>
          <h3 className="text-2xl font-bold">Overall Score</h3>
          <p className="text-gray-600">
            Your resume scored{' '}
            <span className="font-semibold">{feedback.overallScore}/100</span>{' '}
overall.
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3">
        {categories.map((key) => (
          <div key={key} className="flex items-center gap-2">
            <span className="w-24 text-sm text-gray-700">{pretty(key)}</span>
            <div className="flex-1 h-2 rounded bg-gray-200 relative">
              <div
                style={{ width: `${feedback[key].score}%` }}
                className={`h-full rounded ${
                  feedback[key].score >= 75
                    ? 'bg-green-400'
                    : feedback[key].score >= 50
                    ? 'bg-yellow-400'
                    : 'bg-red-400'
                }`}
              ></div>
            </div>
            <span className="w-8 text-right text-sm">
              {feedback[key].score}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Summary