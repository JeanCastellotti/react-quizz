import { useQuiz } from '../context/QuizContext'

function Starter() {
  const { countQuestions, dispatch } = useQuiz()

  return (
    <div className="text-center">
      <div className="mb-10 space-y-2">
        <h2 className="text-3xl font-bold">Welcome to The React Quiz!</h2>
        <h3 className="text-lg">
          {countQuestions} questions to test your React mastery
        </h3>
      </div>
      <button
        onClick={() => dispatch({ type: 'start' })}
        className="inline-block cursor-pointer rounded bg-gray-700 px-5 py-2 transition hover:scale-105 hover:bg-cyan-600"
      >
        Let's start
      </button>
    </div>
  )
}

export default Starter
