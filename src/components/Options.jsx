import { useQuiz } from '../context/QuizContext'

function QuestionList({ question }) {
  const { answer, dispatch } = useQuiz()

  const hasAnswered = answer !== null

  return (
    <div className="flex flex-col gap-5">
      {question.options.map((option, i) => (
        <button
          onClick={() => dispatch({ type: 'selectAnswer', payload: i })}
          key={i}
          disabled={hasAnswered}
          className={`cursor-pointer rounded bg-gray-700 px-5 py-2 text-left ring ring-transparent transition hover:ring-cyan-600 disabled:cursor-default disabled:hover:ring-transparent ${
            i === answer &&
            i !== question.correctOption &&
            'text-red-500 !ring-red-500'
          } ${
            hasAnswered && i === question.correctOption
              ? 'text-green-500 !ring-green-500'
              : ''
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default QuestionList
