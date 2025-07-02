import React from 'react'

const LoadingDots = () => {
  return (
    <div className="flex items-center gap-1">
      <span>Loading</span>
      <div className="flex items-center gap-0.5">
        <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="h-1 w-1 bg-white rounded-full animate-bounce" />
      </div>
    </div>
  )
}

export default LoadingDots