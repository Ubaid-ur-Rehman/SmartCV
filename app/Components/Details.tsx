import React from 'react'

const Details = ({ feedback }: { feedback: Feedback }) => {
  if (!feedback) return null

  const sections = [
    { title: 'Tone & Style', data: feedback.toneAndStyle },
    { title: 'Content', data: feedback.content },
    { title: 'Structure', data: feedback.structure },
    { title: 'Skills', data: feedback.skills },
  ]

  return (
    <div className="details-card p-6 bg-white rounded-lg shadow-lg space-y-6">
      {sections.map(({ title, data }) => (
        <div key={title}>
          <h4 className="text-lg font-semibold">
            {title} – {data.score}/100
          </h4>
          <ul className="mt-2 space-y-2">
            {data.tips.map((tip: { type: string; tip: string; explanation: string }, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className={`mt-1 ${
                    tip.type === 'good' ? 'text-green-500' : 'text-yellow-500'
                  }`}
                >
                  {tip.type === 'good' ? '✔️' : '⚠️'}
                </span>
                <div>
                  <p className="font-medium text-sm">{tip.tip}</p>
                  <p className="text-xs text-gray-600">
                    {tip.explanation}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Details