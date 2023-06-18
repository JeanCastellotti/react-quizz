function NextButton({
  answer,
  currentQuestionIndex,
  countQuestions,
  onNextQuestion,
  onFinish
}) {
  if (answer === null) return

  if (currentQuestionIndex + 1 < countQuestions)
    return (
      <button
        onClick={onNextQuestion}
        className="rounded bg-cyan-600 px-5 py-3 transition hover:scale-105"
      >
        Next
      </button>
    )

  if (currentQuestionIndex + 1 === countQuestions)
    return (
      <button
        onClick={onFinish}
        className="rounded bg-cyan-600 px-5 py-3 transition hover:scale-105"
      >
        Finish
      </button>
    )
}

export default NextButton
