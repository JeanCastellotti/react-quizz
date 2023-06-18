import QuestionList from './QuestionList'

function Question({ question, answer, onSelectAnswer, onNextQuestion }) {
  return (
    <>
      <h4 className="mb-10 text-center text-xl font-bold">
        {question.question}
      </h4>
      <QuestionList
        question={question}
        answer={answer}
        onSelectAnswer={onSelectAnswer}
      />
    </>
  )
}

export default Question
