import { useQuiz } from '../context/QuizContext'
import Options from './Options'

function Question() {
  const { questions, currentQuestionIndex } = useQuiz()

  const question = questions.at(currentQuestionIndex)

  return (
    <>
      <h4 className="mb-10 text-center text-xl font-bold">
        {question.question}
      </h4>
      <Options question={question} />
    </>
  )
}

export default Question
