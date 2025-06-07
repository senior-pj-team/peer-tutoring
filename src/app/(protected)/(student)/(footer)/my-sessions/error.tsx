'use client'

import { useEffect } from 'react'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Captured error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold text-orange-600 mb-2">Something went wrong</h1>
        <p className="text-gray-700 mb-6">
          {'An unexpected error occurred. Please try again later.'}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
