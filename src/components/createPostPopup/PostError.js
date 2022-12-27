import React from 'react'

export default function PostError({ error, setError }) {
  return (
    <div className="postError_zindex_second">
        <div className="postError_error">{error}</div>
        <button className="pink_btn" onClick={() => {setError("")}}>
            Try Again...
        </button>
    </div>
  )
}
