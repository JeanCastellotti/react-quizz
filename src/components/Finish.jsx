function Finish({ score, totalPoints, highscore, onRestart }) {
  const percentage = Math.ceil((score / totalPoints) * 100)

  let emoji

  if (percentage === 100) emoji = '🏅'
  if (percentage >= 80 && percentage < 100) emoji = '🎉'
  if (percentage >= 50 && percentage < 80) emoji = '😐'
  if (percentage >= 0 && percentage < 50) emoji = '☹️'
  if (percentage === 0) emoji = '😭'

  return (
    <>
      <p className="mb-1 text-center text-xl">
        <span className="mr-3">{emoji}</span>
        <span>
          You scored <strong>{score}</strong> out of {totalPoints} ({percentage}
          %)
        </span>
      </p>
      <p className="mb-10 text-center">(Highscore: {highscore} points)</p>
      <button
        onClick={onRestart}
        className="mx-auto block cursor-pointer rounded bg-gray-700 px-5 py-2 transition hover:scale-105 hover:bg-cyan-600"
      >
        Restart
      </button>
    </>
  )
}

export default Finish
