import React from 'react'
import ScoreCircle from './ScoreCircle'

type ATSSuggestion = { type: 'good' | 'improve'; tip: string }

const ATS = ({
  score = 0,
  suggestions = [],
}: {
  score?: number
  suggestions?: ATSSuggestion[]
}) => {
  return (
    <div className="ats-card p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">ATS Analysis</h3>
      <div className="flex items-center gap-4">
        <ScoreCircle score={score} />
        <span className="text-lg font-medium">{score}/100</span>
      </div>
      {suggestions.length > 0 && (
        <ul className="mt-4 space-y-2">
          {suggestions.map((s: ATSSuggestion, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className={`mt-1 ${
                  s.type === 'good' ? 'text-green-500' : 'text-yellow-500'
                }`}
              >
                {s.type === 'good' ? '✔️' : '⚠️'}
              </span>
              <span className="text-sm leading-snug">{s.tip}</span>
            </li>
          ))}
        </ul>
      )}
      {suggestions.length === 0 && (
        <p className="text-gray-500 mt-2">No specific ATS tips available.</p>
      )}
    </div>
  )
}

export default ATS