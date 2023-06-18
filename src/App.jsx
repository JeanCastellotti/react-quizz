import { useEffect, useReducer } from 'react'

import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import Starter from './components/Starter'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import Finish from './components/Finish'
import TimeRemaining from './components/TimeRemaining'
import Footer from './components/Footer'

const SECONDS_PER_QUESTION = 30

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, status: 'ready', questions: action.payload }
    case 'fetchDataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      }
    case 'selectAnswer':
      const question = state.questions.at(state.currentQuestionIndex)
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      }
    case 'nextQuestion':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      }
    case 'restart':
      return {
        ...state,
        status: 'ready',
        currentQuestionIndex: 0,
        answer: null,
        score: 0,
        secondsRemaining: null,
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining - 1 === 0 ? 'finished' : state.status,
      }
  }
}

function App() {
  const [
    {
      status,
      questions,
      currentQuestionIndex,
      answer,
      score,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, {
    questions: [],
    status: 'loading',
    currentQuestionIndex: 0,
    answer: null,
    score: 0,
    highscore: 0,
    secondsRemaining: null,
  })

  const countQuestions = questions.length
  const currentQuestion = questions[currentQuestionIndex]
  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0)

  function handleStart() {
    dispatch({ type: 'start' })
  }

  function handleSelectAnswer(answer) {
    dispatch({ type: 'selectAnswer', payload: answer })
  }

  function handleNextQuestion() {
    dispatch({ type: 'nextQuestion' })
  }

  function handleFinish() {
    dispatch({ type: 'finish' })
  }

  function handleRestart() {
    dispatch({ type: 'restart' })
  }

  function handleTick() {
    dispatch({ type: 'tick' })
  }

  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch('http://localhost:3000/questions')
        const data = await res.json()
        dispatch({ type: 'dataReceived', payload: data })
      } catch (error) {
        dispatch({ type: 'fetchDataFailed' })
      }
    }

    loadQuestions()
  }, [])

  return (
    <div className="min-h-screen bg-gray-800 p-20 text-gray-200">
      <div className="mx-auto max-w-xl">
        <Header />
        <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && (
            <Starter countQuestions={countQuestions} onStart={handleStart} />
          )}
          {status === 'active' && (
            <>
              <Progress
                score={score}
                totalPoints={totalPoints}
                answer={answer}
                currentQuestionIndex={currentQuestionIndex}
                countQuestions={countQuestions}
              />
              <Question
                question={currentQuestion}
                answer={answer}
                onSelectAnswer={handleSelectAnswer}
                onNextQuestion={handleNextQuestion}
              />
              <Footer>
                <TimeRemaining
                  secondsRemaining={secondsRemaining}
                  onTick={handleTick}
                />
                <NextButton
                  answer={answer}
                  currentQuestionIndex={currentQuestionIndex}
                  countQuestions={countQuestions}
                  onNextQuestion={handleNextQuestion}
                  onFinish={handleFinish}
                />
              </Footer>
            </>
          )}
          {status === 'finished' && (
            <Finish
              score={score}
              totalPoints={totalPoints}
              highscore={highscore}
              onRestart={handleRestart}
            />
          )}
        </Main>
      </div>
    </div>
  )
}

export default App
