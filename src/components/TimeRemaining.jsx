import { useEffect } from 'react'

function TimeRemaining({ secondsRemaining, onTick }) {
  const mins = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  useEffect(() => {
    const timer = setInterval(() => {
      onTick()
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="rounded border border-gray-600 px-5 py-3">
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  )
}

export default TimeRemaining
