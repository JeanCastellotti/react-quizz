function Error() {
  return (
    <div className="flex">
      <div className="mx-auto inline-flex items-center gap-5 rounded bg-red-500 px-5 py-2 text-red-200 shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <span>The was an error fetching questions</span>
      </div>
    </div>
  )
}

export default Error
