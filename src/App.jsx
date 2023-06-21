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
import { useQuiz } from './context/QuizContext'

function App() {
  const { status } = useQuiz()

  return (
    <div className="min-h-screen bg-gray-800 p-20 text-gray-200">
      <div className="mx-auto max-w-xl">
        <Header />
        <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <Starter />}
          {status === 'active' && (
            <>
              <Progress />
              <Question />
              <Footer>
                <TimeRemaining />
                <NextButton />
              </Footer>
            </>
          )}
          {status === 'finished' && <Finish />}
        </Main>
      </div>
    </div>
  )
}

export default App
