import { createContext, useContext, useEffect, useReducer } from 'react'

const QuizContext = createContext()

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

export function QuizProvider({ children }) {
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
  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0)

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
    <QuizContext.Provider
      value={{
        status,
        questions,
        currentQuestionIndex,
        countQuestions,
        answer,
        score,
        totalPoints,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) throw new Error('Context used outside provider.')
  return context
}
