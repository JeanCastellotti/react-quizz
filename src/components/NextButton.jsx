import { useQuiz } from '../context/QuizContext'

function NextButton() {
  const { answer, currentQuestionIndex, countQuestions, dispatch } = useQuiz()

  if (answer === null) return

  if (currentQuestionIndex + 1 < countQuestions)
    return (
      <button
        onClick={() => dispatch({ type: 'nextQuestion' })}
        className="rounded bg-cyan-600 px-5 py-3 transition hover:scale-105"
      >
        Next
      </button>
    )

  if (currentQuestionIndex + 1 === countQuestions)
    return (
      <button
        onClick={() => dispatch({ type: 'finish' })}
        className="rounded bg-cyan-600 px-5 py-3 transition hover:scale-105"
      >
        Finish
      </button>
    )
}

export default NextButton
