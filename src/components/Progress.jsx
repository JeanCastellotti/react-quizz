function Progress({
  currentQuestionIndex,
  countQuestions,
  answer,
  score,
  totalPoints,
}) {
  const progressBarPercentage =
    ((currentQuestionIndex + Number(answer !== null)) / countQuestions) * 100

  return (
    <header className="mb-10 flex flex-col">
      <div className="mb-3 h-3 rounded bg-gray-700">
        <div
          style={{ width: `${progressBarPercentage}%` }}
          className="h-3 rounded bg-gray-400 transition-[width]"
        ></div>
      </div>
      <div className="flex justify-between">
        <span>
          Question {currentQuestionIndex + 1}/{countQuestions}
        </span>
        <span>
          {score}/ {totalPoints} points
        </span>
      </div>
    </header>
  )
}

export default Progress
